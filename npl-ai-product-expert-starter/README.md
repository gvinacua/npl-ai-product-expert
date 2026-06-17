# NPL AI Product Expert

Current build: v4.9 — UX/UI cleanup and clearer delivery console v4.8.2

Internal prototype for a research-led AI product expert speaker/trainer for financial services.

## v4.8.2 focus
- Interactive Voice Expert beta using OpenAI Realtime over WebRTC.
- Cost-aware realtime model selection.
- Block-level ElevenLabs audio generation remains available for prepared delivery.
- Cost proxy display from v4.7 remains in place.
- Better separation between prepared speaker console and live Q&A rehearsal.

## Environment variables

Required:
- OPENAI_API_KEY
- OPENAI_MODEL
- APP_PASSWORD

Recommended:
- OPENAI_DEEP_MODEL
- OPENAI_SEARCH_MODEL
- ENABLE_WEB_SEARCH=true
- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID
- ELEVENLABS_MODEL_ID=eleven_multilingual_v2
- ELEVENLABS_MAX_CHARS=3000

Optional for Interactive Voice Expert:
- OPENAI_REALTIME_MODEL=gpt-4o-mini-realtime-preview
- OPENAI_REALTIME_DEEP_MODEL=gpt-4o-realtime-preview
- OPENAI_REALTIME_VOICE=alloy

## Cost principle
Use cheap/draft model by default. Use deep/search/voice only when the output is worth it. Keep realtime voice sessions short during testing.


## v4.8.2 Realtime fix

Updated the browser voice expert to use the current OpenAI Realtime WebRTC flow: server-side client secret creation via `/v1/realtime/client_secrets` and browser SDP exchange with `/v1/realtime/calls`.


## v4.8.2
Fixes realtime `response.modalities` by using `output_modalities`. Defaults low-cost realtime to `gpt-realtime-mini`.
