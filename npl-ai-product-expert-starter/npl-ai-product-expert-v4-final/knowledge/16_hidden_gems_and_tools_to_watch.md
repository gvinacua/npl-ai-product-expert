# Hidden Gems and Tools to Watch v1

This is not a recommendation list. It is a research radar. Some tools will matter; some will disappear. The expert should use them to spot product patterns and ask better questions.

## Agent orchestration
- LangGraph — stateful, durable, human-in-the-loop agent workflows. Useful pattern for regulated workflows where steps, checkpoints and approvals matter.
- OpenAI Agents SDK / Responses API — practical route for building agents with tools, web search, file search, guardrails/tracing patterns and later voice.
- LlamaIndex — document/retrieval layer; useful for knowledge-heavy AI products.
- CrewAI / AutoGen / AG2 / Google ADK / Semantic Kernel — competing patterns for multi-agent collaboration, role-based agents and enterprise integration.

## Interoperability and tool protocols
- MCP — possible standard layer for connecting AI apps to tools and data.
- A2A — possible standard layer for agent-to-agent communication.
- Enterprise MCP gateways and tool registries — governed access may become more important than connectivity.

## Evaluation and observability
- LangSmith — tracing and evaluation for LangChain/LangGraph stacks.
- PromptLayer — prompt management, evaluation and versioning; useful when prompt changes affect business behavior.
- Braintrust — evals, prompt playground, datasets and logs for LLM apps.
- Arize Phoenix — open-source observability/evaluation for LLM applications and agents.
- Ragas / DeepEval / MLflow / Langfuse / W&B Weave / AgentOps / Galileo — the evaluation and observability market is moving fast; teach categories rather than a single winner: test sets, traces, evaluations, monitoring, human feedback, regression.

## Agent security and governance
- OWASP Agentic AI — gives security language for autonomous and tool-using systems.
- Lakera — runtime protection, prompt injection defense and policy controls for GenAI apps.
- HiddenLayer / Protect AI — AI model/application security, scanning, red teaming and governance.
- Arcade.dev and emerging agent authorization vendors — agent authorization and identity may become central infrastructure if AI agents act in enterprise systems. Verify before client use.

## Voice and live interaction
- OpenAI Realtime / Voice agents — direct path toward a voice-enabled NPL AI Product Expert.
- Vapi / LiveKit / Twilio Media Streams / ElevenLabs / Deepgram — infrastructure for real-time voice agents, telephony and voice UX.

## Financial-services examples to keep digging
- Morgan Stanley advisor AI — domain knowledge + advisor workflow + evaluation discipline.
- Bank of America Erica / Erica for Employees — large-scale assistant adoption and extension from customer-facing to internal employee support.
- Mastercard fraud and payments AI — payment-network-specific use of AI where milliseconds, data scale and fraud patterns matter.
- Munich Re underwriting support — AI augmenting expert judgment rather than replacing it.
- Aviva and AI-enabled fraud/fraud detection — adversarial dynamics: criminals use AI and insurers use AI/analytics to respond; verify figures before client use.

## How to use this file
Do not dump tool names into talks. Use tools to extract patterns:
- agents need governed tool access;
- agent failures require trace-aware evaluation;
- AI product governance shifts from model risk to system risk;
- voice increases adoption and risk;
- the market is moving from copilots to controlled delegation;
- AI product literacy is now a training gap.
