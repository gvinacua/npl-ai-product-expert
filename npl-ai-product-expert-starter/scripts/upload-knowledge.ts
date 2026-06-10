import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const knowledgeDir = path.join(process.cwd(), "knowledge");

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  if (!process.env.OPENAI_VECTOR_STORE_ID) throw new Error("Missing OPENAI_VECTOR_STORE_ID");

  const files = fs.readdirSync(knowledgeDir)
    .filter(name => !name.startsWith("."))
    .map(name => path.join(knowledgeDir, name))
    .filter(file => fs.statSync(file).isFile());

  if (files.length === 0) {
    console.log("No files found in /knowledge");
    return;
  }

  for (const filePath of files) {
    console.log("Uploading", path.basename(filePath));
    const uploaded = await client.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants"
    } as any);
    await client.vectorStores.files.create(process.env.OPENAI_VECTOR_STORE_ID, {
      file_id: uploaded.id
    });
    console.log("Added", uploaded.id);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
