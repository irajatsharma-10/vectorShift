/**
 * POST /pipelines/parse
 *
 * Network service layer handling backend API communications for pipeline analysis and execution.
 *
 * Components:
 * - Data Formatting: Serializes the `nodes` and `edges` arrays into a JSON string and appends it to a `FormData` object.
 * - API Request: Executes an asynchronous POST request to the backend `/pipelines/parse` endpoint using the native `fetch` API.
 * - Error Management: Asserts response status (`response.ok`) and throws standard HTTP errors for failed requests.
 * - Response Parsing: Awaits and deserializes the JSON response containing the analysis metrics (num_nodes, num_edges, is_dag).
 */

// workflow.service.js
// Handles all API communications related to pipelines

import { API_BASE_URL } from '../constants';

export const analyzePipeline = async (nodes, edges) => {
    const formData = new FormData();
    formData.append('pipeline', JSON.stringify({ nodes, edges }));

    const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const executePipeline = async (nodes, edges) => {
    const formData = new FormData();
    formData.append('pipeline', JSON.stringify({ nodes, edges }));

    const response = await fetch(`${API_BASE_URL}/pipelines/execute`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};
