# UI Experimentation Monorepo

This repository is dedicated to experimenting with user interfaces, leveraging various AI-based agents (such as Claude, Gemini CLI, etc.) to generate and enhance UI projects using agentic coding principles.

## Folder Structure

- The root directory contains only essential files:
  - `README.md`: Project overview and structure.
  - `LICENSE`: License information (not strictly enforced; contributors may specify as needed).
  - `agents.md`: Documentation of agentic coding practices and agent usage.
  - `docs/`: (Optional) Additional documentation.
  - `config/`: (Optional) Shared configuration for agents or UI.
- Each year is represented as a folder (e.g., `2025`, `2024`).
- Each year folder contains multiple UI projects, each in its own subfolder.

Example:
```
ui/
├── README.md
├── LICENSE
├── agents.md
├── docs/
├── config/
├── 2025/
│   ├── claude-chat-ui/
│   ├── gemini-cli-explorer/
│   └── ...
├── 2024/
│   └── agent-dashboard/
```

## UI Frameworks & Tooling

- React will be used most often for UI projects, but other frameworks like Angular, Vue, and Svelte are also welcome.
- The root of the monorepo is agnostic of framework and tooling; specifics (such as framework, build tools, etc.) are defined at the project/app level.
- For Node.js projects, pnpm is recommended as the package manager.

## Naming Convention

- Project names should be lowercase and hyphen-separated.
- Include agent or technology name if relevant.
- Prefer descriptive, unique names over generic ones.
- Naming conventions may evolve annually.

## Agentic Coding

Agentic coding involves designing and building software with autonomous AI agents that can generate, modify, and manage code or UI components. These agents leverage AI models to assist in development, experimentation, and automation.

### Types of Agents

- **Claude** (Anthropic): AI agent for code generation, UI suggestions, and automation
- **Gemini CLI** (Google): Command-line agent for UI prototyping and code scaffolding
- **Custom Agents**: Any bespoke agents developed for specific UI tasks

### Best Practices

- Use descriptive project names reflecting the agent and purpose
- Document which agents were used in each project's README
- Review agent outputs for quality and correctness
- Evolve agent integration strategies annually

### Agent Instructions

See [`agents.md`](agents.md) for actionable instructions that AI agents follow when working on this repository (setup, code style, conventions).

## License

This project does not enforce a specific license. Contributors may specify or choose a license for their projects as needed.