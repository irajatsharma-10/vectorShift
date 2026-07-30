"""
File: main.py
Description: FastAPI application entry point, configuring middleware and HTTP routes.
Module: main
"""

import json
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, Form
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from models import Pipeline
from pipeline import analyze_pipeline

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', tags=["pipelines"])
def parse_pipeline(pipeline: str = Form(...)):
    # Parse the raw JSON string into our Pydantic model
    pipeline_dict = json.loads(pipeline)
    pipeline_model = Pipeline(**pipeline_dict)
    
    # Perform business logic
    result = analyze_pipeline(pipeline_model)
    return result
