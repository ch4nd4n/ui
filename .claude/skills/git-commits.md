# Git & Commit Skills

## Conventional Commits (required)

- `feat:` — New feature or functionality
- `fix:` — Bug fix
- `docs:` — Documentation only changes
- `refactor:` — Code change that neither fixes a bug nor adds a feature
- `style:` — Formatting, missing semicolons, etc. (no code change)
- `test:` — Adding or updating tests
- `chore:` — Build process, tooling, dependency updates

## Commit Message Format

- Format: `<type>: <short summary>` (imperative mood, lowercase, no period)
- Scope (optional): `feat(todo-app): add filter by status`
- Keep commits focused and atomic — one logical change per commit

## Before Committing

- Run `pnpm lint` and `pnpm build` when available
- Do not commit generated files, `node_modules/`, or `.env` files
