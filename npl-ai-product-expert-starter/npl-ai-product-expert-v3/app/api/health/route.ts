export async function GET() {
  return Response.json({
    ok: true,
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
    hasVectorStore: Boolean(process.env.OPENAI_VECTOR_STORE_ID),
    model: process.env.OPENAI_MODEL || "gpt-5.5"
  });
}
