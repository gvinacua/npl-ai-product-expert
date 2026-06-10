import OpenAI from "openai";
import { buildInstructions, type AgentMode } from "../../../lib/agent-instructions";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function isValidMode(mode: string): mode is AgentMode {
  return ["speaker", "training", "panel", "sparring"].includes(mode);
}

export async function POST(req: Request) {
  try {
    const { mode, prompt, password } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    if (process.env.APP_PASSWORD && password !== process.env.APP_PASSWORD) {
      return Response.json({ error: "Unauthorized. Check APP_PASSWORD." }, { status: 401 });
    }

    if (!isValidMode(mode)) {
      return Response.json({ error: "Invalid mode" }, { status: 400 });
    }

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Missing prompt" }, { status: 400 });
    }

    const tools: any[] = [];
    if (process.env.OPENAI_VECTOR_STORE_ID) {
      tools.push({ type: "file_search", vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID] });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: buildInstructions(mode),
      input: prompt,
      tools,
      temperature: 0.4
    } as any);

    return Response.json({ output: response.output_text || "No output returned." });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message || "Unexpected error" }, { status: 500 });
  }
}
