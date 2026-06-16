export async function GET() {
  return Response.json({
    modes: ["speaker", "lesson", "training", "panel", "sparring", "frontier"]
  });
}
