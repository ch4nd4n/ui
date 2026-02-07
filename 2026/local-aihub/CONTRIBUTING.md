# Contributing

## Development Setup

```bash
# Prerequisites
# - Node.js v18+
# - pnpm
# - Ollama running locally (for testing tools)

cd 2026/local-aihub
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (type-check + bundle) |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build locally |

## Branch Strategy

- `main` is the default branch
- Create feature branches from `main`: `feat/<short-description>`
- Create fix branches from `main`: `fix/<short-description>`

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add image description tool
fix: handle Ollama connection timeout
docs: update architecture with streaming details
refactor: extract shared file-drop-zone component
```

Keep commits focused and atomic. One logical change per commit.

## Pull Request Checklist

- [ ] Code compiles (`pnpm build`)
- [ ] Linter passes (`pnpm lint`)
- [ ] New tool follows the registration pattern in `AGENTS.md`
- [ ] Error states are handled with actionable user messages
- [ ] No hardcoded URLs — use constants/config
- [ ] AI contributions include `Co-Authored-By` in commit message

## Code Style

- File names: kebab-case (`file-drop-zone.tsx`)
- TypeScript: strict mode, interfaces for object shapes
- Styling: Tailwind CSS utilities, shadcn/ui primitives
- No `any` types without justification
- Prefer early returns over deeply nested conditionals
