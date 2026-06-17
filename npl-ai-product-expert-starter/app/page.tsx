"use client";

import { useState } from "react";

const modes = [
  { value: "speaker", label: "Speaker Mode", hint: "Keynotes, talks, storylines and speaker notes" },
  { value: "lesson", label: "Lesson Delivery Mode", hint: "Timed class scripts, blocks, pauses and exercises" },
  { value: "source_lesson", label: "Source-Grounded Lesson Builder", hint: "Client-ready lessons built around verified examples" },
  { value: "voice_delivery", label: "Voice Delivery Prep", hint: "Turns content into speakable blocks for TTS or live voice" },
  { value: "training", label: "Training Designer", hint: "Corporate workshops, exercises and learning paths" },
  { value: "panel", label: "Panel / Q&A Expert", hint: "Sharp answers for webinars and executive Q&A" },
  { value: "sparring", label: "AI Sparring Partner", hint: "Challenge ideas, rehearse, refine thinking" },
  { value: "pov", label: "Point-of-View Builder", hint: "Compare approaches and shape the NPL position" },
  { value: "frontier", label: "Frontier Briefing", hint: "Current signals, upcoming shifts and implications" },
  { value: "research", label: "Research Scout", hint: "Find less obvious sources, tools and examples" },
  { value: "audit", label: "Expertise Audit", hint: "Score depth, originality, evidence and expert quality" }
];

const starters: Record<string, string> = {
  speaker: "Create a 25-minute guest speaker talk for a financial services audience on: From AI tools to AI products. Audience: mixed banking and insurance. Duration: 25 minutes. Emphasis: nuanced adoption-to-product pathway.",
  lesson: "Create a 35-minute interactive class for banking and insurance teams on: How to design AI products that survive production. Audience: product, data/AI, innovation, compliance, risk and transformation. Keep it concise and spoken.",
  source_lesson: "Build a client-ready 35-minute lesson on: From AI tools to AI products in financial services. Use source-grounded examples. Audience: banking and insurance. Include claims to verify.",
  voice_delivery: "Convert this topic into a concise spoken delivery for a synthetic guest speaker: From AI tools to AI products in financial services. Create 6 short voice-ready blocks, one audience pause, one interaction, and delivery notes.",
  training: "Design a half-day training for a bank or insurer on how to identify, design, test and manage AI products. Audience: mixed business, product, data/AI and risk teams.",
  panel: "Prepare concise panel answers on AI adoption, AI product management, agents, risk and governance in financial services. Use nuance and examples. Avoid generic answers.",
  sparring: "Challenge our current thinking on: building an AI Expert Speaker for financial services training. Focus on expertise, differentiation, source discipline and delivery.",
  pov: "Develop an NPL point of view on this topic: AI adoption vs AI product discipline in banks and insurers. Compare approaches, evidence, uncertainty and practical implications.",
  frontier: "Brief us on what is changing now in AI agents, voice interfaces and AI products for financial services. Separate confirmed shifts, emerging signals, speculative bets, implications for NPL training, and what to monitor next.",
  research: "Find sources, tools, examples or weak signals that could make an AI product training program for banks and insurers feel genuinely fresh. Prioritize non-obvious but credible material and classify confidence.",
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
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioError, setAudioError] = useState("");

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


  async function generateElevenLabsAudio() {
    if (!output) return;
    setAudioLoading(true);
    setAudioError("");
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl("");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: output, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "TTS request failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (e: any) {
      setAudioError(e.message || "Audio generation failed");
    } finally {
      setAudioLoading(false);
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
          <strong>Current build v4.5</strong>
          <p className="small">Voice delivery upgrade: voice-ready mode plus ElevenLabs audio generation. Evidence discipline and source-grounded modes remain active.</p>
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
              <p className="small">Generate talks, source-grounded lessons, research scans, point-of-view briefs, panel answers and audits. Use “Audit current output” to pressure-test quality.</p>
              {meta && <p className="small">Model: {meta.model} · Tools: {(meta.tools || []).join(", ") || "none"} · Web: {String(meta.web_enabled && meta.web_requested)}</p>}
            </div>
            <div className="button-row">
              <button className="secondary" onClick={copyOutput}>Copy</button>
              <button className="secondary" onClick={readOutput}>Browser voice</button>
              <button className="secondary" onClick={generateElevenLabsAudio} disabled={audioLoading || !output}>{audioLoading ? "Creating audio…" : "ElevenLabs audio"}</button>
              <button className="secondary" onClick={stopVoice}>Stop</button>
              <button className="secondary" onClick={auditCurrentOutput}>Audit current output</button>
            </div>
          </div>
          {audioError && <p className="small error-text">{audioError}</p>}
          {audioUrl && <audio className="audio-player" controls src={audioUrl} />}
          <div className="output">{output || "The generated answer will appear here."}</div>
        </div>
      </section>
    </main>
  );
}
