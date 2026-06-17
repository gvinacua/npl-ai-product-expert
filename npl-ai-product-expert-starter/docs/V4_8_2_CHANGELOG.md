# v4.8.2 — Realtime response parameter fix

Fixes the Interactive Voice Expert beta error: `Unknown parameter: response.modalities`.

Changes:
- Uses `response.output_modalities: ["audio"]` for realtime response creation.
- Sets session `output_modalities: ["audio"]`.
- Defaults the low-cost realtime model to `gpt-realtime-mini`.
- Keeps stronger realtime model available through `OPENAI_REALTIME_DEEP_MODEL`.

Recommended env vars:
- `OPENAI_REALTIME_MODEL=gpt-realtime-mini`
- `OPENAI_REALTIME_DEEP_MODEL=gpt-realtime-2`
- `OPENAI_REALTIME_VOICE=marin`
