/**
 * @file index.js
 * @description Global configuration constants including API endpoints and UI defaults.
 * @module index
 */

// config/constants.js
// Global application configurations and constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const GRID_SIZE = 20;
export const PRO_OPTIONS = { hideAttribution: true };
