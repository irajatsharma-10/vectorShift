"""
File: config.py
Description: Application configuration settings using Pydantic, defining environment variables.
Module: config
"""

from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "VectorShift Backend"
    CORS_ORIGINS: List[str] = ["http://localhost:3000","*"]
    GEMINI_API_KEY: str = "[GCP_API_KEY]"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
