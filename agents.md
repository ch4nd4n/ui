# AGENTS.md

This file provides instructions for AI coding agents working on this monorepo.

## Setup

This is a monorepo with multiple independent projects. Each project has its own dependencies.

```bash
# Navigate to a specific project
cd 2025/<project-name>

# Install dependencies (pnpm preferred)
pnpm install
```

## Build & Test

Commands are project-specific. Common patterns:

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm lint     # Run linter
pnpm test     # Run tests (if configured)
```

## Code Style

- **File naming**: kebab-case for all files (e.g., `todo-item.tsx`)
- **Component structure**: Atomic design pattern
  - `ui/` or `atoms/` - Primitive components (Button, Input)
  - `molecules/` - Combinations (TodoItem, TodoFilter)
  - `organisms/` - Complex features (TodoList, TodoForm)
- **TypeScript**: Strict types, prefer interfaces over types for objects
- **Styling**: Tailwind CSS, shadcn/ui components where applicable
- **Imports**: Prefer relative imports within a project

## Project Structure

```
ui/
├── AGENTS.md           # This file
├── README.md           # Human documentation
├── 2025/               # Year-based project folders
│   └── <project-name>/ # Self-contained projects
├── 2024/
└── docs/               # Optional shared documentation
```

- Each year folder contains multiple UI projects
- Each project is independent with its own `package.json`
- Project names: lowercase, hyphen-separated, include tech/agent name if relevant

## Skills

Detailed guidelines are in `.claude/skills/`:

- [Git & Commits](.claude/skills/git-commits.md) — Conventional commits, message format, pre-commit checks
- [Atomic Design](.claude/skills/atomic-design.md) — Component hierarchy and rules for UI work

## Agent Integration

Multiple AI agents may be used in this repo:

- **Claude**: Code generation, refactoring, UI development
- **Gemini CLI**: Prototyping, scaffolding
- **Other agents**: As needed per project

Each project README should document which agent(s) were used.
