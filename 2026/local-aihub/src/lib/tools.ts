import { ScanText } from "lucide-react";
import { OcrTool } from "@/components/tools/ocr/ocr-tool";
import type { ToolDefinition } from "@/types/index";

export const tools: ToolDefinition[] = [
  {
    id: "ocr",
    name: "Image OCR",
    description: "Extract text from images",
    icon: ScanText,
    path: "/ocr",
    component: OcrTool,
    defaultModel: "glm-ocr",
  },
];
