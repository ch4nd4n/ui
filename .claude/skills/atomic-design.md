# Atomic Design for UI Components

Always follow atomic design when building UI in this repo.

## Hierarchy

1. **Atoms** (`components/ui/` or `components/atoms/`)
   - Smallest building blocks: Button, Input, Label, Badge, Icon
   - No business logic, only presentation
   - Styled with Tailwind CSS / shadcn/ui

2. **Molecules** (`components/molecules/`)
   - Combinations of atoms: TodoItem, SearchBar, TodoFilter
   - Minimal logic, mostly composition

3. **Organisms** (`components/organisms/`)
   - Complex, self-contained features: TodoList, TodoForm, Sidebar
   - May manage local state and compose molecules/atoms

4. **Templates / Pages** (`components/templates/` or `pages/`)
   - Layout-level composition of organisms
   - Route-level components

## Rules

- Components at each level should only import from the same level or below
- Keep atoms generic and reusable across projects
- File naming: kebab-case (e.g., `todo-item.tsx`)
- One component per file
- Prefer interfaces over types for component props
