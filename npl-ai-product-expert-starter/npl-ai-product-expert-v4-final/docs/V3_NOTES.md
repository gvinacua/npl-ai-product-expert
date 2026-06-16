# NPL AI Product Expert v3 Notes

This version adds:

- Frontier Radar mode.
- Lesson Delivery mode.
- More detailed knowledge packs on emerging AI signals.
- Financial-services frontier use cases.
- Source watchlist and curation model.
- Voice delivery design principles.
- Expertise evaluation rubric.

## Optional environment variable

ENABLE_WEB_SEARCH=true

Leave this OFF unless you want the Radar mode to use live web search via the OpenAI Responses API. Keeping it off controls costs and avoids unpredictable source quality.

## Recommended model during testing

OPENAI_MODEL=gpt-4.1-mini

For better output quality, test temporarily with a stronger model, then switch back if cost matters.

## Recommended test prompt

Mode: Frontier Radar

"Create a frontier radar briefing for a bank/insurer leadership team: what is changing now in AI products, agents, voice interfaces, regulation, financial-services AI, and enterprise architecture. Separate confirmed trends from weak signals and speculative bets."

Mode: Lesson Delivery

"Deliver Lesson 1 of a corporate AI product training program: From AI Tools to AI Products. Break it into 6 teachable blocks. For each block include what the expert says, a financial-services example, one question to ask the audience, and one transition line."
