# NPL AI Product Expert — Backlog v1

Purpose: keep track of important improvements we are not implementing right now, so we can close a complete first version before iterating.

## Priority backlog

### 1. Point-of-View Builder
Add a mode that helps develop an NPL position on complex AI topics instead of defaulting to mainstream views.

For each topic, the agent should compare:
- mainstream view;
- alternative or emerging view;
- product-builder view;
- risk/compliance view;
- adoption/culture view;
- NPL provisional position.

Output should include:
- what is known;
- what is emerging;
- what is speculative;
- NPL hypothesis;
- what to keep researching;
- how to explain it in a client session.

### 2. Better adoption vs product nuance
Improve the expert’s view on AI adoption so it does not overstate that licenses or bottom-up use are “just theater”.

Core position to embed:
> Broad adoption is not transformation by itself, but it can be the discovery layer for transformation when connected to operating model, governance, reusable patterns, workflow redesign and product ownership.

Use the AI Operating Model logic:
- personal productivity;
- team workflows;
- organisational infrastructure;
- compounding operating system;
- self-driving organisation.

### 3. Expert personality and interaction style
Define the expert’s personality more clearly.

Desired traits:
- concise;
- senior;
- practical;
- non-hype;
- sharp but not dogmatic;
- able to challenge assumptions;
- able to be reflective when evidence is uncertain;
- firm only when evidence, risk or regulatory context warrants it.

Avoid:
- long answers by default;
- generic consulting tone;
- binary takes;
- overconfident claims on emerging topics.

### 4. NPL signature language
Create a library of NPL-style reframings and lines that the expert can reuse naturally.

Examples:
- AI governance is not the brake. It is the operating system that allows AI products to scale.
- The bottleneck is not access to models. It is product ownership under uncertainty.
- Most AI pilots fail because they are demos looking for a workflow.
- Evaluation is not QA. Evaluation is the product contract.
- The risk is not that AI makes mistakes. The risk is that nobody owns the mistake.

### 5. Non-obvious source hunting
Build a deeper source pipeline beyond mainstream reports.

Source types to monitor:
- event videos;
- public talks;
- slide decks;
- founder/operator interviews;
- fintech and insurance newsletters;
- technical blogs;
- GitHub repos;
- VC memos;
- product demos;
- regulatory speeches;
- podcasts;
- lesser-known case studies.

Target examples:
- banks and insurers using agents in production;
- internal AI marketplaces;
- agent permissioning;
- AI operating model changes;
- governance automation;
- evaluation practices;
- workflow orchestration;
- voice interfaces in regulated environments.

### 6. Claims and evidence discipline
Add stronger claim labeling to the agent.

Each important claim should be classified as:
- confirmed;
- emerging;
- speculative;
- vendor-driven;
- needs verification.

Every client-facing output should include a short “claims to verify before delivery” section when using frontier examples or market numbers.

### 7. Delivery and voice layer
Later, improve the interface so the expert can deliver a class, not just generate text.

Future capabilities:
- lesson delivery by blocks;
- spoken script;
- audience pauses;
- Q&A interaction;
- short answers for panels;
- browser voice first;
- OpenAI Realtime voice later;
- human control / moderator mode.

### 8. Client-ready session module
Create a full first session:

Title:
From AI Tools to AI Products in Financial Services

Should include:
- 30–45 minute class;
- speaker script;
- slides outline;
- exercises;
- senior audience questions;
- examples from banking and insurance;
- claims to verify;
- optional 10-minute version.

## Current decision
Do not implement these backlog items immediately. First close a complete working version of the app with:
- concise expert personality;
- core modes working;
- research scout;
- expertise audit;
- lesson delivery mode;
- stable GitHub/Vercel deployment.
