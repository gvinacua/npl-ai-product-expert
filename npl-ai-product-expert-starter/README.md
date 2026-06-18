# NPL AI Product Expert — v5

Internal prototype for Net Positive Labs. v5 reorganizes the app around three jobs-to-be-done: build a learning asset, talk with the expert, and deliver / activate.

## Main workflows

- **Build a learning asset**: sessions, modules, source packs and programme/proposal material.
- **Talk with the expert**: text or live voice conversation, point-of-view building, panel answers and sparring.
- **Deliver / activate**: voice-ready blocks, ElevenLabs block audio, live Q&A support and operator-ready delivery packs.

Quality, evidence and cost now appear as transversal signals inside each workflow rather than separate primary modes.

## Environment variables

```
OPENAI_API_KEY=...
APP_PASSWORD=...
OPENAI_MODEL=gpt-4.1-mini
OPENAI_DEEP_MODEL=gpt-4.1
ENABLE_WEB_SEARCH=true_or_false
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
OPENAI_REALTIME_MODEL=gpt-realtime-2
OPENAI_REALTIME_DEEP_MODEL=gpt-realtime-2
OPENAI_REALTIME_VOICE=marin
```

## Notes

- Keep deep models off for normal drafts.
- Generate ElevenLabs audio one block at a time.
- Use live voice for internal conversation/rehearsal, not public webinar attendance yet.
