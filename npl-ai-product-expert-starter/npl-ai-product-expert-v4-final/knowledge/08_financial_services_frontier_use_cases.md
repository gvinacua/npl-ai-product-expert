# Financial Services Frontier Use Cases — Product Lens

Purpose: help the agent speak about banking and insurance use cases as products, not generic AI examples.

## Principle

A use case becomes an AI product only when it has users, workflow integration, decision rights, adoption model, performance metrics, risk controls, monitoring and ownership.

## Use case 1 — AI product analyst for product and transformation teams

Maturity: emerging.

What it does:
- Helps product and transformation teams map customer journeys, identify AI opportunities, compare archetypes, draft product requirements, identify data needs and generate evaluation plans.

Why it matters:
- Many institutions have too many pilots and too little portfolio discipline.

Product risk:
- If the agent invents assumptions or overstates feasibility, it creates false confidence.

Good design:
- Require it to separate facts, assumptions, unknowns and decisions needed.
- Force it to produce an evaluation plan, not only a concept note.

## Use case 2 — Claims co-pilot / claims investigation agent

Maturity: confirmed/emerging.

What it does:
- Summarizes claim documents, extracts key facts, flags anomalies, proposes next-best actions, drafts customer communications and routes complex cases.

Why it matters:
- Insurance claims combine documents, customer emotion, fraud risk, service speed and regulatory obligations.

Product risk:
- Wrong denials, biased treatment, lack of explainability, customer harm, hallucinated evidence.

Good design:
- Human final decision for claim outcomes.
- Evidence-linked summaries.
- Clear confidence and source references.
- Audit trail for AI suggestions.

## Use case 3 — Underwriting assistant

Maturity: emerging.

What it does:
- Helps underwriters analyze submissions, compare against appetite, extract risk factors, draft decision rationale and request missing information.

Why it matters:
- Underwriting is a knowledge-heavy workflow where speed and consistency matter.

Product risk:
- Hidden bias, unexplainable recommendations, overreliance, inconsistent risk appetite interpretation.

Good design:
- The AI should not silently decide; it should structure the human decision.
- It should expose factors, missing data and uncertainty.

## Use case 4 — Credit application co-pilot

Maturity: confirmed/emerging, but high risk.

What it does:
- Assists relationship managers or credit analysts with document review, affordability context, covenant analysis, memo drafting and scenario questions.

Why it matters:
- Credit processes are high-volume and document-intensive.

Product risk:
- In the EU context, creditworthiness/credit scoring for natural persons is likely to trigger high-risk obligations under the AI Act. Treat as high governance.

Good design:
- Keep AI in memo drafting, document extraction, consistency checking and exception detection before moving toward decisioning.
- Maintain human accountability and strong model risk controls.

## Use case 5 — KYC / onboarding agentic workflow

Maturity: emerging.

What it does:
- Guides customer onboarding, collects documents, checks completeness, resolves inconsistencies, drafts compliance notes and escalates exceptions.

Why it matters:
- Onboarding is often fragmented, slow and painful for customers.

Product risk:
- Data leakage, incorrect interpretation, sanctions/AML errors, poor customer experience.

Good design:
- Use constrained workflows.
- Require explicit approvals before consequential compliance outcomes.
- Maintain auditable traceability.

## Use case 6 — Compliance analyst assistant

Maturity: confirmed/emerging.

What it does:
- Summarizes regulatory updates, maps obligations to policies, drafts control questions, compares documents, reviews communications and prepares evidence packs.

Why it matters:
- Compliance teams face increasing information volume and pressure to document decisions.

Product risk:
- False summaries, missed obligations, overreliance on generic interpretation.

Good design:
- Source-grounded outputs.
- Mandatory citation to policy/regulation/source documents.
- Clear distinction between draft analysis and legal interpretation.

## Use case 7 — Customer-service resolution agent

Maturity: confirmed.

What it does:
- Answers customer queries, retrieves policy/account context, proposes resolution, drafts responses, and escalates exceptions.

Why it matters:
- Customer support is often the first scaled GenAI area due to volume, measurable ROI and available knowledge bases.

Product risk:
- Wrong advice, conduct risk, complaint mishandling, privacy exposure.

Good design:
- Strong retrieval, approved answer libraries, escalation logic, complaint detection and quality monitoring.

## Use case 8 — Wealth advisor intelligence layer

Maturity: emerging.

What it does:
- Helps advisors prepare for meetings, summarize portfolios, generate client-specific talking points, surface life events, and prepare compliant communications.

Why it matters:
- Wealth management is relationship-heavy and information-rich.

Product risk:
- Unsuitable advice, unapproved recommendations, inappropriate personalization.

Good design:
- Separate preparation and summarization from advice.
- Keep regulated advice within approved frameworks and human accountability.

## Use case 9 — Fraud defense and scam detection

Maturity: confirmed/emerging.

What it does:
- Detects anomalies, scams, suspicious payment behavior, synthetic identity, social engineering signals and deepfake risk.

Why it matters:
- Generative AI increases attacker productivity and personalization.

Product risk:
- False positives, customer friction, adversarial adaptation.

Good design:
- Pair AI with behavioral signals, identity controls, customer education and fast escalation.

## Use case 10 — Internal knowledge and policy intelligence

Maturity: confirmed/emerging.

What it does:
- Lets employees ask questions across policies, product manuals, risk documents, procedures and training materials.

Why it matters:
- It is often safer than customer-facing deployment and creates immediate productivity value.

Product risk:
- Hallucinated policies, stale documents, poor source control.

Good design:
- Retrieval-grounded answers, document freshness, owner for each corpus, feedback loop and confidence cues.

## Use case 11 — Agentic finance operations

Maturity: emerging/weak signal.

What it does:
- Performs multi-step operations such as reconciliation, exception management, report generation, invoice handling and data-quality follow-ups.

Why it matters:
- Back-office workflows are rule-heavy, fragmented and expensive.

Product risk:
- Silent errors at scale, audit gaps, data lineage problems.

Good design:
- Start with draft/recommend/route. Move to execute only for low-risk actions with clear rollback.

## Use case 12 — AI governance evidence generator

Maturity: weak signal but high potential.

What it does:
- Automatically assembles evidence for AI governance: model cards, test results, risk controls, human oversight, incidents, changes, approvals and monitoring.

Why it matters:
- Governance overhead can slow AI adoption; evidence automation could make responsible AI more scalable.

Product risk:
- False sense of compliance if evidence is generated but not meaningful.

Good design:
- Governance evidence must be linked to real product operation, not manually created narratives.

## Use case patterns to avoid

- Generic chatbot with no workflow integration.
- AI assistant that cannot cite source documents.
- Autonomous decisioning in high-impact areas without governance.
- Product demo with no owner, no evaluation set and no path to production.
- Enterprise search that ignores document freshness and permission boundaries.

## Teaching exercise

Ask participants to pick one use case and answer:
1. Who is the user?
2. What decision/workflow is improved?
3. What data/context is needed?
4. What should AI never decide alone?
5. What evidence would show that the product works?
6. What could go wrong in production?
7. Who owns value, risk and updates?
