import { useEffect, useRef } from "react";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/cn";

interface ResultViewerProps {
  content: string;
  isStreaming: boolean;
  placeholder?: string;
}

export function ResultViewer({
  content,
  isStreaming,
  placeholder = "Extracted text will appear here...",
}: ResultViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  return (
    <div className="relative flex flex-col rounded-lg border border-border bg-muted/30 min-h-70">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">
          {isStreaming ? "Extracting..." : "Result"}
        </span>
        <CopyButton text={content} />
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto p-4 text-sm whitespace-pre-wrap",
          !content && "flex items-center justify-center",
        )}
      >
        {content ? (
          <>
            {content}
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-foreground animate-pulse" />
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-center">{placeholder}</p>
        )}
      </div>
    </div>
  );
}
