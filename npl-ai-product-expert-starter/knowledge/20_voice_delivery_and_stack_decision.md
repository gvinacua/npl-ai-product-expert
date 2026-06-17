# Voice Delivery and Stack Decision

## Current product decision
Start with voice delivery, not full autonomy. The first goal is to hear whether the NPL AI Product Expert can deliver a lesson with credible pacing, tone and concision.

## Recommended path
1. Generate a source-grounded lesson.
2. Convert it into voice-ready blocks.
3. Use ElevenLabs TTS to listen to delivery.
4. Evaluate: clarity, pacing, authority, concision, and whether the spoken content feels like a senior guest speaker.
5. Only then add live Q&A.

## Stack view
- ElevenLabs: best first choice for high-quality synthetic delivery because the user already uses it and it provides strong TTS quality.
- Vapi: best next choice for conversational/live Q&A prototypes because it handles voice-agent orchestration and web/phone calls.
- Deepgram: best for a custom STT/TTS/LLM pipeline when we need detailed control over latency, transcripts and component selection.
- OpenAI Realtime: best candidate for a custom browser-native voice agent integrated tightly with the existing OpenAI model and tool stack.

## Principle
Voice should not hide weak expertise. Use voice only after the content has passed evidence and quality checks.
