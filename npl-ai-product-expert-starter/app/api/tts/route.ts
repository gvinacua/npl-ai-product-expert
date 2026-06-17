export const runtime = "nodejs";

function parseText(input: any) {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/\[[^\]]{0,80}\]\([^\)]{0,200}\)/g, "")
    .replace(/[#*_>`]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(req: Request) {
  try {
    const { text, password } = await req.json();

    if (process.env.APP_PASSWORD && password !== process.env.APP_PASSWORD) {
      return Response.json({ error: "Unauthorized. Check APP_PASSWORD." }, { status: 401 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

    if (!apiKey) return Response.json({ error: "Missing ELEVENLABS_API_KEY" }, { status: 500 });
    if (!voiceId) return Response.json({ error: "Missing ELEVENLABS_VOICE_ID" }, { status: 500 });

    const cleanText = parseText(text).slice(0, 9500);
    if (!cleanText) return Response.json({ error: "Missing text to speak" }, { status: 400 });

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: modelId,
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.8,
            style: 0.15,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({ error: `ElevenLabs error: ${errorText}` }, { status: response.status });
    }

    const audio = await response.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      }
    });
  } catch (error: any) {
    return Response.json({ error: error.message || "Unexpected TTS error" }, { status: 500 });
  }
}
