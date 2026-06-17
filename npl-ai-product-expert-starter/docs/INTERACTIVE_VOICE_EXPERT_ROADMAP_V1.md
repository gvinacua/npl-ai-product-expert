# Interactive Voice Expert Roadmap v1

## Target delivery format

The preferred next delivery format is an interactive voice expert, not a fully autonomous webinar attendee.

## Stage 1 — Current state

- Text expert console.
- ElevenLabs block-level voice output.
- Human operator controls session delivery.
- Suitable for rehearsal, demos, and pre-recorded speaker blocks.

## Stage 2 — Interactive voice expert

The agent should answer audience or host questions in short spoken responses.

Core behaviours:
- 60–90 second default answers.
- Concise, senior, nuanced, non-hype tone.
- Financial-services specificity.
- Explicit uncertainty when needed.
- Claims-to-verify when the evidence is not strong.
- Ability to switch between short answer, deeper answer, and contrarian view.

Likely stack options:
- Vapi for fastest voice-agent deployment and interaction testing.
- OpenAI Realtime for tighter OpenAI-native voice interaction.
- Deepgram if we later need modular STT/TTS control.

## Stage 3 — Controlled webinar use

The agent does not independently attend Zoom/Teams at first. Instead:
- NPL operator joins the webinar.
- The app runs as a control console.
- The agent handles Q&A through a voice interface or prepared blocks.
- Human operator controls when it speaks.

## Stage 4 — Full webinar participant

Later only. Requires:
- Meeting SDK integration.
- Audio routing.
- Explicit disclosure.
- Human override.
- Logging and incident controls.
- Permissions and authentication.

## Product principle

Do not chase autonomy first. Build credibility, usefulness, source discipline, cost control and human control first.
