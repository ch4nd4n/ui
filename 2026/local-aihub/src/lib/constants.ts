export const OLLAMA_BASE_URL = "http://localhost:11434";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const THEME_STORAGE_KEY = "aihub:theme" as const;

export type Theme = "light" | "dark" | "system";
