# vite-todo-react

A Todo application built with React 19 and Vite, using agentic coding practices.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Package Manager**: pnpm

## Features

- Add, edit, and delete todos
- Mark todos as complete/incomplete
- Filter by status (all/active/completed)
- Inline editing

## Getting Started

```bash
pnpm install
pnpm dev
```

## Folder Structure

```
src/
├── components/
│   ├── molecules/    # Mid-level components (todo-item, todo-filter)
│   ├── organisms/    # Complex components (todo-list, todo-form)
│   └── ui/           # Primitive UI components (button, checkbox, input)
├── lib/              # Utilities
├── pages/            # Page components
└── main.tsx          # Entry point
```

## Conventions

- All files use kebab-case naming
- Components follow atomic design: atoms/ui (basic), molecules (combinations), organisms (complex)
- UI built with shadcn/ui and styled using Tailwind CSS

## Agent Integration

This project was built using **Claude** (Anthropic) as the primary AI coding agent for code generation, UI suggestions, and development assistance.
