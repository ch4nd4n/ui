# Architecture

Technical decisions and implementation patterns for Local-AiHub.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 19 + TypeScript | Strict mode enabled |
| Build | Vite (rolldown-vite) | Fast dev server, ES modules |
| Styling | Tailwind CSS + shadcn/ui | Dark-mode-first, utility classes |
| Icons | lucide-react | Consistent, tree-shakeable icon set |
| State | React state / context | Add Zustand only if state grows complex |
| Package manager | pnpm | Lockfile committed |

## Folder Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives (Button, Card, Input, etc.)
│   ├── shared/          # Reusable project components
│   │   ├── file-drop-zone.tsx
│   │   ├── result-viewer.tsx
│   │   ├── copy-button.tsx
│   │   └── model-selector.tsx
│   └── tools/           # Per-tool feature components
│       ├── ocr/
│       ├── image-describe/
│       ├── document-qa/
│       ├── text-rewriter/
│       └── prompt-playground/
├── hooks/
│   ├── use-ollama.ts    # Core hook for Ollama API calls
│   ├── use-file-upload.ts
│   └── use-streaming.ts
├── lib/
│   ├── ollama-client.ts # Low-level Ollama HTTP client
│   ├── file-utils.ts    # Base64 encoding, file type detection
│   └── constants.ts     # Default URLs, model names, limits
├── pages/               # Route-level components
│   ├── home.tsx
│   └── ocr.tsx
├── types/               # Shared TypeScript interfaces
│   └── index.ts
├── App.tsx              # Root component, routing
└── main.tsx             # Entry point
```

## Ollama Integration

### Client Design

All Ollama communication goes through `lib/ollama-client.ts`, which provides:

- Configurable base URL (default: `http://localhost:11434`)
- Support for `/api/generate` (single-turn) and `/api/chat` (multi-turn) endpoints
- Image input via base64 encoding in the `images` array
- Streaming response handling via `ReadableStream`
- Request abort via `AbortController`
- Connection health check (`/api/tags` or similar)

### `useOllama` Hook

Wraps the client for React components:

```ts
const { generate, isLoading, error, abort } = useOllama({
  model: "glm-edge-ocr",
  stream: true,
});
```

Responsibilities:
- Manage loading/error/result state
- Handle streaming token accumulation
- Provide abort function for cancellation
- Surface connection errors with actionable messages

### Error Scenarios

| Scenario | Detection | User message |
|---|---|---|
| Ollama not running | Connection refused on health check | "Cannot connect to Ollama. Make sure it's running on localhost:11434." |
| Model not pulled | 404 from generate/chat | "Model 'X' is not available. Run `ollama pull X` to download it." |
| Request timeout | AbortController timeout | "Request timed out. The model may be loading — try again." |
| Invalid file | Client-side validation | "Unsupported file type. Please upload a JPG, PNG, or WebP image." |
| File too large | Client-side size check | "File is too large (max 10 MB)." |

## Routing

React Router with path-based routes:

| Path | Component | Tool |
|---|---|---|
| `/` | Home | Tool launcher / cards |
| `/ocr` | OCR | Image OCR |
| `/describe` | ImageDescribe | Image Description |
| `/qa` | DocumentQA | Document Q&A |
| `/rewrite` | TextRewriter | Text Rewriter |
| `/playground` | PromptPlayground | Prompt Playground |

## Tool Registration

Each tool is a self-contained module that exports a descriptor:

```ts
// src/components/tools/ocr/index.ts
import { ScanText } from "lucide-react";
import { OcrTool } from "./ocr-tool";

export const ocrToolDef = {
  id: "ocr",
  name: "Image OCR",
  description: "Extract text from images",
  icon: ScanText,
  path: "/ocr",
  component: OcrTool,
  defaultModel: "glm-edge-ocr",
};
```

A central registry (`src/lib/tools.ts`) collects all tool definitions. The home page and navigation render from this registry.

## Streaming Strategy

Streaming is the default for all text-generating tools:

1. Client opens a fetch request to Ollama with `stream: true`
2. Response is consumed via `ReadableStream` + `TextDecoder`
3. Each JSON line is parsed and the `response` field is appended to state
4. UI updates on each chunk (throttled to ~60fps if needed)
5. User can abort mid-stream via cancel button

Non-streaming fallback exists for backends that don't support it.

## Configuration Persistence

User preferences are stored in `localStorage`:

| Key | Value | Default |
|---|---|---|
| `aihub:ollama-url` | Base URL string | `http://localhost:11434` |
| `aihub:models` | JSON map of tool ID to selected model | Per-tool defaults from registry |
| `aihub:theme` | `dark` / `light` / `auto` | `dark` |

No server-side storage. Everything stays on the user's machine.
