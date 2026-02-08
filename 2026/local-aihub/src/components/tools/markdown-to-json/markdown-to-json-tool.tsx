import { useCallback, useState } from "react";
import { FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/copy-button";
import { useOllama } from "@/hooks/use-ollama";
import { jsonTemplates, getTemplate } from "@/lib/templates/json-templates";

export function MarkdownToJsonTool() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(jsonTemplates[0]?.id || "");
  const [markdownInput, setMarkdownInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { result, isLoading, error, generate, abort, reset } = useOllama({
    model: "llama3.2",
  });

  const handleGenerate = useCallback(async () => {
    const template = getTemplate(selectedTemplateId);
    if (!template) {
      setValidationError("Please select a valid template");
      return;
    }
    if (!markdownInput.trim()) {
      setValidationError("Please paste markdown content");
      return;
    }

    setValidationError(null);
    setJsonOutput("");

    await generate([
      {
        role: "system",
        content: template.systemPrompt,
      },
      {
        role: "user",
        content: markdownInput,
      },
    ]);
  }, [selectedTemplateId, markdownInput, generate]);

  const handleReset = useCallback(() => {
    setMarkdownInput("");
    setJsonOutput("");
    setValidationError(null);
    reset();
  }, [reset]);

  // Extract JSON from result when it completes
  const displayOutput = result || jsonOutput;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <FileJson className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Markdown to JSON</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template</CardTitle>
              <CardDescription>Select a JSON template for extraction</CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              >
                {jsonTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              {selectedTemplateId && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {getTemplate(selectedTemplateId)?.description}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Markdown Content</CardTitle>
              <CardDescription>Paste your markdown content to extract</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                disabled={isLoading}
                placeholder="Paste markdown content here..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50 min-h-72 resize-none"
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={!markdownInput.trim() || isLoading}
                >
                  {isLoading ? "Extracting..." : "Generate JSON"}
                </Button>

                {isLoading && (
                  <Button variant="outline" onClick={abort}>
                    Cancel
                  </Button>
                )}

                {(markdownInput || displayOutput) && !isLoading && (
                  <Button variant="ghost" onClick={handleReset}>
                    Clear
                  </Button>
                )}
              </div>

              {validationError && (
                <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                  {validationError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col flex-1">
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <div>
                <CardTitle className="text-lg">JSON Output</CardTitle>
                <CardDescription className="text-xs">
                  {isLoading ? "Extracting..." : "Structured data result"}
                </CardDescription>
              </div>
              <CopyButton text={displayOutput} />
            </div>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full overflow-y-auto p-4">
                {displayOutput ? (
                  <pre className="text-xs whitespace-pre-wrap break-words">
                    <code>{displayOutput}</code>
                    {isLoading && (
                      <span className="inline-block w-1.5 h-4 ml-0.5 bg-foreground animate-pulse" />
                    )}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {isLoading
                      ? "Processing markdown..."
                      : "JSON output will appear here..."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

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
