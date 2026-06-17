"use client";

import { useMemo, useRef, useState } from "react";

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

const modePurpose: Record<string, { phase: string; inputs: string; outputs: string; when: string }> = {
  speaker: { phase: "Prepare", inputs: "Topic, audience, duration, tone, client context.", outputs: "Talk storyline, speaker script, examples, closing lines.", when: "Use for keynotes and guest-speaker slots." },
  lesson: { phase: "Prepare", inputs: "Topic, audience, duration, learning goal.", outputs: "Timed class blocks, script, pauses, exercise.", when: "Use for internal drafts of classes." },
  source_lesson: { phase: "Prepare", inputs: "Topic, audience, duration, required examples or sources.", outputs: "Client-ready lesson with evidence anchors and claims to verify.", when: "Use when material may face a client." },
  voice_delivery: { phase: "Deliver", inputs: "Short topic, audience and desired tone.", outputs: "Voice-ready blocks, delivery notes, slide cues.", when: "Use to produce speakable segments for ElevenLabs." },
  training: { phase: "Prepare", inputs: "Client, audience, time available, learning goals.", outputs: "Workshop agenda, exercises, learning path, facilitation notes.", when: "Use for proposals and training design." },
  panel: { phase: "Converse", inputs: "Panel topic, audience, question or likely questions.", outputs: "Concise 60–90 second answers with nuance.", when: "Use before webinars, panels or exec Q&A." },
  sparring: { phase: "Converse", inputs: "Idea, assumption or draft position to challenge.", outputs: "Sharp critique, trade-offs, next move.", when: "Use for internal thinking with NPL." },
  pov: { phase: "Think", inputs: "Topic, audience, evidence you want considered.", outputs: "Main views, trade-offs, provisional NPL position, evidence anchors.", when: "Use to build NPL stance on contested topics." },
  frontier: { phase: "Research", inputs: "Domain, timeframe, what to monitor.", outputs: "Confirmed shifts, emerging signals, bets, implications.", when: "Use for up-to-date briefings." },
  research: { phase: "Research", inputs: "What kind of sources/examples/tools you need.", outputs: "Non-obvious sources, examples, weak signals, claims to verify.", when: "Use before upgrading a session." },
  audit: { phase: "Evaluate", inputs: "Output to audit.", outputs: "Strict quality score, weaknesses, rewrite instructions.", when: "Use before calling something client-ready." }
};

const workflowCards = [
  { title: "1. Prepare", text: "Create talks, lessons, training designs and source-backed modules." },
  { title: "2. Deliver", text: "Turn approved content into voice-ready blocks and audio." },
  { title: "3. Converse", text: "Rehearse live Q&A with the interactive voice expert." },
  { title: "4. Evaluate", text: "Audit quality, evidence, nuance and client readiness." }
];

function phaseClass(phase: string) {
  return phase.toLowerCase().replace(/[^a-z]/g, "");
}

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

function estimateTokens(text: string) {
  return Math.max(1, Math.ceil((text || "").length / 4));
}

function euro(amount: number) {
  if (amount < 0.01) return "<€0.01";
  return `~€${amount.toFixed(amount < 1 ? 2 : 1)}`;
}

function costBand(amount: number) {
  if (amount < 0.05) return "Low";
  if (amount < 0.50) return "Medium";
  return "High";
}

function modelCostProxy(modelLabel: string, inputTokens: number, maxOutputTokens: number, web: boolean) {
  // Approximate EUR proxy only. Update these assumptions as provider pricing changes.
  const model = (modelLabel || "").toLowerCase();
  const rates = model.includes("mini")
    ? { inputPer1M: 0.15, outputPer1M: 0.60 }
    : { inputPer1M: 2.00, outputPer1M: 8.00 };
  const base = (inputTokens * rates.inputPer1M + maxOutputTokens * rates.outputPer1M) / 1_000_000;
  const webPremium = web ? 0.02 : 0;
  return base + webPremium;
}

function elevenCostProxy(chars: number) {
  // ElevenLabs plans/pricing vary. This is a rough planning proxy, not billing truth.
  const estimatedCredits = chars;
  const eurProxy = chars * 0.00018;
  return { estimatedCredits, eurProxy };
}

function estimatedOutputBudget(modeValue: string) {
  const budgets: Record<string, number> = {
    sparring: 650,
    panel: 700,
    pov: 1200,
    frontier: 1400,
    audit: 1600,
    speaker: 1800,
    training: 2200,
    lesson: 2600,
    source_lesson: 2800,
    voice_delivery: 1800,
    research: 3000
  };
  return budgets[modeValue] || 1600;
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
  const [realtimeStatus, setRealtimeStatus] = useState("idle");
  const [realtimeError, setRealtimeError] = useState("");
  const [realtimeLog, setRealtimeLog] = useState<string[]>([]);
  const [realtimeContext, setRealtimeContext] = useState("You are joining a live internal rehearsal as the NPL AI Product Expert. Answer audience questions about AI products, adoption, governance and agents in financial services. Keep answers to 45-90 seconds.");
  const [useRealtimeDeep, setUseRealtimeDeep] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const activeMode = modes.find((m) => m.value === mode) || modes[0];
  const voiceBlocks = useMemo(() => splitVoiceBlocks(output), [output]);
  const outputChars = cleanForVoice(output).length;
  const suggestedModelUse = useDeep ? "Deep model on" : "Draft model on";
  const webStatus = useWeb ? "Web requested" : "Local knowledge only";
  const estimatedInputTokens = estimateTokens(prompt);
  const estimatedMaxOutputTokens = estimatedOutputBudget(mode);
  const modelProxyName = useDeep ? "deep model" : "gpt-4.1-mini/draft";
  const estimatedTextCost = modelCostProxy(modelProxyName, estimatedInputTokens, estimatedMaxOutputTokens, useWeb);
  const fullAudioProxy = elevenCostProxy(Math.min(outputChars || 0, maxAudioChars));

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

  function addRealtimeLog(line: string) {
    setRealtimeLog((prev) => [`${new Date().toLocaleTimeString()} · ${line}`, ...prev].slice(0, 8));
  }

  async function startRealtimeExpert() {
    if (pcRef.current) return;
    setRealtimeError("");
    setRealtimeStatus("requesting microphone");
    try {
      const sessionRes = await fetch("/api/realtime-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, context: realtimeContext, useDeep: useRealtimeDeep })
      });
      const session = await sessionRes.json();
      if (!sessionRes.ok) throw new Error(session.error || "Could not create realtime session");

      const ephemeralKey = session.client_secret?.value || session.value;
      if (!ephemeralKey) throw new Error("Realtime session did not return a client secret.");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      pc.ontrack = (event) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
          remoteAudioRef.current.play().catch(() => undefined);
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onopen = () => {
        setRealtimeStatus("live");
        addRealtimeLog(`Live voice session started · model ${session.model || "realtime"} · voice ${session.voice || "default"}`);
        dc.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: "Start with one short greeting. Ask what the operator wants to rehearse or what question the audience has.",
            output_modalities: ["audio"]
          }
        }));
      };
      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "conversation.item.input_audio_transcription.completed" && msg.transcript) {
            addRealtimeLog(`You: ${msg.transcript}`);
          }
          if ((msg.type === "response.audio_transcript.done" || msg.type === "response.output_text.done") && (msg.transcript || msg.text)) {
            addRealtimeLog(`Expert: ${msg.transcript || msg.text}`);
          }
          if (msg.type === "error") {
            setRealtimeError(msg.error?.message || "Realtime API error");
          }
        } catch {
          // Ignore non-JSON realtime events.
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      setRealtimeStatus("connecting");
      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp || "",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp"
        }
      });
      if (!sdpRes.ok) {
        const text = await sdpRes.text();
        throw new Error(text || "Realtime WebRTC connection failed");
      }
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (e: any) {
      stopRealtimeExpert();
      setRealtimeError(e.message || "Could not start realtime voice expert");
      setRealtimeStatus("error");
    }
  }

  function stopRealtimeExpert() {
    try {
      dcRef.current?.close();
      pcRef.current?.close();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    } catch {
      // Ignore cleanup errors.
    }
    dcRef.current = null;
    pcRef.current = null;
    localStreamRef.current = null;
    setRealtimeStatus("idle");
    addRealtimeLog("Voice session stopped");
  }

  const purpose = modePurpose[mode] || modePurpose.voice_delivery;

  return (
    <main>
      <section className="hero-v49">
        <div className="hero-copy">
          <span className="badge">NPL internal prototype · UX cleanup build</span>
          <h1>NPL AI Product Expert</h1>
          <p className="lead">
            A working console for preparing, delivering and rehearsing AI product training for banks, insurers and financial services teams.
          </p>
        </div>
        <div className="card build-card">
          <div className="build-topline">
            <strong>Current build v4.9</strong>
            <span className="mini-badge">Cleaner console</span>
          </div>
          <p className="small">Choose the outcome, add context, generate the material, then deliver, audit or rehearse it.</p>
          <div className="workflow-strip">
            {workflowCards.map((card) => (
              <div key={card.title}>
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workspace-v49">
        <aside className="side-panel card">
          <div className="step-kicker">Step 1</div>
          <h2>Choose what you need</h2>
          <p className="small">The mode carries the quality rules. The request box is only for topic, audience, duration and nuance.</p>

          <label>Access password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="APP_PASSWORD" />

          <label>Mode</label>
          <select value={mode} onChange={e => changeMode(e.target.value)}>
            {modes.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
          </select>

          <div className="mode-card-grid">
            {modes.map((m) => (
              <button
                type="button"
                key={m.value}
                className={`mode-card-button ${mode === m.value ? "active" : ""}`}
                onClick={() => changeMode(m.value)}
              >
                <span className={`phase-dot ${phaseClass(modePurpose[m.value]?.phase || "prepare")}`}>{modePurpose[m.value]?.phase || "Prepare"}</span>
                <strong>{m.label}</strong>
                <small>{m.hint}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="main-panel-v49">
          <div className="card mode-brief-card">
            <div className="mode-brief-top">
              <div>
                <span className={`phase-pill ${phaseClass(purpose.phase)}`}>{purpose.phase}</span>
                <h2>{activeMode.label}</h2>
                <p className="small">{activeMode.hint}</p>
              </div>
              <div className="expected-output-box">
                <strong>Expected output</strong>
                <p>{purpose.outputs}</p>
              </div>
            </div>
            <div className="mode-brief-grid">
              <div><strong>What to input</strong><span>{purpose.inputs}</span></div>
              <div><strong>Best used for</strong><span>{purpose.when}</span></div>
              <div><strong>Cost posture</strong><span>{modeCostLabel(activeMode.cost)} · {suggestedModelUse} · {webStatus}</span></div>
            </div>
          </div>

          <div className="input-output-grid-v49">
            <section className="card composer-card">
              <div className="step-kicker">Step 2</div>
              <h2>Give context</h2>
              <p className="small">Use short instructions. The mode already enforces source discipline, nuance and financial-services specificity where relevant.</p>

              <label>Request</label>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />

              <div className="cost-box compact-cost">
                <strong>Cost guardrails</strong>
                <div className="cost-proxy-grid">
                  <div>
                    <span className="cost-label">Text estimate</span>
                    <strong>{euro(estimatedTextCost)}</strong>
                    <small>{costBand(estimatedTextCost)} · rough proxy</small>
                  </div>
                  <div>
                    <span className="cost-label">Audio cap</span>
                    <strong>{euro(elevenCostProxy(maxAudioChars).eurProxy)}</strong>
                    <small>{maxAudioChars.toLocaleString()} chars max</small>
                  </div>
                </div>
                <label className="check-label">
                  <input type="checkbox" checked={useDeep} onChange={e => setUseDeep(e.target.checked)} />
                  <span>Use deep model</span>
                </label>
                <p className="small">Client-ready lessons, PoV, audits and research only. Keep off for drafts.</p>

                <label className="check-label">
                  <input type="checkbox" checked={useWeb} onChange={e => setUseWeb(e.target.checked)} />
                  <span>Use web search</span>
                </label>
                <p className="small">Use mainly for Research Scout and Frontier Briefing.</p>

                <label>Max ElevenLabs chars</label>
                <input type="number" min="200" max="5000" step="100" value={maxAudioChars} onChange={(e) => setMaxAudioChars(Number(e.target.value || 1200))} />
                <p className="small">Default: selected text or one block only. Current cap ≈ {fullAudioProxy.estimatedCredits.toLocaleString()} credits / {euro(fullAudioProxy.eurProxy)} proxy.</p>
              </div>

              <div className="button-row left composer-actions">
                <button disabled={loading} onClick={submit}>{loading ? "Thinking…" : "Generate output"}</button>
                <button className="secondary" type="button" onClick={researchUpgrade}>Research upgrade</button>
              </div>
            </section>

            <section className="output-stack-v49">
              <div className="card output-card">
                <div className="output-header">
                  <div>
                    <div className="step-kicker">Step 3</div>
                    <strong>Output</strong>
                    <p className="small">Review, copy, audit, or turn selected blocks into voice. Use audio on selected blocks only.</p>
                    {meta && <p className="small">Model: {meta.model} · Profile: {meta.cost_profile || "n/a"} · Tools: {(meta.tools || []).join(", ") || "none"} · Web: {String(meta.web_enabled && meta.web_requested)}</p>}
                    {!!output && <p className="small">Clean voice length: {outputChars.toLocaleString()} chars · Blocks detected: {voiceBlocks.length} · Full-output audio proxy: {euro(elevenCostProxy(outputChars).eurProxy)}</p>}
                  </div>
                  <div className="button-row">
                    <button className="secondary" onClick={copyOutput}>Copy</button>
                    <button className="secondary" onClick={readOutput}>Browser voice</button>
                    <button className="secondary" onClick={() => generateElevenLabsAudio()} disabled={audioLoading || !output}>{audioLoading ? "Creating…" : "ElevenLabs selected/full"}</button>
                    <button className="secondary" onClick={stopVoice}>Stop</button>
                    <button className="secondary" onClick={auditCurrentOutput}>Audit output</button>
                  </div>
                </div>
                {audioError && <p className="small error-text">{audioError}</p>}
                {audioUrl && <div className="audio-box"><audio className="audio-player" controls src={audioUrl} /><p className="small">Audio generated from {audioText.length.toLocaleString()} chars · approx. {euro(elevenCostProxy(audioText.length).eurProxy)} proxy.</p></div>}
                <div className="output">{output || "The generated answer will appear here."}</div>
              </div>

              {!!voiceBlocks.length && (
                <div className="card block-card">
                  <div className="output-header">
                    <div>
                      <strong>Voice blocks</strong>
                      <p className="small">Generate audio for one block at a time. This is the affordable rehearsal workflow.</p>
                    </div>
                  </div>
                  <div className="block-list">
                    {voiceBlocks.map((block, idx) => (
                      <div className="voice-block" key={`${idx}-${block.slice(0, 20)}`}>
                        <div className="voice-block-title">
                          <strong>Block {idx + 1}</strong>
                          <span className="small">{block.length} chars · {euro(elevenCostProxy(block.length).eurProxy)}</span>
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
          </div>
        </section>

        <aside className="card voice-expert-card-v49">
          <div className="step-kicker">Live beta</div>
          <div className="voice-expert-header">
            <div>
              <strong>Interactive voice expert</strong>
              <p className="small">Use for rehearsal and internal demos. Not public webinars yet.</p>
            </div>
            <span className={`status-pill ${realtimeStatus === "live" ? "live" : ""}`}>{realtimeStatus}</span>
          </div>

          <label>Live session context</label>
          <textarea className="small-textarea" value={realtimeContext} onChange={(e) => setRealtimeContext(e.target.value)} />

          <label className="check-label">
            <input type="checkbox" checked={useRealtimeDeep} onChange={e => setUseRealtimeDeep(e.target.checked)} />
            <span>Use stronger realtime model</span>
          </label>
          <p className="small">Default should be the cheaper realtime model. Use stronger only for important rehearsals.</p>

          <div className="button-row left">
            <button type="button" onClick={startRealtimeExpert} disabled={realtimeStatus !== "idle" && realtimeStatus !== "error"}>Start voice expert</button>
            <button className="secondary" type="button" onClick={stopRealtimeExpert}>Stop</button>
          </div>

          <audio ref={remoteAudioRef} autoPlay className="hidden-audio" />
          {realtimeError && <p className="small error-text">{realtimeError}</p>}

          <div className="realtime-notes">
            <strong>How to use</strong>
            <p className="small">Ask one question at a time. Interrupt if needed. Keep sessions short while testing cost and quality.</p>
            <strong>Recent transcript/events</strong>
            <div className="realtime-log">
              {realtimeLog.length ? realtimeLog.map((line, i) => <p className="small" key={`${i}-${line}`}>{line}</p>) : <p className="small">No live events yet.</p>}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
