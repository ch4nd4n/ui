import { useCallback, useState } from "react";
import { ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileDropZone } from "@/components/shared/file-drop-zone";
import { ResultViewer } from "@/components/shared/result-viewer";
import { useOllama } from "@/hooks/use-ollama";
import { fileToBase64 } from "@/lib/file-utils";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";

export function OcrTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const { result, isLoading, error, generate, abort, reset } = useOllama({
    model: "glm-ocr",
  });

  const handleFile = useCallback(async (file: File) => {
    const encoded = await fileToBase64(file);
    setBase64(encoded);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleExtract = useCallback(async () => {
    if (!base64) return;
    await generate([
      {
        role: "user",
        content: "OCR this image",
        images: [base64],
      },
    ]);
  }, [base64, generate]);

  const handleReset = useCallback(() => {
    setPreview(null);
    setBase64(null);
    reset();
  }, [reset]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <ScanText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Image OCR</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <FileDropZone
            onFile={handleFile}
            accept={ACCEPTED_IMAGE_TYPES}
            maxSize={MAX_FILE_SIZE}
            preview={preview}
            error={null}
          />

          <div className="flex gap-2">
            <Button onClick={handleExtract} disabled={!base64 || isLoading}>
              {isLoading ? "Extracting..." : "Extract Text"}
            </Button>

            {isLoading && (
              <Button variant="outline" onClick={abort}>
                Cancel
              </Button>
            )}

            {(preview || result) && !isLoading && (
              <Button variant="ghost" onClick={handleReset}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ResultViewer content={result} isStreaming={isLoading} />

          {error && (
            <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
