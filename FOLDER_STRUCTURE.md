# Folder Structure

This repository uses a modern, feature-based folder organization strategy.

```text
vectorShift/
├── backend/                  # Python FastAPI Backend
│   ├── main.py
│   └── venv/
└── frontend/                 # React Frontend
    ├── package.json
    ├── public/
    └── src/
        ├── api/              # Extracted API layer (fetch calls, etc.)
        │   └── pipeline.js
        ├── app/              # Application entry points and wrappers
        │   └── App.js
        ├── components/       # Shared, domain-agnostic UI components
        │   └── ui/
        │       └── BaseNode/
        ├── features/         # Feature-driven modules
        │   └── builder/      # The Node Canvas Builder Feature
        │       ├── components/
        │       │   ├── Canvas.js
        │       │   ├── DraggableNode.js
        │       │   ├── SubmitButton.js
        │       │   └── Toolbar.js
        │       └── nodes/
        │           ├── definitions/
        │           └── index.js
        ├── stores/           # Global State Management (Zustand)
        │   └── builderStore.js
        ├── styles/           # Global CSS and themes
        │   └── globals.css
        └── index.js          # React DOM entry point
```

## Key Directories Explained
- **`features/`**: The core of the application. Business logic lives here. Instead of searching by file type (e.g., "where are my hooks?"), engineers search by feature (e.g., "where is the chat logic?").
- **`components/ui/`**: Strict UI elements only. No API calls or heavy state management.
- **`api/`**: Encapsulates network complexity. Components call functions here rather than constructing raw `fetch` requests.
