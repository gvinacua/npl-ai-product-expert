# v4.6 Changelog — Cost Control + Block Voice UX

## Added
- Cost-aware UI panel by mode.
- Draft/deep/web status displayed in output metadata.
- ElevenLabs character limit in the UI.
- Server-side ElevenLabs max-character guardrail via ELEVENLABS_MAX_CHARS.
- Voice block parser and block-level audio generation.
- Browser voice and ElevenLabs per-block options.
- Delivery options panel: prep, voice blocks, live later.
- Knowledge pack: cost control and delivery operations.

## Why
The project needs to be usable and affordable. The correct workflow is to generate and iterate cheaply, then spend on stronger models and high-quality voice only when output quality justifies it.

## Recommended env var
Optional:
ELEVENLABS_MAX_CHARS=3000
