import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants";

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URL prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(",")[1];
      if (base64) {
        resolve(base64);
      } else {
        reject(new Error("Failed to encode file as base64"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Unsupported file type. Please upload a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File is too large (max 10 MB).";
  }
  return null;
}
