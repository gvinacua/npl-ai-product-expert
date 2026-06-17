"use client";

import { useMemo, useState } from "react";

type ModeDef = { value: string; label: string; hint: string; cost: "low" | "medium" | "high" };

const modes: ModeDef[] = [
  { value: "speaker", label: "Speaker Mode", hint: "Keynotes, talks, storylines and speaker notes", cost: "medium" },
  { value: "lesson", label: "Lesson Delivery Mode", hint: "Timed class scripts, blocks, pauses and exercises", cost: "medium" },
  { value: "source_lesson", label: "Source-Grounded Lesson Builder", hint: "Client-ready lessons built around verified examples", cost: "high" },
  { value: "voice_delivery", label: "Voice Delivery Prep", hint: "Short voice-ready blocks for TTS or live delivery", cost: "low" },
  { value: "training", label: "Training Designer", hint: "Corporate workshops, exercises and learning paths", cost: "medium" },
  { value: "panel", label: "Panel / Q&A Expert", hint: "Sharp answers for webinars and executive Q&A", cost: "low" },
  { value: "sparring", label: "AI Sparring Partner", hint: "Challenge ideas, rehearse, refine thinking", cost: "low" },
  { value: "pov", label: "Point-of-View Builder", hint: "Compare approaches and shape the NPL position", cost: "high" },
  { value: "frontier", label: "Frontier Briefing", hint: "Current signals, upcoming shifts and implications", cost: "high" },
  { value: "research", label: "Research Scout", hint: "Find less obvious sources, tools and examples", cost: "high" },
  { value: "audit", label: "Expertise Audit", hint: "Score depth, originality, evidence and expert quality", cost: "medium" }
];

const starters: Record<string, string> = {
  speaker: "Create a 25-minute guest speaker talk for a financial services audience on: From AI tools to AI products. Audience: mixed banking and insurance. Duration: 25 minutes. Emphasis: nuanced adoption-to-product pathway.",
  lesson: "Create a 35-minute interactive class for banking and insurance teams on: How to design AI products that survive production. Audience: product, data/AI, innovation, compliance, risk and transformation. Keep it concise and spoken.",
  source_lesson: "Build a client-ready 35-minute lesson on: From AI tools to AI products in financial services. Use source-grounded examples. Audience: banking and insurance. Include claims to verify.",
  voice_delivery: "Prepare a 60-second spoken opening for a financial services AI training session. Topic: from AI tools to AI products. Audience: banking and insurance leaders. Make it concise, senior, nuanced and non-hype.",
  training: "Design a half-day training for a bank or insurer on how to identify, design, test and manage AI products. Audience: mixed business, product, data/AI and risk teams.",
  panel: "Prepare concise panel answers on AI adoption, AI product management, agents, risk and governance in financial services. Use nuance and examples. Avoid generic answers.",
  sparring: "Challenge our current thinking on: building an AI Expert Speaker for financial services training. Focus on expertise, differentiation, source discipline and delivery.",
  pov: "Develop an NPL point of view on this topic: AI adoption vs AI product discipline in banks and insurers. Compare approaches, evidence, uncertainty and practical implications. Include evidence anchors and claims to verify.",
  frontier: "Brief us on what is changing now in AI agents, voice interfaces and AI products for financial services. Separate confirmed shifts, emerging signals, speculative bets, implications for NPL training, and what to monitor next.",
  research: "Find sources, tools, examples or weak signals that could make an AI product training program for banks and insurers feel genuinely fresh. Prioritize non-obvious but credible material and classify confidence.",
  audit: "Audit the following output against the NPL AI Expert quality rubric. Score it strictly. Identify what is generic, what is missing, what needs verification, and how to rewrite it so it feels like a real expert.\n\nPaste output here:\n"
};

function cleanForVoice(text: string) {
  return text
    .replace(/\[[^\]]{0,80}\]\([^\)]{0,220}\)/g, "")
    .replace(/[#*_>`]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function speakInChunks(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const chunks = cleanForVoice(text)
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .slice(0, 20);

  chunks.forEach((chunk) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });
}

function getSelectionText() {
  if (typeof window === "undefined") return "";
  return window.getSelection()?.toString().trim() || "";
}

function splitVoiceBlocks(text: string) {
  const cleaned = cleanForVoice(text);
  if (!cleaned) return [];
  const raw = cleaned.split(/\n\n+/).map((x) => x.trim()).filter(Boolean);
  const blocks: string[] = [];
  for (const item of raw) {
    if (item.length <= 950) {
      blocks.push(item);
    } else {
      const sentences = item.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [item];
      let current = "";
      for (const sentence of sentences) {
        if ((current + " " + sentence).trim().length > 950 && current) {
          blocks.push(current.trim());
          current = sentence;
        } else {
          current = `${current} ${sentence}`.trim();
        }
      }
      if (current) blocks.push(current.trim());
    }
  }
  return blocks.slice(0, 12);
}

function modeCostLabel(cost: ModeDef["cost"]) {
  if (cost === "low") return "Low-cost default";
  if (cost === "medium") return "Medium";
  return "High-value / use deep selectively";
}

export default function Home() {
  const [mode, setMode] = useState("voice_delivery");
  const [prompt, setPrompt] = useState(starters.voice_delivery);
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [useWeb, setUseWeb] = useState(false);
  const [useDeep, setUseDeep] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioError, setAudioError] = useState("");
  const [audioText, setAudioText] = useState("");
  const [maxAudioChars, setMaxAudioChars] = useState(1200);

  const activeMode = modes.find((m) => m.value === mode) || modes[0];
  const voiceBlocks = useMemo(() => splitVoiceBlocks(output), [output]);
  const outputChars = cleanForVoice(output).length;
  const suggestedModelUse = useDeep ? "Deep model on" : "Draft model on";
  const webStatus = useWeb ? "Web requested" : "Local knowledge only";

  function changeMode(next: string) {
    setMode(next);
    setPrompt(starters[next]);
    if (["source_lesson", "pov", "frontier", "research"].includes(next)) setUseDeep(true);
    if (!["frontier", "research"].includes(next)) setUseWeb(false);
  }

  async function submit() {
    setLoading(true);
    setOutput("");
    setMeta(null);
    setAudioUrl("");
    setAudioError("");
    setAudioText("");
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

  function copyText(text: string) {
    navigator.clipboard.writeText(text || "");
  }

  function readOutput() {
    if (!output) return;
    const selected = getSelectionText();
    speakInChunks(selected || output);
  }

  function stopVoice() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  async function generateElevenLabsAudio(textOverride?: string) {
    const selected = getSelectionText();
    const sourceText = cleanForVoice(textOverride || selected || output);
    if (!sourceText) return;

    if (sourceText.length > maxAudioChars) {
      setAudioError(`Audio text is ${sourceText.length} characters. Limit is ${maxAudioChars}. Select a smaller block or increase the limit deliberately.`);
      return;
    }

    setAudioLoading(true);
    setAudioError("");
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl("");
    setAudioText(sourceText);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, password })
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
    setPrompt(`Audit this output against the NPL AI Expert quality rubric. Be strict. Identify generic statements, missing depth, missing financial-services specificity, weak evidence, missing frontier signals, cost/delivery risks, and how to rewrite it.\n\nOUTPUT TO AUDIT:\n${output}`);
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
      <section className="header compact-header">
        <div>
          <span className="badge">NPL internal prototype · cost-aware voice build</span>
          <h1>NPL AI Product Expert</h1>
          <p className="lead">
            A research-led AI expert speaker and trainer for banks, insurers and financial services teams. This build adds cost guardrails and block-level voice delivery.
          </p>
        </div>
        <div className="card build-card">
          <div className="build-topline">
            <strong>Current build v4.6</strong>
            <span className="mini-badge">Cost + block voice UX</span>
          </div>
          <p className="small">Use cheap models for drafts, deep models only for high-value outputs, and ElevenLabs only for selected voice blocks.</p>
          <div className="delivery-options">
            <div><strong>1. Prep</strong><span>Generate script, slides, Q&A.</span></div>
            <div><strong>2. Voice blocks</strong><span>Render selected blocks only.</span></div>
            <div><strong>3. Live later</strong><span>Vapi/OpenAI Realtime with human control.</span></div>
          </div>
        </div>
      </section>

      <section className="app-shell">
        <aside className="card control-card">
          <label>Access password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="APP_PASSWORD" />

          <label>Mode</label>
          <select value={mode} onChange={e => changeMode(e.target.value)}>
            {modes.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
          </select>
          <p className="small mode-hint">{activeMode.hint}</p>

          <div className="cost-box">
            <strong>Cost guardrails</strong>
            <p className="small">Mode: {modeCostLabel(activeMode.cost)} · {suggestedModelUse} · {webStatus}</p>
            <label className="check-label">
              <input type="checkbox" checked={useDeep} onChange={e => setUseDeep(e.target.checked)} />
              <span>Use deep model</span>
            </label>
            <p className="small">Use for client-ready lessons, PoV, audits and research. Keep off for drafts.</p>

            <label className="check-label">
              <input type="checkbox" checked={useWeb} onChange={e => setUseWeb(e.target.checked)} />
              <span>Use web search</span>
            </label>
            <p className="small">Use mainly for Research Scout and Frontier Briefing.</p>

            <label>Max ElevenLabs chars</label>
            <input type="number" min="200" max="5000" step="100" value={maxAudioChars} onChange={(e) => setMaxAudioChars(Number(e.target.value || 1200))} />
            <p className="small">Default: speak selected text or one block, not the full output.</p>
          </div>

          <label>Request</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
          <button disabled={loading} onClick={submit}>{loading ? "Thinking…" : "Generate"}</button>
          <button className="secondary full" type="button" onClick={researchUpgrade}>Research upgrade prompt</button>
        </aside>

        <section className="output-stack">
          <div className="card output-card">
            <div className="output-header">
              <div>
                <strong>Output</strong>
                <p className="small">Generate the thinking here. Use voice on selected blocks only. Audit when quality matters.</p>
                {meta && <p className="small">Model: {meta.model} · Profile: {meta.cost_profile || "n/a"} · Tools: {(meta.tools || []).join(", ") || "none"} · Web: {String(meta.web_enabled && meta.web_requested)}</p>}
                {!!output && <p className="small">Clean voice length: {outputChars.toLocaleString()} chars · Blocks detected: {voiceBlocks.length}</p>}
              </div>
              <div className="button-row">
                <button className="secondary" onClick={copyOutput}>Copy</button>
                <button className="secondary" onClick={readOutput}>Browser voice</button>
                <button className="secondary" onClick={() => generateElevenLabsAudio()} disabled={audioLoading || !output}>{audioLoading ? "Creating…" : "ElevenLabs selected/full"}</button>
                <button className="secondary" onClick={stopVoice}>Stop</button>
                <button className="secondary" onClick={auditCurrentOutput}>Audit current output</button>
              </div>
            </div>
            {audioError && <p className="small error-text">{audioError}</p>}
            {audioUrl && <div className="audio-box"><audio className="audio-player" controls src={audioUrl} /><p className="small">Audio generated from {audioText.length.toLocaleString()} chars.</p></div>}
            <div className="output">{output || "The generated answer will appear here."}</div>
          </div>

          {!!voiceBlocks.length && (
            <div className="card block-card">
              <div className="output-header">
                <div>
                  <strong>Voice blocks</strong>
                  <p className="small">Use these for affordable rehearsal: generate audio for one block at a time.</p>
                </div>
              </div>
              <div className="block-list">
                {voiceBlocks.map((block, idx) => (
                  <div className="voice-block" key={`${idx}-${block.slice(0, 20)}`}>
                    <div className="voice-block-title">
                      <strong>Block {idx + 1}</strong>
                      <span className="small">{block.length} chars</span>
                    </div>
                    <p>{block.length > 280 ? `${block.slice(0, 280)}…` : block}</p>
                    <div className="button-row left">
                      <button className="secondary" onClick={() => generateElevenLabsAudio(block)} disabled={audioLoading || block.length > maxAudioChars}>ElevenLabs block</button>
                      <button className="secondary" onClick={() => speakInChunks(block)}>Browser block</button>
                      <button className="secondary" onClick={() => copyText(block)}>Copy block</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
