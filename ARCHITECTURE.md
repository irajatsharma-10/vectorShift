# Architecture

## Overview
VectorShift is transitioning from a flat, file-centric structure to a domain-driven architectural design. This modernization brings the codebase up to Staff-level engineering standards, similar to organizations like Linear and Vercel.

## Core Principles

1. **Separation of Concerns**: We separate logic into distinct layers:
   - **UI/View Layer**: React components handling presentation only.
   - **State Layer**: Zustand stores managing global application state (`stores/`).
   - **Data/API Layer**: Network requests abstracted into a distinct boundary (`api/`).

2. **Domain Ownership (Feature-Driven Structure)**: 
   Code is grouped by the business feature it supports. Instead of dumping all components into `src/components`, we organize them by feature domain, such as `src/features/builder`. This isolates blast radii and prevents circular dependencies across domains.

3. **Reusability & UI Consistency**:
   Shared, agnostic components that do not rely on feature-specific business logic are kept in `src/components/ui`. For example, `BaseNode` is a generic UI shell, making it reusable even if we build different types of canvas experiences in the future.

4. **Scalability for Future Micro-frontends/Microservices**:
   By tightly coupling related feature logic (components, specific nodes, definitions) into isolated feature directories, extracting a specific feature into a separate package or microservice becomes a trivial task rather than a massive un-tangling operation.

## Dependency Flow
- **Components** may import from `stores/`, `api/`, and `components/ui/`.
- **Features** may import from `stores/`, `api/`, and `components/ui/`.
- **API** layer must remain pure and only import configuration or utilities. It must not import components or stores.
- **Stores** must remain independent of components and APIs, handling pure data state.

## Future Extension Points
As the application grows, new domains (like `auth`, `workflow`, `templates`) will follow the same pattern inside `src/features`. Each new feature will manage its own localized components and hooks, keeping the global namespaces clean.
