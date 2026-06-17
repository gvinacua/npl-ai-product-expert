# V4.8.1 Changelog — Realtime WebRTC endpoint fix

## Fixed
- Replaced the outdated Realtime session endpoint with the current client secret flow.
- Server now requests a short-lived Realtime client secret from `/v1/realtime/client_secrets`.
- Browser now exchanges SDP with `/v1/realtime/calls`.
- Updated default realtime model/voice fallback to `gpt-realtime-2` and `marin`.
- Improved compatibility with current OpenAI Realtime WebRTC docs.

## Notes
- Keep sessions short while testing cost and quality.
- For Vercel environment variables, prefer:
  - `OPENAI_REALTIME_MODEL=gpt-realtime-2`
  - `OPENAI_REALTIME_DEEP_MODEL=gpt-realtime-2`
  - `OPENAI_REALTIME_VOICE=marin`
