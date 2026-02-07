# Local-AiHub

A collection of simple, focused, offline-capable tools that let you interact with local LLMs through clean, modern web UIs.

## Features

- **Image OCR** — Upload an image and extract text, tables, and figures
- **Image Description** — Get detailed natural language descriptions of images *(planned)*
- **Document Q&A** — Ask questions about uploaded PDFs and text files *(planned)*
- **Text Rewriter** — Rephrase, summarize, expand, or shift tone *(planned)*
- **Prompt Playground** — Test prompts and compare model outputs *(planned)*

All processing happens locally on your machine. No data is sent to the cloud.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Ollama](https://ollama.com/) running locally

Pull the models you need:

```bash
# For Image OCR
ollama pull glm-edge-ocr
```

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui

## Documentation

- [Product Specification](docs/prd.md)
- [Architecture](docs/architecture.md)
- [Contributing](CONTRIBUTING.md)

## License

Private
