# Cost Control and Delivery Operations v4.6

Cost is a product design constraint for the NPL AI Product Expert.

## Default model policy
- Use the cheapest reliable model for drafts, short panel answers, voice scripts, and internal tests.
- Use stronger/deeper models only for client-ready materials, research scans, expertise audits, point-of-view building, and high-stakes reasoning.
- Use web search only when recency or external evidence is essential.

## Voice cost policy
- Never convert long full-session outputs by default.
- Generate audio by selected text or by one voice block at a time.
- Keep each TTS request short enough for evaluation and rehearsal.
- Use browser voice for rough testing and ElevenLabs only for quality checks, client demos, or final rehearsal.

## Webinar delivery options
1. Human-led webinar with AI-generated speaker assets: lowest risk and lowest cost.
2. Human operator plays selected voice blocks or reads scripts live: controlled synthetic speaker demo.
3. Voice Q&A cockpit: human operator routes questions to the agent, approves answer, then plays/reads response.
4. Real-time agent via Vapi/OpenAI Realtime: later stage, with human override and consent/disclosure.

## Principle
The expert should feel premium, but the system should not spend premium money on every draft.
