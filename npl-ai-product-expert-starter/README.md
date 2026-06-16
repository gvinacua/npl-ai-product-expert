# NPL AI Product Expert — v4.3

This version adds a concise expert persona and tighter output controls.

# NPL AI Product Expert

Internal prototype of an AI expert speaker and trainer for financial services AI product programs.

## Current version: v4.3

This version includes:
- Speaker Mode
- Training Designer
- Lesson Delivery Mode
- Frontier Briefing
- Research Scout
- Expertise Audit
- Panel / Q&A Expert
- AI Sparring Partner
- Local curated markdown knowledge packs in `/knowledge`
- Optional web search for frontier/research requests
- Optional deep model for higher quality outputs
- Browser voice preview via `speechSynthesis`
- Password protection via `APP_PASSWORD`
- OpenAI API backend via `/api/chat`

## Environment variables
Required:
```bash
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4.1-mini
APP_PASSWORD=choose_a_password
```

Recommended for higher quality:
```bash
OPENAI_DEEP_MODEL=gpt-5.5
OPENAI_SEARCH_MODEL=gpt-5.5
LOCAL_KNOWLEDGE_MAX_CHARS=120000
```

Optional web search:
```bash
ENABLE_WEB_SEARCH=true
```

Optional vector store:
```bash
OPENAI_VECTOR_STORE_ID=
```

## Recommended first tests

### Research Scout
Use web search if enabled.
```
Find 20 sources, tools, examples or weak signals that could make an AI product training program for banks and insurers feel genuinely fresh. Do not only include mainstream sources. Classify each item by source type, confidence, why it matters, and how NPL could use it in a session.
```

### Expertise Audit
Paste any generated output.
```
Audit this output against the NPL AI Expert quality rubric. Be strict. Identify generic statements, missing depth, missing financial-services specificity, weak evidence, missing frontier signals, and how to rewrite it.
```

### Lesson Delivery
```
Deliver a 35-minute interactive class for banking and insurance teams: How to design AI products that survive production. Include timed blocks, spoken script, audience pauses, one exercise, and closing synthesis.
```

## v4.3 update

This version corrects the expert's adoption thesis. It should no longer frame broad AI adoption as mere theatre. The expert now distinguishes between unmanaged tool dumping and adoption-with-operating-model: training, champions/wizards, communities, safe platforms, shared skills, use-case marketplaces and a path from individual productivity to governed workflows and AI products.


## v4.3 additions

- Source-Grounded Lesson Builder mode for client-facing lessons built around verified examples.
- Point-of-View Builder mode for nuanced NPL positions on contested AI topics.
- Embedded quality defaults across all modes: concise outputs, no invented company cases, claims-to-verify, financial-services specificity and source discipline.
- New knowledge pack: `knowledge/18_mode_quality_and_point_of_view_engine.md`.
