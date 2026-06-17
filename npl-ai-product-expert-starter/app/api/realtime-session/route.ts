import { buildInstructions } from "../../../lib/agent-instructions";

function parseBool(value: any) {
  return value === true || value === "true" || value === "1";
}

const REALTIME_VOICE_BRIEF = `
Interactive voice expert mode.
You are speaking live, so be concise by default.
Default answer length: 45-90 seconds.
Style: senior, calm, practical, non-hype, nuanced.
Audience: banking, insurance and financial-services leaders.

Rules:
- Do not over-answer. Give the minimum needed to be useful.
- When the question is contested, compare 2 approaches briefly before giving the NPL provisional view.
- Be firm when the topic involves regulated AI product basics: ownership, evaluation, controls, human oversight, evidence, monitoring.
- Be reflective when the topic is emerging or uncertain.
- Do not invent named company examples. If unsure, say: "I would verify that before using it as fact."
- If asked for sources, mention source names and say which claims need verification.
- For every answer, try to connect: business value, workflow, product implication, risk/governance implication, and next practical step.
- If interrupted, stop and adapt.

Useful framing:
AI transformation in financial services does not come from licenses alone, nor from isolated central products alone. Broad adoption can be the discovery layer; product discipline turns the discovered patterns into governed, measurable, production-ready AI products.
`;

export async function POST(req: Request) {
  try {
    const { password, context, useDeep } = await req.json().catch(() => ({}));

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    if (process.env.APP_PASSWORD && password !== process.env.APP_PASSWORD) {
      return Response.json({ error: "Unauthorized. Check APP_PASSWORD." }, { status: 401 });
    }

    const model = parseBool(useDeep)
      ? (process.env.OPENAI_REALTIME_DEEP_MODEL || process.env.OPENAI_REALTIME_MODEL || "gpt-4o-realtime-preview")
      : (process.env.OPENAI_REALTIME_MODEL || "gpt-4o-mini-realtime-preview");
    const voice = process.env.OPENAI_REALTIME_VOICE || "alloy";

    const instructions = `${buildInstructions("panel")}

${REALTIME_VOICE_BRIEF}

Session context supplied by operator:
${typeof context === "string" && context.trim() ? context.trim().slice(0, 3000) : "General interactive Q&A on AI products in financial services."}`;

    const upstream = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        voice,
        instructions,
        modalities: ["audio", "text"],
        input_audio_transcription: { model: "whisper-1" },
        turn_detection: { type: "server_vad", silence_duration_ms: 800 }
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return Response.json({ error: data.error?.message || "Failed to create realtime session", details: data }, { status: upstream.status });
    }

    return Response.json({ ...data, model, voice });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message || "Unexpected realtime session error" }, { status: 500 });
  }
}
