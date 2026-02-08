# Feature: Image OCR

**Status**: Planned
**Phase**: 1 (MVP)
**Priority**: Highest

## Overview

Users upload an image and get extracted text back. Processing happens locally via Ollama's glm-ocr model. This is the first tool in Local-AiHub and validates the core infrastructure that all future tools will share.

## User Flow

1. User navigates to `/ocr` (or clicks the OCR card on the home page)
2. User uploads an image by dragging it onto the drop zone or clicking to browse
3. A preview of the uploaded image is shown
4. User clicks "Extract Text" (or extraction starts automatically on upload)
5. A loading/streaming indicator appears
6. Extracted text streams in, token by token, in a result panel
7. When complete, user can:
   - Copy the full result to clipboard
   - Upload a new image to start over
   - Cancel mid-stream if needed

## Supported Inputs

| Format | MIME Type |
|---|---|
| JPEG | image/jpeg |
| PNG | image/png |
| WebP | image/webp |

**Max file size**: 10 MB

## Ollama Integration

- **Model**: `glm-ocr`
- **Endpoint**: `POST http://localhost:11434/api/chat`
- **Streaming**: Yes (default)
- **Payload**:
  ```json
  {
    "model": "glm-ocr",
    "messages": [
      {
        "role": "user",
        "content": "OCR this image",
        "images": ["<base64-encoded-image>"]
      }
    ],
    "stream": true
  }
  ```
- Each streamed line is a JSON object. The text content is in `message.content`.

## Error Scenarios

| Scenario | How detected | User sees |
|---|---|---|
| Ollama not running | Connection refused / fetch error | "Cannot connect to Ollama. Make sure it's running on localhost:11434." |
| Model not pulled | HTTP 404 or error in response | "Model 'glm-ocr' not found. Run `ollama pull glm-ocr` to install it." |
| Unsupported file type | Client-side check on file.type | "Unsupported file type. Please upload a JPG, PNG, or WebP image." |
| File too large | Client-side check on file.size | "File is too large (max 10 MB)." |
| Stream interrupted | Fetch error mid-stream | "Connection lost during processing. Please try again." |
| Empty response | Stream completes with no content | "No text was extracted from this image. Try a different image or model." |

## UI Layout

```
┌─────────────────────────────────────┐
│  Local-AiHub        [Home] [OCR]    │  ← Nav bar
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────┐  ┌────────────┐  │
│  │               │  │            │  │
│  │  Drop image   │  │  Extracted │  │
│  │  here or      │  │  text      │  │
│  │  click to     │  │  appears   │  │
│  │  browse       │  │  here      │  │
│  │               │  │  (streams) │  │
│  │  [preview     │  │            │  │
│  │   shows here] │  │     [Copy] │  │
│  └───────────────┘  └────────────┘  │
│                                     │
│  [Extract Text]     [Cancel]        │
│                                     │
└─────────────────────────────────────┘
```

Two-column layout on desktop, stacked on mobile. Left panel is input (drop zone + preview), right panel is output (streamed result + copy button).

## Acceptance Criteria

- [ ] User can upload a JPG, PNG, or WebP image via drag-and-drop or file picker
- [ ] Uploaded image preview is displayed
- [ ] Invalid file types are rejected with a clear message
- [ ] Files over 10 MB are rejected with a clear message
- [ ] Clicking "Extract Text" sends the image to Ollama and streams the result
- [ ] Text appears token-by-token as the stream progresses
- [ ] User can cancel mid-stream
- [ ] Copy button copies the full result to clipboard
- [ ] Appropriate error messages shown when Ollama is unreachable or model is missing
- [ ] UI is dark-mode-first, responsive, and looks professional
