import { OLLAMA_BASE_URL } from "./constants";
import type { OllamaChatRequest, OllamaChatResponseChunk } from "@/types/index";

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("aihub:ollama-url") ?? OLLAMA_BASE_URL;
  }
  return OLLAMA_BASE_URL;
}

export async function chatStream(
  request: OllamaChatRequest,
  onChunk: (chunk: OllamaChatResponseChunk) => void,
  signal?: AbortSignal
): Promise<void> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: true }),
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    if (response.status === 404 || text.includes("not found")) {
      throw new Error(
        `Model '${request.model}' not found. Run \`ollama pull ${request.model}\` to install it.`
      );
    }
    throw new Error(`Ollama returned ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const chunk = JSON.parse(trimmed) as OllamaChatResponseChunk;
      onChunk(chunk);
    }
  }

  if (buffer.trim()) {
    const chunk = JSON.parse(buffer.trim()) as OllamaChatResponseChunk;
    onChunk(chunk);
  }
}

export async function listModels(
  signal?: AbortSignal
): Promise<{ name: string }[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/tags`, { signal });
  if (!response.ok) throw new Error("Failed to fetch models");
  const data = (await response.json()) as { models: { name: string }[] };
  return data.models;
}
