# VectorShift Pipeline Builder

A visual workflow builder with a React Flow frontend and FastAPI backend. Design node-based pipelines on a canvas, connect them with edges, and validate the graph structure (including DAG detection) via the backend API.

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | React 18, React Flow, Tailwind CSS, Zustand     |
| Backend  | FastAPI, Pydantic                               |
| Tooling  | Pyright (type checking)                         |

## Project Structure

```
vectorShift/
├── backend/
│   ├── api/           # FastAPI route handlers
│   ├── core/          # App configuration and settings
│   ├── models/        # Pydantic data models
│   ├── services/      # Business logic (DAG validation, etc.)
│   └── main.py        # Application entry point
├── frontend/
│   └── src/
│       ├── components/   # UI shell, layout, workflow canvas
│       ├── features/nodes/  # Node type definitions
│       ├── services/     # API client layer
│       ├── store/        # Zustand global state
│       └── utils/        # Drag-and-drop helpers
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install fastapi uvicorn python-multipart pydantic pydantic-settings
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000` and expects the backend at `http://localhost:8000`.

## Node Types

- **Input / Output** — pipeline entry and exit points
- **Text** — static text with auto-resize and dynamic variable handles
- **LLM** — language model prompt node
- **API** — HTTP request node
- **Condition** — branching logic
- **Merge** — combine multiple inputs
- **Timer** — delay step
- **Note** — canvas annotation

## API

| Method | Endpoint            | Description                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/`                 | Health check (`{"Ping": "Pong"}`)    |
| POST   | `/pipelines/parse`  | Analyze pipeline graph (nodes, edges, DAG status) |

## Development History

Commits are organized by feature area:

1. Initial project setup (React + FastAPI)
2. BaseNode composition pattern
3. Demonstration node types (API, Note, Merge, Condition, Timer)
4. Text node auto-resize and dynamic handles
5. Frontend–backend pipeline integration
6. Frontend modular restructure
7. Backend service-layer architecture
8. Tailwind UI and professional sidebar
9. API service layer and drag utilities
