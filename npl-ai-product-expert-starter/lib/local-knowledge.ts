import fs from "fs";
import path from "path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const DEFAULT_MAX_CHARS = 120000;

export function loadLocalKnowledge(): string {
  try {
    if (!fs.existsSync(KNOWLEDGE_DIR)) return "";
    const files = fs
      .readdirSync(KNOWLEDGE_DIR)
      .filter((file) => file.endsWith(".md"))
      .sort();

    const content = files
      .map((file) => {
        const fullPath = path.join(KNOWLEDGE_DIR, file);
        const text = fs.readFileSync(fullPath, "utf8");
        return `\n\n--- SOURCE FILE: ${file} ---\n${text}`;
      })
      .join("\n");

    const maxChars = Number(process.env.LOCAL_KNOWLEDGE_MAX_CHARS || DEFAULT_MAX_CHARS);
    if (content.length > maxChars) {
      return content.slice(0, maxChars) + "\n\n[Local knowledge truncated for context length.]";
    }
    return content;
  } catch (error) {
    console.error("Could not load local knowledge", error);
    return "";
  }
}
