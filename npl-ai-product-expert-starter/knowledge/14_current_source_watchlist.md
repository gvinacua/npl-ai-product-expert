# Current Source Watchlist v1

Purpose: source map for keeping the NPL AI Product Expert fresh.

## Regulators and standards

- Bank of England / FCA AI in UK financial services survey
  Why: adoption baseline for financial services; includes AI use, foundation model usage, automated decision-making, third-party use, accountability and understanding of AI systems.
  URL: https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024

- FCA research note on AI in UK financial services
  Why: concise summary of survey findings including 75% AI use, 17% foundation-model use cases, 55% some automated decision-making and only 2% fully autonomous.
  URL: https://www.fca.org.uk/publications/research-notes/ai-uk-financial-services

- EBA special topic on artificial intelligence
  Why: EU banking supervisor perspective; useful for European banks and regulated AI programs.
  URL: https://www.eba.europa.eu/publications-and-media/publications/special-topic-artificial-intelligence

- EBA AI Act implications for EU banking and payments sector
  Why: maps high-risk AI requirements against banking/payments rules, especially creditworthiness and credit scoring.
  URL: https://www.eba.europa.eu/sites/default/files/2025-11/d8b999ce-a1d9-4964-9606-971bbc2aaf89/AI%20Act%20implications%20for%20the%20EU%20banking%20sector.pdf

- EIOPA opinion on AI governance and risk management
  Why: insurance-sector AI governance and risk-management view; important for underwriting, pricing, claims and customer interactions.
  URL: https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en

- NIST AI Risk Management Framework and Generative AI Profile
  Why: cross-sector reference for AI risk management and GenAI-specific risk categories.
  URL: https://www.nist.gov/itl/ai-risk-management-framework
  URL: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

- OWASP Top 10 for Agentic Applications
  Why: translates AI agents into concrete security and governance risks.
  URL: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/

- Financial Stability Board work on AI financial stability implications
  Why: macro/systemic view of AI concentration, third-party dependencies and financial stability risks.
  URL: https://www.fsb.org/uploads/P14112024.pdf

## Frontier protocols and agent infrastructure

- Anthropic Model Context Protocol
  Why: emerging standard for connecting AI systems to tools and data sources; relevant to enterprise agent product design.
  URL: https://www.anthropic.com/news/model-context-protocol

- Google Agent2Agent protocol
  Why: emerging standard for agent-to-agent interoperability across enterprise systems.
  URL: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/

- OpenAI Responses API web search
  Why: gives agents access to current web information with citations when enabled.
  URL: https://developers.openai.com/api/docs/guides/tools-web-search

- OpenAI File Search
  Why: hosted tool for connecting models to vector-store knowledge bases.
  URL: https://developers.openai.com/api/docs/guides/tools-file-search

- OpenAI Agents SDK
  Why: reference for when to move from one-call tools to more advanced orchestration, approvals and state.
  URL: https://developers.openai.com/api/docs/guides/agents

- OpenAI Realtime and Voice Agents guides
  Why: relevant for the next phase of this project: live voice guest speaker and Q&A.
  URL: https://developers.openai.com/api/docs/guides/realtime
  URL: https://developers.openai.com/api/docs/guides/voice-agents

- LangGraph documentation
  Why: stateful agent orchestration, durable execution, streaming and human-in-the-loop patterns.
  URL: https://docs.langchain.com/oss/python/langgraph/overview

## Financial services examples to monitor

- Morgan Stanley + OpenAI case study
  Why: advisor-facing AI with emphasis on evaluation and reliability.
  URL: https://openai.com/index/morgan-stanley/

- Bank of America Erica updates
  Why: large-scale virtual financial assistant and employee assistant adoption.
  URL: https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/08/a-decade-of-ai-innovation--bofa-s-virtual-assistant-erica-surpas.html
  URL: https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/04/ai-adoption-by-bofa-s-global-workforce-improves-productivity--cl.html

- Mastercard AI in fraud prevention and commerce
  Why: payments-specific AI examples; useful for risk decisioning and fraud detection.
  URL: https://www.mastercard.com/global/en/business/artificial-intelligence.html
  URL: https://www.mastercard.com/global/en/news-and-trends/Insights/2026/ai-is-helping-banks-save-millions-by-transforming-payment-fraud-prevention.html

- Munich Re generative AI and underwriting tools
  Why: insurer/reinsurer example of AI-enabled underwriting support.
  URL: https://www.munichre.com/en/insights/digitalisation/generative-ai-munich-re-is-driving-automation-in-the-insurance-industry.html

## Tooling and evaluation watchlist

- LangSmith, PromptLayer, Braintrust, Arize Phoenix, Ragas, DeepEval, MLflow, Langfuse, W&B Weave, AgentOps, Galileo.
  Why: AI product management increasingly depends on evaluation, traceability, monitoring and prompt/model versioning.

- Lakera, HiddenLayer, Protect AI, OWASP, Cloud Security Alliance, Arcade.dev.
  Why: emerging stack for AI/agent security, runtime protection, authorization, agent identity and auditability.

## Updating cadence

Monthly:
- update regulator/standards items;
- update frontier protocols/tools;
- add 3-5 new financial-services cases;
- remove weak/noisy sources;
- add 5 new prompts to test whether the expert remains fresh.

Before a client session:
- verify named-company examples;
- verify regulatory claims;
- run an Expertise Audit on the final talk;
- add a "what changed recently" slide.
