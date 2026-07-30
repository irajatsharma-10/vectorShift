"""
File: models.py
Description: Pydantic data models defining the schema for nodes, edges, and workflow pipelines.
Module: models
"""

from typing import List, Dict, Any, Optional
# pyrefly: ignore [missing-import]
from pydantic import BaseModel

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]

class Edge(BaseModel):
    source: str
    target: str
    type: Optional[str] = None
    animated: bool = False
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
