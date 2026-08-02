"""
File: pipeline.py
Description: Business logic service for analyzing workflow graphs, including DAG validation and topological sorting.
Module: pipeline
"""

from typing import Dict, Any, List, Tuple
from models import Pipeline, Node, Edge
from config import settings
from openai import OpenAI

def get_topological_sort(nodes: List[Node], edges: List[Edge]) -> Tuple[bool, List[str]]:
    """
    Applies Kahn's Algorithm to determine if the graph is a DAG and returns the topological order.
    Returns (is_dag, sorted_node_ids).
    """
    adj = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    for edge in edges:
        source = edge.source
        target = edge.target
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1
            
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    sorted_nodes = []
    
    while queue:
        current = queue.pop(0)
        sorted_nodes.append(current)
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    is_dag = len(sorted_nodes) == len(nodes)
    return is_dag, sorted_nodes

def analyze_pipeline(pipeline_data: Pipeline) -> Dict[str, Any]:
    nodes = pipeline_data.nodes
    edges = pipeline_data.edges
    
    is_dag, _ = get_topological_sort(nodes, edges)
    
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag
    }

def execute_pipeline(pipeline_data: Pipeline) -> Dict[str, Any]:
    nodes_map = {node.id: node for node in pipeline_data.nodes}
    edges = pipeline_data.edges
    
    is_dag, sorted_nodes = get_topological_sort(pipeline_data.nodes, edges)
    
    if not is_dag:
        return {"status": "error", "message": "Pipeline is not a valid DAG."}
        
    # Execution
    node_outputs = {}
    
    def get_incoming_edges(node_id):
        return [e for e in edges if e.target == node_id]
        
    final_output = None
    
    for node_id in sorted_nodes:
        node = nodes_map[node_id]
        node_type = node.type
        data = node.data
        
        if node_type == 'customInput':
            node_outputs[node_id] = data.get('inputValue', '')
            
        elif node_type == 'text':
            text = data.get('text', '')
            incoming = get_incoming_edges(node_id)
            for edge in incoming:
                var_name = edge.targetHandle
                source_val = node_outputs.get(edge.source, "")
                if var_name:
                    text = text.replace(f"{{{{{var_name}}}}}", str(source_val))
            node_outputs[node_id] = text
            
        elif node_type == 'llm':
            system_prompt = data.get('systemPrompt', 'You are a helpful assistant.')
            temperature = data.get('temperature', 0.7)
            
            incoming = get_incoming_edges(node_id)
            user_prompt = ""
            for edge in incoming:
                if edge.targetHandle == 'prompt':
                    user_prompt = node_outputs.get(edge.source, "")
                elif edge.targetHandle == 'system':
                    system_prompt = node_outputs.get(edge.source, system_prompt)
                    
            model_name = data.get('model', 'gemini-2.5-flash')
            try:
                client = OpenAI(
                    api_key=settings.GEMINI_API_KEY,
                    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
                )
                response = client.chat.completions.create(
                    model=model_name, 
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=temperature
                )
                node_outputs[node_id] = response.choices[0].message.content
            except Exception as e:
                node_outputs[node_id] = f"Error: {str(e)}"
                
        elif node_type == 'customOutput':
            incoming = get_incoming_edges(node_id)
            for edge in incoming:
                final_output = node_outputs.get(edge.source, "")
            node_outputs[node_id] = final_output
            
    return {
        "status": "success",
        "output": final_output
    }
