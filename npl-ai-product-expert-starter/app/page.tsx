"use client";

import { useState } from "react";

const modes = [
  { value: "speaker", label: "Speaker Mode", hint: "Keynotes, talks, storylines and speaker notes" },
  { value: "training", label: "Training Designer", hint: "Corporate workshops, exercises and learning paths" },
  { value: "panel", label: "Panel / Q&A Expert", hint: "Sharp answers for webinars and executive Q&A" },
  { value: "sparring", label: "AI Sparring Partner", hint: "Challenge ideas, rehearse, refine thinking" }
];

const starters: Record<string, string> = {
  speaker: "Create a 25-minute guest speaker talk for a financial services audience on: From AI tools to AI products. Include storyline, key messages, examples, and speaker notes.",
  training: "Design a half-day training for a bank or insurer on how to identify, design, test and manage AI products. Include agenda, exercises and facilitator notes.",
  panel: "Prepare 10 panel answers of 90 seconds each on AI adoption, AI product management, agents, risk and governance in financial services.",
  sparring: "Challenge our current thinking: what are we likely getting wrong if we want to build an AI Expert Speaker for financial services training?"
};

export default function Home() {
  const [mode, setMode] = useState("speaker");
  const [prompt, setPrompt] = useState(starters.speaker);
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  function changeMode(next: string) {
    setMode(next);
    setPrompt(starters[next]);
  }

  async function submit() {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setOutput(data.output);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="header">
        <div>
          <span className="badge">NPL internal prototype · Financial services AI product training</span>
          <h1>NPL AI Product Expert</h1>
          <p className="lead">
            A serious first version of an AI expert speaker and trainer for banks, insurers and financial services teams learning how to design, build and manage AI products.
          </p>
        </div>
        <div className="card" style={{minWidth: 260}}>
          <strong>Current build</strong>
          <p className="small">Text expert first. Knowledge-base ready. Voice/event mode later.</p>
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

          <label>Request</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
          <button disabled={loading} onClick={submit}>{loading ? "Thinking…" : "Generate"}</button>
        </div>

        <div className="card">
          <strong>Output</strong>
          <p className="small">Use this to generate talks, trainings, panel answers and challenge sessions. Add knowledge files after creating a vector store.</p>
          <div className="output">{output || "The generated answer will appear here."}</div>
        </div>
      </section>
    </main>
  );
}
