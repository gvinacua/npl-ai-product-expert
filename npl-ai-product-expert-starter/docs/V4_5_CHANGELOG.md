# V4.5 Changelog — Voice Delivery Layer

Adds a first practical voice-delivery layer without over-engineering.

## Added
- New mode: Voice Delivery Prep.
- ElevenLabs TTS integration through `/api/tts`.
- Output audio player in the UI.
- Browser voice remains as a free fallback.

## Environment variables
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`
- `ELEVENLABS_MODEL_ID` default: `eleven_multilingual_v2`

## Design decision
V4.5 is not yet a real-time conversational agent. It is a delivery prototype: generate a voice-ready session, turn it into audio, listen to pacing/voice, and evaluate if the expert sounds credible.

## Next backlog
- Vapi real-time Q&A mode.
- OpenAI Realtime exploration for browser-native voice agent.
- Deepgram/ElevenLabs custom pipeline only if we need more control.
