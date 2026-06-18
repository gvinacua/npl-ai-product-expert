"use client";

import { useMemo, useRef, useState } from "react";

type JobId = "build" | "talk" | "deliver";
type AgentMode = "speaker" | "lesson" | "source_lesson" | "voice_delivery" | "training" | "panel" | "sparring" | "frontier" | "research" | "audit" | "pov";

type ActionDef = {
  id: string;
  job: JobId;
  label: string;
  mode: AgentMode;
  description: string;
  placeholder: string;
  defaultDeep?: boolean;
  defaultWeb?: boolean;
  outputHint: string;
};

const jobs: Record<JobId, { title: string; tagline: string; description: string }> = {
  build: {
    title: "Build a learning asset",
    tagline: "Create client material",
    description: "Prepare a session, module, keynote, proposal section, source pack or Q&A bank for a specific training objective."
  },
  talk: {
    title: "Talk with the expert",
    tagline: "Discuss, debate, challenge",
    description: "Interact with the AI expert as a specialist in a conversation, panel or strategic discussion. Use text or live voice."
  },
  deliver: {
    title: "Deliver / activate",
    tagline: "Use it with an audience",
    description: "Turn prepared content into spoken blocks, live Q&A support, presenter notes, slide cues and voice delivery."
  }
};

const actions: ActionDef[] = [
  {
    id: "session",
    job: "build",
    label: "Session / module",
    mode: "source_lesson",
    defaultDeep: true,
    description: "Best for client-facing classes and training modules.",
    placeholder: "Topic: From AI tools to AI products in financial services.\nAudience: mixed banking and insurance teams.\nDuration: 35 minutes.\nObjective: help participants distinguish adoption, tools, workflows and AI products.\nNuance: use real examples where possible and mark claims to verify.",
    outputHint: "Create a source-grounded learning asset. Include thesis, agenda, spoken blocks, exercise, evidence anchors, claims to verify and suggested next iteration."
  },
  {
    id: "proposal",
    job: "build",
    label: "Proposal / programme",
    mode: "training",
    description: "Best for shaping a client programme or commercial proposal.",
    placeholder: "Client/context: financial-services company exploring AI training.\nNeed: programme to help teams design, build and manage AI products.\nFormat: 2 half-day workshops plus optional voice expert.\nTone: concise, premium, practical.",
    outputHint: "Create a practical programme/proposal asset with objectives, modules, outputs, delivery format and assumptions."
  },
  {
    id: "source-pack",
    job: "build",
    label: "Source pack",
    mode: "research",
    defaultDeep: true,
    defaultWeb: true,
    description: "Best for finding sources, cases and weak signals before building content.",
    placeholder: "Research need: find recent and less obvious sources, examples and tools to enrich an AI product training programme for banks and insurers.\nFocus: agents, governance, evaluation, voice interfaces, operating model, adoption-to-product transition.",
    outputHint: "Return a selective source pack with links where possible, what each source supports, confidence, how to use in training and claims to verify."
  },
  {
    id: "pov",
    job: "talk",
    label: "Build a point of view",
    mode: "pov",
    defaultDeep: true,
    description: "Best for shaping NPL's position on contested AI topics.",
    placeholder: "Topic: Bottom-up AI adoption vs AI product discipline in banking and insurance.\nAudience: senior innovation, product, data, risk and compliance leaders.\nNeed: concise NPL position with evidence anchors and uncertainty.",
    outputHint: "Compare approaches before taking a position. Include evidence anchors, uncertainty, NPL provisional view and a senior-audience challenge question."
  },
  {
    id: "panel-answer",
    job: "talk",
    label: "Panel answer",
    mode: "panel",
    description: "Best for 60–90 second responses to audience or moderator questions.",
    placeholder: "Question: Why is bottom-up AI adoption not enough, but still important in banking?\nAudience: senior financial-services leaders.\nTone: concise, nuanced, practical.",
    outputHint: "Give a concise expert answer with direct view, nuance, evidence caveat, example if safe and a memorable closing line."
  },
  {
    id: "challenge",
    job: "talk",
    label: "Challenge my thinking",
    mode: "sparring",
    description: "Best for quick pushback and sharper framing.",
    placeholder: "Idea to challenge: We should position the AI expert as a synthetic speaker for corporate AI training.\nWhat feels weak, what is promising, and what should we do next?",
    outputHint: "Challenge constructively. Keep it short: thesis, 3 bullets and one recommendation."
  },
  {
    id: "voice-blocks",
    job: "deliver",
    label: "Voice blocks",
    mode: "voice_delivery",
    description: "Best for preparing text that can be spoken by ElevenLabs or a live expert.",
    placeholder: "Prepare a 2-minute spoken opening for a financial services AI training session.\nTopic: From AI tools to AI products.\nAudience: banking and insurance leaders.\nStyle: concise, senior, nuanced, non-hype.\nStructure: 3 short spoken blocks.",
    outputHint: "Create short speakable blocks with delivery notes and optional slide cues. Make it natural for voice."
  },
  {
    id: "live-qa",
    job: "deliver",
    label: "Live Q&A support",
    mode: "panel",
    description: "Best for preparing answer patterns and guardrails for a session.",
    placeholder: "Session context: AI product training for banking and insurance teams.\nLikely audience questions: governance, adoption, agents, risk, productivity, build vs buy.\nNeed: concise answer patterns and safe-to-say / verify-first guidance.",
    outputHint: "Prepare concise Q&A support: likely questions, 60-second answers, what to verify, and safe fallback language."
  },
  {
    id: "speaker-console",
    job: "deliver",
    label: "Delivery console pack",
    mode: "voice_delivery",
    description: "Best for turning a session into operator-ready blocks.",
    placeholder: "Existing session/topic: From AI tools to AI products in financial services.\nNeed: operator-ready delivery blocks with slide cues, pauses, voice notes and Q&A handoff moments.\nDuration: 10 minutes.",
    outputHint: "Turn the brief into operator-ready delivery blocks: spoken text, timing, slide cue, audience pause and evidence warning if needed."
  }
];

function getActionsFor(job: JobId) {
  return actions.filter((a) => a.job === job);
}

function cleanForVoice(text: string) {
  return text
    .replace(/\[[^\]]{0,80}\]\([^\)]{0,220}\)/g, "")
    .replace(/[#*_>`]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
  return blocks.slice(0, 10);
}

function speakText(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanForVoice(text));
  utterance.lang = "en-US";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function stopBrowserVoice() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function getSelectionText() {
  if (typeof window === "undefined") return "";
  return window.getSelection()?.toString().trim() || "";
}

function estimateTokens(text: string) {
  return Math.max(1, Math.ceil((text || "").length / 4));
}

function euro(amount: number) {
  if (amount <= 0) return "€0";
  if (amount < 0.01) return "<€0.01";
  return `~€${amount.toFixed(amount < 1 ? 2 : 1)}`;
}

function costBand(amount: number) {
  if (amount < 0.05) return "low";
  if (amount < 0.50) return "medium";
  return "high";
}

function modelCostProxy(modelLabel: string, inputTokens: number, maxOutputTokens: number, web: boolean) {
  const model = (modelLabel || "").toLowerCase();
  const rates = model.includes("mini") || model.includes("draft")
    ? { inputPer1M: 0.15, outputPer1M: 0.60 }
    : { inputPer1M: 2.00, outputPer1M: 8.00 };
  const base = (inputTokens * rates.inputPer1M + maxOutputTokens * rates.outputPer1M) / 1_000_000;
  return base + (web ? 0.02 : 0);
}

function elevenCostProxy(chars: number) {
  return { estimatedCredits: chars, eurProxy: chars * 0.00018 };
}

function estimatedOutputBudget(mode: AgentMode) {
  const budgets: Record<AgentMode, number> = {
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
  return budgets[mode] || 1600;
}

function buildPrompt(action: ActionDef, brief: string, depth: string) {
  return `JOB TO BE DONE: ${jobs[action.job].title}\nTASK: ${action.label}\nDEPTH: ${depth}\n\nUSER BRIEF:\n${brief}\n\nOUTPUT REQUIREMENTS:\n${action.outputHint}\n\nKeep the output useful and concise. Add evidence / claims-to-verify only where relevant. Do not invent named company cases.`;
}

export default function Home() {
  const [job, setJob] = useState<JobId>("build");
  const [actionId, setActionId] = useState("session");
  const [brief, setBrief] = useState(actions[0].placeholder);
  const [password, setPassword] = useState("");
  const [depth, setDepth] = useState("client-ready draft");
  const [useWeb, setUseWeb] = useState(false);
  const [useDeep, setUseDeep] = useState(true);
  const [output, setOutput] = useState("");
  const [qualityNote, setQualityNote] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [qualityLoading, setQualityLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioError, setAudioError] = useState("");
  const [audioText, setAudioText] = useState("");
  const [maxAudioChars, setMaxAudioChars] = useState(1200);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState("idle");
  const [realtimeError, setRealtimeError] = useState("");
  const [realtimeLog, setRealtimeLog] = useState<string[]>([]);
  const [realtimeContext, setRealtimeContext] = useState("You are joining a strategic conversation as the NPL AI Product Expert. Answer questions about AI products, adoption, governance, agents and financial services. Keep answers concise: 45-90 seconds.");
  const [useRealtimeDeep, setUseRealtimeDeep] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentAction = actions.find((a) => a.id === actionId) || actions[0];
  const availableActions = getActionsFor(job);
  const generatedPrompt = buildPrompt(currentAction, brief, depth);
  const estimatedTextCost = modelCostProxy(useDeep ? "deep model" : "draft mini", estimateTokens(generatedPrompt), estimatedOutputBudget(currentAction.mode), useWeb);
  const voiceBlocks = useMemo(() => splitVoiceBlocks(output), [output]);
  const outputChars = cleanForVoice(output).length;

  function changeJob(nextJob: JobId) {
    const first = getActionsFor(nextJob)[0];
    setJob(nextJob);
    setActionId(first.id);
    setBrief(first.placeholder);
    setUseDeep(Boolean(first.defaultDeep));
    setUseWeb(Boolean(first.defaultWeb));
    setOutput("");
    setQualityNote("");
    setMeta(null);
  }

  function changeAction(nextActionId: string) {
    const next = actions.find((a) => a.id === nextActionId) || actions[0];
    setActionId(next.id);
    setBrief(next.placeholder);
    setUseDeep(Boolean(next.defaultDeep));
    setUseWeb(Boolean(next.defaultWeb));
    setQualityNote("");
  }

  async function runAction() {
    setLoading(true);
    setOutput("");
    setQualityNote("");
    setMeta(null);
    setAudioUrl("");
    setAudioError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: currentAction.mode, prompt: generatedPrompt, password, useWeb, useDeep })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setOutput(data.output || "");
      setMeta(data.meta || null);
    } catch (e: any) {
      setOutput(`Error: ${e.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  async function runQualityCheck() {
    if (!output.trim()) return;
    setQualityLoading(true);
    setQualityNote("");
    try {
      const prompt = `Audit this output as a transversal quality layer for NPL. Be concise. Return: score /10, client-readiness, evidence status, key weakness, and next improvement.\n\nOUTPUT:\n${output}`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "audit", prompt, password, useWeb: false, useDeep: true })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setQualityNote(data.output || "");
    } catch (e: any) {
      setQualityNote(`Audit error: ${e.message || "Something went wrong"}`);
    } finally {
      setQualityLoading(false);
    }
  }

  async function generateElevenLabsAudio(text?: string) {
    const selected = getSelectionText();
    const sourceText = text || selected || output;
    if (!sourceText.trim()) return;
    if (sourceText.length > maxAudioChars) {
      setAudioError(`Selected text is ${sourceText.length} chars. Current cap is ${maxAudioChars}. Select a smaller block or raise the cap deliberately.`);
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
      setAudioUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      setAudioError(e.message || "Audio generation failed");
    } finally {
      setAudioLoading(false);
    }
  }

  function copyText(text: string) {
    navigator.clipboard?.writeText(text).catch(() => undefined);
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
        addRealtimeLog(`Voice session started · ${session.model || "realtime"} · ${session.voice || "voice"}`);
        dc.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: "Start with one short greeting. Ask what topic or question we should discuss.",
            output_modalities: ["audio"]
          }
        }));
      };
      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "conversation.item.input_audio_transcription.completed" && msg.transcript) addRealtimeLog(`You: ${msg.transcript}`);
          if ((msg.type === "response.audio_transcript.done" || msg.type === "response.output_text.done") && (msg.transcript || msg.text)) addRealtimeLog(`Expert: ${msg.transcript || msg.text}`);
          if (msg.type === "error") setRealtimeError(msg.error?.message || "Realtime API error");
        } catch {
          // Ignore non-JSON events.
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      setRealtimeStatus("connecting");
      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp || "",
        headers: { Authorization: `Bearer ${ephemeralKey}`, "Content-Type": "application/sdp" }
      });
      if (!sdpRes.ok) throw new Error(await sdpRes.text() || "Realtime WebRTC connection failed");
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (e: any) {
      stopRealtimeExpert();
      setRealtimeError(e.message || "Could not start realtime expert");
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

  const jobActions = availableActions.map((a) => (
    <button
      key={a.id}
      className={`choice-button ${a.id === actionId ? "active" : ""}`}
      onClick={() => changeAction(a.id)}
      type="button"
    >
      <span>{a.label}</span>
      <small>{a.description}</small>
    </button>
  ));

  return (
    <main className="v5-main">
      <section className="v5-hero">
        <div>
          <span className="badge">NPL internal prototype · Current build v5</span>
          <h1>NPL AI Product Expert</h1>
          <p className="lead">Three focused workflows: build learning assets, talk with the expert, and deliver or activate content with voice when useful.</p>
        </div>
        <div className="hero-status card">
          <strong>Lightweight quality layer</strong>
          <p className="small">Quality, evidence and cost are shown as support signals inside each workflow — not as separate products.</p>
          <div className="status-grid">
            <span>Cost: {costBand(estimatedTextCost)} · {euro(estimatedTextCost)}</span>
            <span>Model: {useDeep ? "deep" : "draft"}</span>
            <span>Voice cap: {maxAudioChars} chars</span>
          </div>
        </div>
      </section>

      <section className="job-grid">
        {(Object.keys(jobs) as JobId[]).map((id) => (
          <button key={id} className={`job-card ${job === id ? "selected" : ""}`} onClick={() => changeJob(id)} type="button">
            <small>{jobs[id].tagline}</small>
            <strong>{jobs[id].title}</strong>
            <span>{jobs[id].description}</span>
          </button>
        ))}
      </section>

      <section className="workspace">
        <div className="card left-panel">
          <div className="section-title">
            <span>1</span>
            <div>
              <strong>{jobs[job].title}</strong>
              <p className="small">Choose the specific outcome, then provide only the useful context.</p>
            </div>
          </div>

          <div className="choice-grid">{jobActions}</div>

          <label>Context / brief</label>
          <textarea className="brief-box" value={brief} onChange={(e) => setBrief(e.target.value)} />

          <details className="advanced" open={showAdvanced} onToggle={(e) => setShowAdvanced((e.target as HTMLDetailsElement).open)}>
            <summary>Advanced settings</summary>
            <label>Access password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="APP_PASSWORD" />

            <label>Depth</label>
            <select value={depth} onChange={(e) => setDepth(e.target.value)}>
              <option>quick draft</option>
              <option>client-ready draft</option>
              <option>deep / source-grounded</option>
            </select>

            <label className="check-label"><input type="checkbox" checked={useDeep} onChange={(e) => setUseDeep(e.target.checked)} /> Use deep model</label>
            <label className="check-label"><input type="checkbox" checked={useWeb} onChange={(e) => setUseWeb(e.target.checked)} /> Use web search</label>

            <label>Max ElevenLabs chars per request</label>
            <input type="number" min="200" max="5000" step="100" value={maxAudioChars} onChange={(e) => setMaxAudioChars(Number(e.target.value || 1200))} />
          </details>

          <button className="primary" disabled={loading} onClick={runAction}>{loading ? "Working…" : `Create ${currentAction.label}`}</button>
        </div>

        <div className="right-panel">
          {job === "talk" && (
            <div className="card voice-card focused">
              <div className="section-title">
                <span>Live</span>
                <div>
                  <strong>Talk with the expert by voice</strong>
                  <p className="small">Use this for debate, panel-style Q&A and fast thinking. Keep test sessions short.</p>
                </div>
                <b className={`status-pill ${realtimeStatus === "live" ? "live" : ""}`}>{realtimeStatus}</b>
              </div>
              <textarea className="small-textarea" value={realtimeContext} onChange={(e) => setRealtimeContext(e.target.value)} />
              <label className="check-label"><input type="checkbox" checked={useRealtimeDeep} onChange={(e) => setUseRealtimeDeep(e.target.checked)} /> Stronger realtime model</label>
              <div className="button-row left">
                <button onClick={startRealtimeExpert} disabled={realtimeStatus !== "idle" && realtimeStatus !== "error"}>Start voice expert</button>
                <button className="secondary" onClick={stopRealtimeExpert}>Stop</button>
              </div>
              <audio ref={remoteAudioRef} autoPlay className="hidden-audio" />
              {realtimeError && <p className="error-text small">{realtimeError}</p>}
              <div className="realtime-log compact">
                {realtimeLog.length ? realtimeLog.map((line, i) => <p className="small" key={`${i}-${line}`}>{line}</p>) : <p className="small">No live events yet.</p>}
              </div>
            </div>
          )}

          <div className="card output-card-v5">
            <div className="output-header-v5">
              <div>
                <span className="muted-label">2 · Output</span>
                <h2>{currentAction.label}</h2>
                <p className="small">{currentAction.description}</p>
                {meta && <p className="small">Model: {meta.model} · Profile: {meta.cost_profile || "n/a"} · Tools: {(meta.tools || []).join(", ") || "none"}</p>}
              </div>
              <div className="button-row">
                <button className="secondary" onClick={() => copyText(output)} disabled={!output}>Copy</button>
                <button className="secondary" onClick={runQualityCheck} disabled={!output || qualityLoading}>{qualityLoading ? "Checking…" : "Quality check"}</button>
              </div>
            </div>

            {qualityNote && (
              <div className="quality-panel">
                <strong>Quality / evidence signal</strong>
                <div>{qualityNote}</div>
              </div>
            )}

            <div className="output-text">{output || "The result will appear here. The interface keeps advanced controls hidden unless you need them."}</div>
          </div>

          {(job === "deliver" || currentAction.mode === "voice_delivery" || voiceBlocks.length > 0) && output && (
            <div className="card blocks-card">
              <div className="output-header-v5">
                <div>
                  <span className="muted-label">3 · Delivery blocks</span>
                  <h2>Speak or export selected blocks</h2>
                  <p className="small">Generate audio one block at a time. Full output: {outputChars.toLocaleString()} voice chars · approx {euro(elevenCostProxy(outputChars).eurProxy)}.</p>
                </div>
                <div className="button-row">
                  <button className="secondary" onClick={() => speakText(output)}>Browser voice</button>
                  <button className="secondary" onClick={stopBrowserVoice}>Stop voice</button>
                </div>
              </div>

              {audioError && <p className="error-text small">{audioError}</p>}
              {audioUrl && <div className="audio-box"><audio controls src={audioUrl} /><p className="small">Audio from {audioText.length.toLocaleString()} chars · approx {euro(elevenCostProxy(audioText.length).eurProxy)}.</p></div>}

              <div className="block-list-v5">
                {voiceBlocks.map((block, idx) => (
                  <div className="voice-block-v5" key={`${idx}-${block.slice(0, 12)}`}>
                    <div>
                      <strong>Block {idx + 1}</strong>
                      <p>{block.length > 300 ? `${block.slice(0, 300)}…` : block}</p>
                    </div>
                    <div className="block-actions">
                      <small>{block.length} chars · {euro(elevenCostProxy(block.length).eurProxy)}</small>
                      <button className="secondary" onClick={() => generateElevenLabsAudio(block)} disabled={audioLoading || block.length > maxAudioChars}>{audioLoading ? "Creating…" : "ElevenLabs"}</button>
                      <button className="secondary" onClick={() => speakText(block)}>Browser</button>
                      <button className="secondary" onClick={() => copyText(block)}>Copy</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
