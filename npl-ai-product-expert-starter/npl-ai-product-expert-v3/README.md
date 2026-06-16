# NPL AI Product Expert

Internal prototype of an AI expert speaker and trainer for financial services AI product programs.

## Current version: v3

This version includes:

- Speaker Mode
- Training Designer
- Lesson Delivery Mode
- Frontier Radar
- Panel / Q&A Expert
- AI Sparring Partner
- Local curated markdown knowledge packs in `/knowledge`
- Password protection via `APP_PASSWORD`
- OpenAI API backend via `/api/chat`

## Environment variables

Required:

```bash
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4.1-mini
APP_PASSWORD=choose_a_password
```

Optional:

```bash
LOCAL_KNOWLEDGE_MAX_CHARS=65000
OPENAI_VECTOR_STORE_ID=
```

## Recommended first prompts

### Lesson Delivery
```
Design the live delivery for a 20-minute lesson called: From AI Tools to AI Products. Make it voice-ready, with timed blocks, what the expert says, audience pauses, one mini-exercise and a strong closing.
```

### Frontier Radar
```
Create a frontier radar briefing for a financial services leadership team: what is emerging in AI agents, AI products and banking/insurance over the next 12-24 months? Separate stable facts, early signals, vendor claims and hypotheses.
```

### Speaker Mode
```
Create a 25-minute guest speaker talk for a banking and insurance audience on: From AI tools to AI products. Include storyline, key messages, examples, speaker notes and 5 likely questions.
```

## Deployment

Deploy through Vercel. If the app lives inside a folder in the repository, set the Vercel root directory to that folder.
