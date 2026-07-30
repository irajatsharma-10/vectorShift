"""
File: pipeline.py
Description: Business logic service for analyzing workflow graphs, including DAG validation and topological sorting.
Module: pipeline
"""

from typing import Dict, Any, List, Tuple
from models import Pipeline, Node, Edge
from config import settings

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
