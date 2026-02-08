import type { ComponentType } from "react";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  path: string;
  component: ComponentType;
  defaultModel: string;
}

export interface OllamaChatRequest {
  model: string;
  messages: OllamaChatMessage[];
  stream?: boolean;
}

export interface OllamaChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[];
}

export interface OllamaChatResponseChunk {
  model: string;
  message: { role: string; content: string };
  done: boolean;
}
