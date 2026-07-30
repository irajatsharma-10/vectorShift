# Migration Notes

## Why We Migrated
The initial repository architecture placed all files (UI components, stores, node definitions, and API calls) in a flat `/src` directory. This caused:
- Difficult discoverability.
- Blurring of business logic, state, and UI.
- API endpoints hardcoded inside React components (`SubmitButton`).
- "Ghost" folders (`src/components/canvas`, etc.) that were unused and causing confusion.

## What Changed
1. **API Abstraction**: The raw `fetch` call in `SubmitButton.js` was extracted into `src/api/pipeline.js`.
2. **Global State Centralization**: `store.js` was moved to `src/stores/builderStore.js`.
3. **Feature-Driven Folders**: The core workflow builder logic was moved to `src/features/builder`. This encapsulates the canvas, the toolbar, and node definitions.
4. **Shared UI Components**: `BaseNode.js`, a highly reusable UI shell, was moved to `src/components/ui/BaseNode`.
5. **Git History Preservation**: `git mv` was strictly used to maintain the exact commit history of every file, preventing blame loss.

## How to Proceed
- **Adding a new node**: Add it inside `src/features/builder/nodes/definitions/` and export it in `index.js`.
- **Adding a new feature (e.g. Chat)**: Create `src/features/chat/` and encapsulate its components, hooks, and utilities there. Do NOT dump it into `src/components`.
- **Adding a new endpoint**: Abstract the fetch logic inside `src/api/`.
