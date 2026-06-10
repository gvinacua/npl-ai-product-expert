export async function GET() {
  return Response.json({
    modes: [
      { id: "speaker", name: "Speaker Mode" },
      { id: "training", name: "Training Designer" },
      { id: "panel", name: "Panel / Q&A Expert" },
      { id: "sparring", name: "AI Sparring Partner" }
    ]
  });
}
