# AGENTS.md

Instructions for AI coding agents working on Local-AiHub.

## Setup

```bash
cd 2026/local-aihub
pnpm install
pnpm dev
```

## Project Context

Local-AiHub is a collection of local-first LLM tools. Each tool is a self-contained feature that communicates with Ollama running on localhost. See [docs/prd.md](docs/prd.md) for product requirements and [docs/architecture.md](docs/architecture.md) for technical design.

## Code Conventions

- **File naming**: kebab-case (e.g., `file-drop-zone.tsx`, `use-ollama.ts`)
- **Components**: Functional components with TypeScript interfaces for props
- **Styling**: Tailwind CSS utility classes, shadcn/ui for primitives
- **Imports**: Relative imports within the project
- **Types**: Prefer interfaces over type aliases for object shapes

## Folder Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui primitives — do not modify manually
│   ├── shared/      # Reusable components (FileDropZone, ResultViewer, etc.)
│   └── tools/       # One subfolder per tool (ocr/, image-describe/, etc.)
├── hooks/           # Custom React hooks (use-ollama, use-file-upload, etc.)
├── lib/             # Utilities and clients (ollama-client, file-utils, etc.)
├── pages/           # Route-level page components
├── types/           # Shared TypeScript interfaces
├── App.tsx          # Root component with routing
└── main.tsx         # Entry point
```

## Adding a New Tool

1. Create a folder under `src/components/tools/<tool-name>/`
2. Export a tool definition matching the registry pattern:
   ```ts
   export const myToolDef = {
     id: "my-tool",
     name: "My Tool",
     description: "What this tool does",
     icon: SomeIcon,        // from lucide-react
     path: "/my-tool",
     component: MyToolComponent,
     defaultModel: "model-name",
   };
   ```
3. Register it in `src/lib/tools.ts`
4. Add a route in `App.tsx`
5. The home page renders tools from the registry automatically

## Key Patterns

- All Ollama calls go through `src/lib/ollama-client.ts` — never call fetch directly
- Use `useOllama` hook in components for loading/error/abort state
- Streaming is the default — use `useStreaming` for token-by-token display
- File uploads convert to base64 via `src/lib/file-utils.ts`
- Error messages should be actionable (tell the user what to do, not just what failed)

## Commit Style

Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
Co-author AI contributions: `Co-Authored-By: <Agent> <email>`
