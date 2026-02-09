# Feature: Markdown to JSON Conversion

**Status**: Implemented
**Phase**: 1 (MVP Enhancement)
**Priority**: High

## Overview

Users can convert markdown content (such as mutual fund factsheets) into structured JSON data using Ollama AI. By selecting a predefined template and pasting markdown content, the system extracts and structures data according to the template schema.

## User Flow

1. User navigates to `/tools/markdown-to-json`
2. User selects a JSON template from the dropdown (e.g., "Mutual Fund Factsheet")
3. User pastes markdown content into the textarea
4. User clicks "Generate JSON" button
5. Ollama processes the content using template-specific instructions
6. Structured JSON output appears in the output panel
7. User can copy the JSON result to clipboard
8. User can clear inputs and start over

## Template System

### Mutual Fund Factsheet Template

Extracts key information from mutual fund factsheets:

| Field           | Type   | Description                             |
| --------------- | ------ | --------------------------------------- |
| `fundName`      | string | Name of the mutual fund                 |
| `amcName`       | string | Asset Management Company name           |
| `nav`           | number | Current Net Asset Value                 |
| `expenseRatio`  | number | Expense ratio as percentage             |
| `aum`           | string | Assets Under Management                 |
| `returns1Y`     | number | 1-year return percentage                |
| `returns3Y`     | number | 3-year return percentage (annualized)   |
| `returns5Y`     | number | 5-year return percentage (annualized)   |
| `riskLevel`     | string | Risk level (Low/Medium/High)            |
| `category`      | string | Fund category (Equity/Debt/Hybrid/etc)  |
| `managerName`   | string | Fund manager name                       |
| `inceptionDate` | string | Fund inception date (YYYY-MM-DD format) |

## UI Components

### Left Panel

- **Template Selector**: Dropdown to select template (Mutual Fund Factsheet, etc.)
- **Markdown Input**: Large textarea for pasting markdown content
- **Action Buttons**:
  - "Generate JSON": Process markdown with selected template
  - "Cancel": Abort ongoing generation
  - "Clear": Reset inputs and outputs

### Right Panel

- **JSON Output**: Read-only display of extracted JSON
- **Copy Button**: Copy JSON to clipboard
- **Error Display**: Shows errors from Ollama or processing

## Implementation Details

### File Structure

```
src/
  lib/
    templates/
      json-templates.ts          # Template definitions
  components/
    tools/
      markdown-to-json/
        markdown-to-json-tool.tsx # Main component
  pages/
    markdown-to-json.tsx          # Page wrapper
```

### Template Definition Interface

```typescript
interface JsonTemplate {
  id: string; // Unique identifier
  name: string; // Display name
  description: string; // User-facing description
  schema: Record<string, string>; // Field definitions
  systemPrompt: string; // Instructions for Ollama
}
```

### Ollama Integration

- Uses existing `useOllama` hook pattern
- Default model: `llama3.2` (configurable per template)
- System prompt per template instructs the model on extraction
- User message contains the markdown content
- Streams response and displays JSON output

### State Management

- **selectedTemplateId**: Active template selection
- **markdownInput**: User's pasted markdown content
- **jsonOutput**: Final extracted JSON
- **validationError**: Client-side validation messages
- **useOllama Hook**: Manages AI generation state (isLoading, error, result)

## Error Handling

| Scenario                 | Handling                                           |
| ------------------------ | -------------------------------------------------- |
| No template selected     | Validation error: "Please select a valid template" |
| Empty markdown input     | Validation error: "Please paste markdown content"  |
| Ollama connection failed | Displays error: "Cannot connect to Ollama..."      |
| Invalid markdown         | Ollama may return null/incomplete values           |
| Generation timeout       | Shows timeout error message                        |

## UI Integration

### Navigation

- Added "Markdown to JSON" link in NavBar under tools section
- Route: `/tools/markdown-to-json`

### Styling

- Follows existing design system (Card, Button, colors)
- Responsive grid layout (1 column mobile, 2 columns desktop)
- Consistent spacing and typography

## Future Enhancements

- **Additional Templates**:
  - Invoice extraction
  - Resume parsing
  - Product specification sheets
  - Contract key terms

- **JSON Validation**: Validate extracted JSON against schema

- **Export Options**:
  - Download as .json file
  - Export as CSV (for tabular data)

- **Preview Features**:
  - Markdown preview side-by-side
  - JSON preview with syntax highlighting

- **Custom Templates**: User-defined template builder

- **Template Management**:
  - Save/load user templates
  - Template versioning
  - Template sharing

- **Batch Processing**: Convert multiple markdown files

## Acceptance Criteria

- [x] User can select Mutual Fund Factsheet template
- [x] User can paste markdown content
- [x] Clicking "Generate JSON" initiates Ollama processing
- [x] JSON output displays in right panel
- [x] Copy button works for JSON output
- [x] Error handling for Ollama connection issues
- [x] Loading state shows during processing
- [x] Cancel button stops ongoing generation
- [x] Clear button resets inputs and outputs
- [x] Feature is accessible from navigation
- [x] Route `/tools/markdown-to-json` is configured
- [x] Follows existing code patterns (functional components, hooks, TypeScript)

## File Changes Summary

### New Files

- `src/lib/templates/json-templates.ts` - Template definitions
- `src/components/tools/markdown-to-json/markdown-to-json-tool.tsx` - Main tool component
- `src/pages/markdown-to-json.tsx` - Page wrapper component
- `docs/features/markdown-to-json.md` - This documentation

### Modified Files

- `src/App.tsx` - Added route and import
- `src/components/shared/nav-bar.tsx` - Added navigation link
