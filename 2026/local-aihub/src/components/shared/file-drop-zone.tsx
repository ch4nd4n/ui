import { useCallback, useRef, useState, type DragEvent } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface FileDropZoneProps {
  onFile: (file: File) => void;
  accept: string[];
  maxSize: number;
  preview?: string | null;
  error?: string | null;
}

export function FileDropZone({
  onFile,
  accept,
  maxSize,
  preview,
  error,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback(
    (file: File): string | null => {
      if (!accept.includes(file.type)) {
        return "Unsupported file type. Please upload a JPG, PNG, or WebP image.";
      }
      if (file.size > maxSize) {
        return "File is too large (max 10 MB).";
      }
      return null;
    },
    [accept, maxSize],
  );

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file);
      if (err) {
        setLocalError(err);
        return;
      }
      setLocalError(null);
      onFile(file);
    },
    [validate, onFile],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const displayError = error ?? localError;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer min-h-70",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          displayError && "border-destructive",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept.join(",")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />

        {preview ? (
          <img
            src={preview}
            alt="Upload preview"
            className="max-h-60 max-w-full rounded object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            {isDragging ? (
              <ImageIcon className="h-10 w-10" />
            ) : (
              <Upload className="h-10 w-10" />
            )}
            <div className="text-center text-sm">
              <p className="font-medium">
                {isDragging
                  ? "Drop image here"
                  : "Drop image here or click to browse"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, or WebP up to 10 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {displayError && (
        <p className="text-sm text-destructive">{displayError}</p>
      )}
    </div>
  );
}
