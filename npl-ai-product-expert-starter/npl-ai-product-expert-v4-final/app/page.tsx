"use client";

import { useState } from "react";

const modes = [
  { value: "speaker", label: "Speaker Mode", hint: "Keynotes, talks, storylines and speaker notes" },
  { value: "lesson", label: "Lesson Delivery Mode", hint: "Timed class scripts, blocks, pauses and exercises" },
  { value: "training", label: "Training Designer", hint: "Corporate workshops, exercises and learning paths" },
  { value: "panel", label: "Panel / Q&A Expert", hint: "Sharp answers for webinars and executive Q&A" },
  { value: "sparring", label: "AI Sparring Partner", hint: "Challenge ideas, rehearse, refine thinking" },
  { value: "frontier", label: "Frontier Briefing", hint: "Current signals, upcoming shifts and implications" },
  { value: "research", label: "Research Scout", hint: "Find less obvious sources, tools and examples" },
  { value: "audit", label: "Expertise Audit", hint: "Score depth, originality, evidence and expert quality" }
];

const starters: Record<string, string> = {
  speaker: "Create a 25-minute guest speaker talk for a financial services audience on: From AI tools to AI products. Include storyline, key messages, examples, and speaker notes. Make it sharp, current and non-hype.",
  lesson: "Deliver a 35-minute interactive class for banking and insurance teams: How to design AI products that survive production. Include timed blocks, spoken script, audience pauses, one exercise, and closing synthesis.",
  training: "Design a half-day training for a bank or insurer on how to identify, design, test and manage AI products. Include agenda, exercises, participant outputs and facilitator notes.",
  panel: "Prepare 10 panel answers of 90 seconds each on AI adoption, AI product management, agents, risk and governance in financial services. Avoid generic answers.",
  sparring: "Challenge our current thinking: what are we likely getting wrong if we want to build an AI Expert Speaker for financial services training? Focus on expertise, differentiation, and delivery.",
  frontier: "Brief us on what is changing now in AI agents, voice interfaces and AI products for financial services. Separate confirmed shifts, emerging signals, speculative bets, implications for NPL training, and what to monitor next.",
  research: "Find 20 sources, tools, examples or weak signals that could make an AI product training program for banks and insurers feel genuinely fresh. Do not only include mainstream sources. Classify each item by source type, confidence, why it matters, and how NPL could use it in a session.",
  audit: "Audit the following output against the NPL AI Expert quality rubric. Score it strictly. Identify what is generic, what is missing, what needs verification, and how to rewrite it so it feels like a real expert.\n\nPaste output here:\n"
};

function speakInChunks(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const chunks = text
    .replace(/[#*_>`]/g, "")
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .slice(0, 40);

  chunks.forEach((chunk) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });
}

export default function Home() {
  const [mode, setMode] = useState("speaker");
  const [prompt, setPrompt] = useState(starters.speaker);
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [useWeb, setUseWeb] = useState(false);
  const [useDeep, setUseDeep] = useState(false);

  function changeMode(next: string) {
    setMode(next);
    setPrompt(starters[next]);
  }

  async function submit() {
    setLoading(true);
    setOutput("");
    setMeta(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt, password, useWeb, useDeep })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setOutput(data.output);
      setMeta(data.meta || null);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output || "");
  }

  function readOutput() {
    if (!output) return;
    speakInChunks(output);
  }

  function stopVoice() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function auditCurrentOutput() {
    if (!output) return;
    setMode("audit");
    setUseDeep(true);
    setPrompt(`Audit this output against the NPL AI Expert quality rubric. Be strict. Identify generic statements, missing depth, missing financial-services specificity, weak evidence, missing frontier signals, and how to rewrite it.\n\nOUTPUT TO AUDIT:\n${output}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function researchUpgrade() {
    setMode("research");
    setUseWeb(true);
    setUseDeep(true);
    setPrompt("Find emerging tools, protocols, examples, regulatory signals and less obvious sources that could upgrade our AI Product Expert for banking and insurance. Prioritize material that is not obvious mainstream AI adoption content. Include what to verify, why it matters, and how to convert it into a training insight.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <section className="header">
        <div>
          <span className="badge">NPL internal prototype · Financial services AI product training</span>
          <h1>NPL AI Product Expert</h1>
          <p className="lead">
            A research-led AI expert speaker and trainer for banks, insurers and financial services teams learning how to design, build and manage AI products.
          </p>
        </div>
        <div className="card" style={{minWidth: 300}}>
          <strong>Current build v4</strong>
          <p className="small">Expertise audit + research scout + optional web search + deeper quality gates. Browser voice preview included; real-time voice later.</p>
          <div className="mode-list">
            {modes.map(m => <div key={m.value} className="mode-pill"><strong>{m.label}</strong><br/><span className="small">{m.hint}</span></div>)}
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <label>Access password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="APP_PASSWORD" />
          <p className="small">Simple protection for Vercel deployments. Set APP_PASSWORD in environment variables.</p>

          <label>Mode</label>
          <select value={mode} onChange={e => changeMode(e.target.value)}>
            {modes.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
          </select>

          <div className="option-box">
            <label className="check-label">
              <input type="checkbox" checked={useDeep} onChange={e => setUseDeep(e.target.checked)} />
              <span>Use deep model</span>
            </label>
            <p className="small">Requires OPENAI_DEEP_MODEL. Use for client-ready outputs and audits.</p>

            <label className="check-label">
              <input type="checkbox" checked={useWeb} onChange={e => setUseWeb(e.target.checked)} />
              <span>Use web search</span>
            </label>
            <p className="small">Requires ENABLE_WEB_SEARCH=true and OPENAI_SEARCH_MODEL. Best for Frontier Briefing and Research Scout.</p>
          </div>

          <label>Request</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
          <button disabled={loading} onClick={submit}>{loading ? "Thinking…" : "Generate"}</button>
          <button className="secondary full" type="button" onClick={researchUpgrade}>Research upgrade prompt</button>
        </div>

        <div className="card">
          <div className="output-header">
            <div>
              <strong>Output</strong>
              <p className="small">Generate talks, lessons, research scans, panel answers and audits. Use “Audit current output” to pressure-test quality.</p>
              {meta && <p className="small">Model: {meta.model} · Tools: {(meta.tools || []).join(", ") || "none"} · Web: {String(meta.web_enabled && meta.web_requested)}</p>}
            </div>
            <div className="button-row">
              <button className="secondary" onClick={copyOutput}>Copy</button>
              <button className="secondary" onClick={readOutput}>Read aloud</button>
              <button className="secondary" onClick={stopVoice}>Stop</button>
              <button className="secondary" onClick={auditCurrentOutput}>Audit current output</button>
            </div>
          </div>
          <div className="output">{output || "The generated answer will appear here."}</div>
        </div>
      </section>
    </main>
  );
}
