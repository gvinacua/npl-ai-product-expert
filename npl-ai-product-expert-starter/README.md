# NPL AI Product Expert v4.7

Internal prototype for a research-led AI product expert speaker/trainer for financial services.

## v4.7 focus
- Cost control layer.
- Better internal UX.
- Block-level ElevenLabs audio generation.
- Server-side TTS character guardrail.
- Delivery options documentation for webinars.

## Environment variables
Required:
- OPENAI_API_KEY
- OPENAI_MODEL
- APP_PASSWORD

Optional / recommended:
- OPENAI_DEEP_MODEL
- OPENAI_SEARCH_MODEL
- ENABLE_WEB_SEARCH=true
- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID
- ELEVENLABS_MODEL_ID=eleven_multilingual_v2
- ELEVENLABS_MAX_CHARS=3000

## Cost principle
Use cheap/draft model by default. Use deep/search/voice only when the output is worth it.
