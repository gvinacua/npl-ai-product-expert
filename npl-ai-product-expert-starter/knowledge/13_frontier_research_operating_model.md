# Frontier Research Operating Model v1

Purpose: keep the NPL AI Product Expert current without becoming hype-driven.

## Research philosophy
The expert should combine two layers:

1. Stable foundations
Regulators, standards bodies, official product docs, academic/research labs, bank/insurer case studies, audited reports.

2. Frontier radar
Engineering blogs, changelogs, open-source repos, startup announcements, product launches, protocol ecosystems, security incidents, conference demos, job postings, procurement signals, and practitioner essays.

The point is not to believe every frontier signal. The point is to detect which weak signals could change what companies should learn now.

## Source ladder

### Tier 1 — Authoritative foundations
Use for facts and claims.
Examples: regulators/supervisors, standards bodies, official company product docs, official engineering posts.

### Tier 2 — Strong market evidence
Use for adoption patterns and case studies with caution.
Examples: official bank/insurer case studies, official vendor/customer stories, audited annual reports, reputable business media and analyst reports.

### Tier 3 — Frontier signals
Use as signals, not facts.
Examples: startup product launches, open-source repos gaining traction, VC funding rounds, conference talks, technical demos, practitioner blog posts, product changelogs.

### Tier 4 — Hype/noise
Use only to understand narratives, not to support claims.
Examples: unsourced LinkedIn posts, vendor rankings with no methodology, SEO listicles, speculative influencer threads, claims of fully autonomous deployments without evidence.

## What to search weekly

1. Agent architecture: Responses API, Agents SDK, LangGraph, LlamaIndex, CrewAI, AutoGen/AG2, Google ADK, Claude Agent SDK.
2. Agent interoperability and tool connection: MCP, A2A, remote MCP servers, enterprise MCP gateways, tool registries, agent skills.
3. Agent security and governance: OWASP Agentic AI, prompt injection, tool misuse, agent identity, least privilege, memory/context poisoning, audit logs.
4. Evaluation and observability: LangSmith, Arize Phoenix, Braintrust, PromptLayer, Ragas, DeepEval, MLflow, Langfuse, AgentOps, Galileo, W&B Weave.
5. Financial services deployment examples: Morgan Stanley, JPMorgan Chase, Bank of America, Mastercard, Visa, Stripe, Revolut, Munich Re, Aviva, Allianz, AXA, Zurich, Lemonade.
6. Regulation and supervisory thinking: EU AI Act, DORA, EBA mapping, EIOPA opinions, FCA/BoE surveys, ESMA guidance, FSB financial stability work.
7. Voice and live AI interfaces: realtime voice, speech-to-speech, live translation, multimodal assistants, voice agent observability.

## Signal scoring
Every new item should be classified using this system:
- Evidence strength: high / medium / low.
- Novelty: mainstream / emerging / frontier / speculative.
- Relevance to NPL: high / medium / low.
- Relevance to banking/insurance: high / medium / low.
- Training value: concept, case, exercise, warning, tool, provocation.
- Verification needed: none / light / high.

## Conversion into training insight
Each source should become one of five learning assets:
1. Concept — a new term or distinction.
2. Case — an example of a company/product/workflow.
3. Warning — a failure mode, risk or governance issue.
4. Exercise — a practical workshop activity.
5. Provocation — a thesis that creates useful debate.

Example: MCP ecosystem growth.
Training insight: "The next AI product bottleneck may not be the model. It may be safe, governed access to tools and data."
Exercise: ask teams to map which internal tools an AI agent would need, then classify each permission as read-only, write, approve, execute, or forbidden.
