import { useCallback, useRef, useState } from "react";
import { chatStream } from "@/lib/ollama-client";
import type { OllamaChatMessage } from "@/types/index";

interface UseOllamaOptions {
  model: string;
}

export function useOllama({ model }: UseOllamaOptions) {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(
    async (messages: OllamaChatMessage[]) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setResult("");
      setError(null);
      setIsLoading(true);

      try {
        await chatStream(
          { model, messages },
          (chunk) => {
            if (chunk.message?.content) {
              setResult((prev) => prev + chunk.message.content);
            }
          },
          controller.signal
        );
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof TypeError && err.message === "Failed to fetch"
            ? "Cannot connect to Ollama. Make sure it's running on localhost:11434."
            : err instanceof Error
              ? err.message
              : "An unexpected error occurred.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [model]
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setResult("");
    setError(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, error, generate, abort, reset };
}
