# AI Agents for Banking and Insurance — Research Pack v1

## Core position
AI agents should not be sold as magic digital employees. In financial services they should be designed as controlled systems that can plan, use tools and complete bounded tasks under clear permissions, monitoring and escalation rules.

## Definitions
- Chatbot: conversational interface, often reactive.
- Copilot: assists a user, drafts, summarizes, recommends, but the human remains primary operator.
- Workflow automation: executes predefined steps with limited flexibility.
- Agent: can pursue a task goal, reason over steps, use tools, retrieve context, make intermediate decisions and hand off when needed.

## Agent design principles for regulated companies
1. Bound the task narrowly at first.
2. Define allowed tools and data access.
3. Require human approval for consequential decisions.
4. Log actions and intermediate reasoning traces where appropriate.
5. Use test suites and red-team scenarios.
6. Add fallbacks, kill-switches and escalation paths.
7. Separate recommendation from execution for high-risk workflows.

## Good initial agent use cases
- Internal research assistant for policy, product and regulatory knowledge.
- Claims or credit file summarization and checklist completion.
- Relationship-manager preparation before client meetings.
- Compliance evidence gathering.
- Product owner assistant for AI product design and evaluation.
- Training guest speaker / learning coach for AI adoption programs.

## Avoid early autonomous use cases
- Fully autonomous credit decisions.
- Fully autonomous claims denial.
- Unsupervised trading actions.
- Customer-facing advice without guardrails.
- Any workflow where accountability, auditability and reversibility are unclear.

## Strong lines for the speaker
- The best early agents in finance are not autonomous decision-makers; they are controlled accelerators of expert work.
- An agent without permissions, logs, tests and fallbacks is not a product. It is a risk surface.
- The product question is not “Can the agent do it?” It is “Under what conditions can we trust it to do it repeatedly?”

## Sources to anchor the narrative
- OpenAI, New tools for building agents: agents independently accomplish tasks on behalf of users.
- IBM AI agents explainer: agents can autonomously perform tasks using tools and workflows.
- Anthropic research on measuring agent autonomy: useful to discuss task duration/autonomy as an emerging capability frontier.
- McKinsey 2026 insurance investor analysis: agentic AI is emerging for end-to-end workflows, including purchasing and risk assessment, but adoption must be controlled.
