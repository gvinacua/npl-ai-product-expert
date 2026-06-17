# v4.8 — Interactive Voice Expert Beta

Adds a first live conversational voice expert path using OpenAI Realtime over WebRTC.

## What changed

- Added `/api/realtime-session` server route to create ephemeral OpenAI Realtime sessions.
- Added an **Interactive voice expert beta** panel in the app.
- Added live start/stop controls.
- Added operator-editable live session context.
- Added transcript/event log for recent user/expert utterances when available.
- Added default cost-safe behavior: cheaper realtime model by default, stronger realtime model only when explicitly selected.
- Kept ElevenLabs block audio for prepared delivery.

## Required environment variables

Required:

```text
OPENAI_API_KEY=...
APP_PASSWORD=...
```

Optional:

```text
OPENAI_REALTIME_MODEL=gpt-4o-mini-realtime-preview
OPENAI_REALTIME_DEEP_MODEL=gpt-4o-realtime-preview
OPENAI_REALTIME_VOICE=alloy
```

## Intended use

Use this for internal rehearsal and controlled demos:

- Q&A rehearsal.
- Expert panel simulation.
- Quick spoken answers.
- Testing whether the expert feels credible as a voice participant.

Do **not** use it yet as an autonomous webinar attendee. That remains a later product stream.

## Cost note

Realtime voice can cost more than text or single-block TTS. Keep sessions short while testing. Use the cheaper realtime model by default.
