# Implementation Plan: Phase 1 – Image OCR

Step-by-step build plan for the MVP. Each step lists what to do, which files are involved, and what it depends on.

## Step 0: Install Dependencies

```bash
cd 2026/local-aihub

# Tailwind CSS v4
pnpm add tailwindcss @tailwindcss/vite

# shadcn/ui prerequisites
pnpm add class-variance-authority clsx tailwind-merge

# shadcn/ui components (via CLI after init)
pnpm dlx shadcn@latest init

# Icons
pnpm add lucide-react

# Routing
pnpm add react-router-dom
```

**Tailwind v4 setup**:
- Add the Tailwind plugin to `vite.config.ts`
- Replace `src/index.css` with `@import "tailwindcss"`
- Remove `src/App.css` (no longer needed)

**shadcn/ui setup**:
- Run `pnpm dlx shadcn@latest init` to generate `components.json` and `src/components/ui/` folder
- Add components as needed: `pnpm dlx shadcn@latest add button card`

**Depends on**: Nothing

---

## Step 1: Project Scaffolding

Set up the folder structure and base files.

### Files to create

| File | Purpose |
|---|---|
| `src/types/index.ts` | Shared interfaces (ToolDefinition, OllamaRequest, OllamaResponse) |
| `src/lib/constants.ts` | Default Ollama URL, max file size, accepted MIME types |
| `src/lib/cn.ts` | Tailwind merge utility (clsx + twMerge) |

### `src/types/index.ts`

```ts
interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  component: React.ComponentType;
  defaultModel: string;
}

interface OllamaChatRequest {
  model: string;
  messages: OllamaChatMessage[];
  stream?: boolean;
}

interface OllamaChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[]; // base64-encoded
}

interface OllamaChatResponseChunk {
  model: string;
  message: { role: string; content: string };
  done: boolean;
}
```

### `src/lib/constants.ts`

```ts
export const OLLAMA_BASE_URL = "http://localhost:11434";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
```

**Depends on**: Step 0

---

## Step 2: Ollama Client

### Files to create

| File | Purpose |
|---|---|
| `src/lib/ollama-client.ts` | Low-level fetch wrapper for Ollama API |

Responsibilities:
- `chatStream(request, onChunk, signal)` — POST to `/api/chat` with `stream: true`, parse NDJSON, call `onChunk` per token
- `chat(request)` — non-streaming variant (for simpler use cases later)
- `listModels()` — GET `/api/tags` (for health check / model validation)
- All functions accept an optional `baseUrl` parameter (defaults to constant)
- All functions accept an `AbortSignal` for cancellation

**Depends on**: Step 1 (types, constants)

---

## Step 3: React Hooks

### Files to create

| File | Purpose |
|---|---|
| `src/hooks/use-ollama.ts` | React hook wrapping ollama-client with state management |
| `src/lib/file-utils.ts` | `fileToBase64()`, `validateFile()` helpers |

### `use-ollama` hook interface

```ts
function useOllama(options: { model: string }) {
  return {
    result: string;          // accumulated streamed text
    isLoading: boolean;
    error: string | null;
    generate: (messages: OllamaChatMessage[]) => Promise<void>;
    abort: () => void;
    reset: () => void;
  };
}
```

- Manages AbortController internally
- Accumulates streamed tokens into `result`
- Maps fetch errors to user-friendly messages (see error table in feature spec)

### `file-utils.ts`

- `fileToBase64(file: File): Promise<string>` — reads file as data URL, strips prefix
- `validateFile(file: File): string | null` — returns error message or null if valid

**Depends on**: Step 2 (ollama-client)

---

## Step 4: Shared UI Components

### Files to create/add via shadcn CLI

| File | Purpose |
|---|---|
| `src/components/ui/button.tsx` | shadcn Button |
| `src/components/ui/card.tsx` | shadcn Card |
| `src/components/shared/file-drop-zone.tsx` | Drag-and-drop + click-to-browse file upload with preview |
| `src/components/shared/result-viewer.tsx` | Scrollable text panel with copy button |
| `src/components/shared/copy-button.tsx` | Copy-to-clipboard with checkmark feedback |
| `src/components/shared/nav-bar.tsx` | Top navigation bar |

### `file-drop-zone.tsx` props

```ts
interface FileDropZoneProps {
  onFile: (file: File) => void;
  accept: string[];       // MIME types
  maxSize: number;        // bytes
  preview?: string;       // data URL for image preview
  error?: string | null;
}
```

Handles: drag enter/leave/over/drop, click to open file picker, file validation, preview display.

### `result-viewer.tsx` props

```ts
interface ResultViewerProps {
  content: string;
  isStreaming: boolean;
  placeholder?: string;
}
```

Renders text in a scrollable container. Auto-scrolls during streaming. Includes copy button in the top-right corner.

**Depends on**: Step 0 (shadcn/ui, Tailwind)

---

## Step 5: OCR Tool Component

### Files to create

| File | Purpose |
|---|---|
| `src/components/tools/ocr/ocr-tool.tsx` | Main OCR page component |

This is the feature component that composes everything:

1. Uses `file-drop-zone` for image upload
2. Calls `fileToBase64` on the uploaded file
3. Shows image preview
4. On "Extract Text" click, calls `useOllama.generate()` with the base64 image
5. Passes streamed result to `result-viewer`
6. Shows cancel button while loading
7. Shows error messages from the hook

Layout: two-column on `md:` breakpoint, stacked on mobile.

**Depends on**: Steps 3 and 4

---

## Step 6: Tool Registry & Home Page

### Files to create

| File | Purpose |
|---|---|
| `src/lib/tools.ts` | Array of ToolDefinition objects |
| `src/pages/home.tsx` | Home page with tool cards |
| `src/pages/ocr.tsx` | Route wrapper for OCR tool |

### `src/lib/tools.ts`

```ts
import { ScanText } from "lucide-react";
import { OcrTool } from "../components/tools/ocr/ocr-tool";

export const tools: ToolDefinition[] = [
  {
    id: "ocr",
    name: "Image OCR",
    description: "Extract text from images",
    icon: ScanText,
    path: "/ocr",
    component: OcrTool,
    defaultModel: "glm-edge-ocr",
  },
];
```

### `src/pages/home.tsx`

Renders a grid of cards from the tools array. Each card links to the tool's path.

**Depends on**: Step 5

---

## Step 7: Routing & App Shell

### Files to modify

| File | Change |
|---|---|
| `src/App.tsx` | Replace boilerplate with BrowserRouter, Routes, nav bar |
| `src/main.tsx` | No changes needed |
| `index.html` | Update `<title>` to "Local-AiHub" |

### `src/App.tsx` structure

```tsx
<BrowserRouter>
  <NavBar />
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ocr" element={<OcrPage />} />
    </Routes>
  </main>
</BrowserRouter>
```

**Depends on**: Step 6

---

## Build Order Summary

```
Step 0: Install deps + configure Tailwind/shadcn
  ↓
Step 1: Types, constants, utilities
  ↓
Step 2: Ollama client
  ↓
Step 3: React hooks + file utils
  ↓
Step 4: Shared UI components (parallel with Step 2-3)
  ↓
Step 5: OCR tool component
  ↓
Step 6: Tool registry + home page
  ↓
Step 7: Routing + app shell
```

## Verification

After implementation, verify end-to-end:

1. `pnpm dev` starts without errors
2. Home page shows OCR tool card at `/`
3. Clicking the card navigates to `/ocr`
4. Drag-and-drop an image onto the drop zone → preview appears
5. Click "Extract Text" → text streams in from Ollama
6. Copy button copies result to clipboard
7. Cancel button aborts mid-stream
8. Stop Ollama → error message shown
9. Upload a .gif → rejected with file type error
10. Upload a 15 MB file → rejected with size error
11. `pnpm build` completes without type errors
12. `pnpm lint` passes

## Files Summary

| File | Action |
|---|---|
| `src/types/index.ts` | Create |
| `src/lib/constants.ts` | Create |
| `src/lib/cn.ts` | Create |
| `src/lib/ollama-client.ts` | Create |
| `src/lib/file-utils.ts` | Create |
| `src/lib/tools.ts` | Create |
| `src/hooks/use-ollama.ts` | Create |
| `src/components/shared/file-drop-zone.tsx` | Create |
| `src/components/shared/result-viewer.tsx` | Create |
| `src/components/shared/copy-button.tsx` | Create |
| `src/components/shared/nav-bar.tsx` | Create |
| `src/components/tools/ocr/ocr-tool.tsx` | Create |
| `src/pages/home.tsx` | Create |
| `src/pages/ocr.tsx` | Create |
| `src/App.tsx` | Replace |
| `src/index.css` | Replace |
| `src/App.css` | Delete |
| `index.html` | Modify (title) |
| `vite.config.ts` | Modify (Tailwind plugin) |
