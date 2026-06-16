import OpenAI from "openai";
import { buildInstructions, type AgentMode } from "../../../lib/agent-instructions";
import { loadLocalKnowledge } from "../../../lib/local-knowledge";

function isValidMode(mode: string): mode is AgentMode {
  return ["speaker", "lesson", "source_lesson", "training", "panel", "sparring", "pov", "frontier", "research", "audit"].includes(mode);
}

function parseBool(value: any) {
  return value === true || value === "true" || value === "1";
}

export async function POST(req: Request) {
  try {
    const { mode, prompt, password, useWeb, useDeep } = await req.json();

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

    const webRequested = parseBool(useWeb);
    const deepRequested = parseBool(useDeep);
    const webEnabled = process.env.ENABLE_WEB_SEARCH === "true";

    const baseModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const deepModel = process.env.OPENAI_DEEP_MODEL || baseModel;
    const searchModel = process.env.OPENAI_SEARCH_MODEL || deepModel;
    const model = webRequested && webEnabled ? searchModel : deepRequested ? deepModel : baseModel;

    const outputTokenBudget: Record<AgentMode, number> = {
      sparring: 650,
      panel: 700,
      pov: 1200,
      frontier: 1400,
      audit: 1600,
      speaker: 1800,
      training: 2200,
      lesson: 2600,
      source_lesson: 2800,
      research: 3000
    };

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const tools: any[] = [];

    if (process.env.OPENAI_VECTOR_STORE_ID) {
      tools.push({
        type: "file_search",
        vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID],
        max_num_results: 6
      });
    }

    if (webRequested && webEnabled) {
      tools.push({ type: "web_search" });
    }

    const freshnessInstruction = webRequested && !webEnabled
      ? "\n\nNOTE: The user requested web search, but ENABLE_WEB_SEARCH is not true in environment variables. Be transparent that you are using only embedded/local knowledge."
      : "";

    const response = await openai.responses.create({
      model,
      instructions: `${buildInstructions(mode)}\n\nLOCAL CURATED KNOWLEDGE BASE:\n${loadLocalKnowledge()}${freshnessInstruction}`,
      input: prompt,
      tools,
      max_output_tokens: outputTokenBudget[mode],
      temperature: mode === "audit" ? 0.15 : mode === "research" || mode === "frontier" ? 0.25 : 0.35
    } as any);

    return Response.json({
      output: response.output_text || "No output returned.",
      meta: {
        model,
        web_requested: webRequested,
        web_enabled: webEnabled,
        tools: tools.map((t) => t.type)
      }
    });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message || "Unexpected error" }, { status: 500 });
  }
}
