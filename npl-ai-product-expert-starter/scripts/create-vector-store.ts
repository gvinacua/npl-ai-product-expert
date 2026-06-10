import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const store = await client.vectorStores.create({ name: "NPL AI Product Expert Knowledge Base" });
  console.log("Created vector store:", store.id);
  console.log("Add this to .env.local / Vercel env vars:");
  console.log(`OPENAI_VECTOR_STORE_ID=${store.id}`);
}

main().catch(err => { console.error(err); process.exit(1); });
