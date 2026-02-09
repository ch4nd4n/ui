# Feature: Theme Toggle

**Status**: Implemented
**Phase**: 1 (MVP Enhancement)
**Priority**: Medium

## Overview

Users can toggle between light mode, dark mode, or follow their system preference. The choice persists across sessions. This enhances accessibility and user preference while leveraging the existing CSS theme system already built into the app.

## User Flow

1. User opens Local-AiHub (defaults to system preference, or dark if no preference)
2. User clicks the theme toggle button in the top-right NavBar
3. Theme cycles through: System → Light → Dark → System
4. UI instantly updates to reflect the new theme
5. Choice is saved to localStorage
6. On return visits, the saved theme preference is restored
7. No flash of incorrect theme on page load

## Theme Modes

| Mode       | Behavior                                           |
| ---------- | -------------------------------------------------- |
| **System** | Respects `prefers-color-scheme` from OS/browser    |
| **Light**  | Forces light theme regardless of system preference |
| **Dark**   | Forces dark theme regardless of system preference  |

**Default**: System preference (falls back to dark if unavailable)

## LocalStorage Persistence

- **Key**: `"aihub:theme"`
- **Values**: `"light"`, `"dark"`, `"system"`
- **Pattern**: Follows existing localStorage pattern (`"aihub:ollama-url"`)

## UI Integration

### NavBar Button

- **Location**: Right side of NavBar, after navigation links
- **Style**: Ghost button with icon variant (`variant="ghost" size="icon"`)
- **Icons** (from lucide-react):
  - Sun icon: Light mode active
  - Moon icon: Dark mode active
  - Monitor icon: System mode active
- **Interaction**: Click to cycle through modes

### Visual Feedback

- Icon changes to reflect current mode
- Smooth transition between themes (handled by CSS)

### Keyboard Shortcut

- **Shortcut**: `Ctrl+Shift+T` (Windows/Linux) / `Cmd+Shift+T` (Mac)
- **Behavior**: Cycles through theme modes (same as clicking button)
- **Implementation**: Global keydown listener in ThemeToggle component
- **Accessibility**: Works from any page, doesn't interfere with browser shortcuts

## Implementation Details

### CSS Theme System (Already Exists)

The app already has complete theme support in `src/index.css`:

- `:root` defines light mode colors (oklch color space)
- `.dark` class defines dark mode colors
- Custom variant: `@custom-variant dark (&:is(.dark *))`

### Theme Application

Theme is applied by adding/removing `.dark` class on the `<html>` element.

### No Flash Prevention

Inline script in `index.html` runs before React loads to:

1. Read theme from localStorage
2. Detect system preference if theme is "system"
3. Apply `.dark` class immediately if needed
4. Prevent flash of wrong theme

## Error Scenarios

| Scenario                          | Handling                               |
| --------------------------------- | -------------------------------------- |
| localStorage unavailable          | Fall back to dark mode, no persistence |
| Invalid value in localStorage     | Reset to "system" default              |
| System preference detection fails | Default to dark mode                   |

## Acceptance Criteria

- [x] User can toggle between System/Light/Dark modes via NavBar button
- [x] User can toggle theme using keyboard shortcut (Ctrl+Shift+T / Cmd+Shift+T)
- [x] Theme preference persists across browser sessions
- [x] System preference is detected and respected when mode is "system"
- [x] No flash of incorrect theme on page load
- [x] Theme changes apply instantly (no page reload required)
- [x] Icon updates to reflect current theme mode
- [x] Keyboard shortcut works from any page in the app
- [x] Works correctly with all existing UI components (Button, Card, etc.)
- [x] Follows AGENTS.md conventions (kebab-case files, TypeScript, functional components)

## File Changes Summary

### New Files

- `docs/features/theme-toggle.md` - Feature documentation
- `src/hooks/use-theme.ts` - Theme state management hook
- `src/components/shared/theme-toggle.tsx` - Toggle button component

### Modified Files

- `src/lib/constants.ts` - Add theme constants and type
- `src/components/shared/nav-bar.tsx` - Add toggle to UI
- `index.html` - Remove hard-coded dark class, add flash prevention script
