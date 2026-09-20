"use client";

import { useMemo, useState } from "react";

type CareFocus = {
  id: "recovery" | "metabolic" | "neural" | "orbital";
  label: string;
  shortLabel: string;
  description: string;
  accent: string;
  baseReadiness: number;
  confidence: number;
  healthspan: number;
  signal: string;
};

const careFocuses: CareFocus[] = [
  {
    id: "recovery",
    label: "Circadian recovery envelope",
    shortLabel: "RECOVERY",
    description: "Models a resilient rest-and-light rhythm inside the digital twin.",
    accent: "#67e8f9",
    baseReadiness: 58,
    confidence: 87,
    healthspan: 2.4,
    signal: "SLEEP / AUTONOMIC",
  },
  {
    id: "metabolic",
    label: "Metabolic resilience loop",
    shortLabel: "METABOLIC",
    description: "Explores adaptive nutrition, movement, and recovery timing as one system.",
    accent: "#a7f3d0",
    baseReadiness: 52,
    confidence: 82,
    healthspan: 1.9,
    signal: "GLUCOSE / LOAD",
  },
  {
    id: "neural",
    label: "Neural load shield",
    shortLabel: "NEURAL",
    description: "Tests an attention, stress, and sensory-load protection envelope.",
    accent: "#c4b5fd",
    baseReadiness: 49,
    confidence: 78,
    healthspan: 1.6,
    signal: "STRESS / COGNITION",
  },
  {
    id: "orbital",
    label: "Microgravity countermeasure",
    shortLabel: "ORBITAL",
    description: "Projects a prevention plan for the physiological constraints of spaceflight.",
    accent: "#f9a8d4",
    baseReadiness: 45,
    confidence: 74,
    healthspan: 2.1,
    signal: "BONE / VASCULAR",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function CausalCareSandbox() {
  const [selectedId, setSelectedId] = useState<CareFocus["id"]>("recovery");
  const [intensity, setIntensity] = useState(64);
  const [sequence, setSequence] = useState(17);
  const [isSimulating, setIsSimulating] = useState(false);

  const selectedFocus = careFocuses.find((focus) => focus.id === selectedId) ?? careFocuses[0];
  const effect = Math.round(intensity * 0.19 + selectedFocus.healthspan * 3);
  const projectedReadiness = clamp(selectedFocus.baseReadiness + effect, 0, 98);
  const residualRisk = clamp(58 - effect, 8, 88);
  const modelConfidence = clamp(selectedFocus.confidence - Math.max(0, intensity - 72) * 0.16, 55, 96);

  const timeline = useMemo(() => {
    const baseline = Array.from({ length: 7 }, (_, index) => selectedFocus.baseReadiness - index * 1.1 + Math.sin(index * 1.7) * 1.8);
    const projected = baseline.map((value, index) => {
      const interventionLift = (effect * index) / 6;
      return clamp(value + interventionLift + Math.sin(index * 1.15) * 1.2, 18, 96);
    });

    return { baseline, projected };
  }, [effect, selectedFocus.baseReadiness]);

  const makePath = (values: number[]) => values
    .map((value, index) => {
      const x = 20 + index * 56;
      const y = 138 - value * 1.04;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const runProjection = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    window.setTimeout(() => {
      setSequence((value) => value + 1);
      setIsSimulating(false);
    }, 650);
  };

  const buttonStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e2e8f0",
    cursor: "pointer",
    fontFamily: '"Courier New", monospace',
  } as const;

  return (
    <section style={{ color: "#e2e8f0", fontFamily: '"Courier New", monospace' }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start", borderBottom: "1px solid rgba(103, 232, 249, 0.2)", paddingBottom: "15px", marginBottom: "18px" }}>
        <div>
          <p style={{ color: "#67e8f9", fontSize: "0.68rem", letterSpacing: "0.18em", margin: "0 0 8px", fontWeight: "bold" }}>CAUSAL CARE SANDBOX Â· LOCAL TWIN</p>
          <h4 style={{ fontSize: "1.32rem", fontWeight: 400, margin: 0, color: "#f8fafc", letterSpacing: "-0.03em" }}>Counterfactual prevention studio</h4>
        </div>
        <div style={{ textAlign: "right", fontSize: "0.62rem", letterSpacing: "0.08em", color: "#67e8f9", lineHeight: 1.65 }}>
          <div>SIMULATION {String(sequence).padStart(3, "0")}</div>
          <div style={{ color: "#94a3b8" }}>NO DATA LEAVES DEVICE</div>
        </div>
      </div>

      <p style={{ margin: "0 0 18px", color: "#94a3b8", fontFamily: "sans-serif", fontSize: "0.88rem", lineHeight: 1.65 }}>
        Explore how a digital twin could compare prevention strategies before action. These are illustrative projections, not medical advice, diagnosis, or treatment recommendations.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "18px" }}>
        {careFocuses.map((focus) => {
          const isSelected = focus.id === selectedId;
          return (
            <button
              key={focus.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(focus.id)}
              style={{
                ...buttonStyle,
                textAlign: "left",
                borderColor: isSelected ? focus.accent : "rgba(255,255,255,0.1)",
                background: isSelected ? `${focus.accent}13` : "rgba(255,255,255,0.025)",
                padding: "12px",
                minHeight: "112px",
                boxShadow: isSelected ? `0 0 22px ${focus.accent}1f` : "none",
                transition: "border-color 160ms ease, background 160ms ease, box-shadow 160ms ease",
              }}
            >
              <span style={{ color: focus.accent, display: "block", fontSize: "0.62rem", letterSpacing: "0.13em", marginBottom: "9px" }}>{focus.signal}</span>
              <span style={{ color: "#f8fafc", display: "block", fontSize: "0.79rem", fontWeight: "bold", marginBottom: "7px" }}>{focus.shortLabel}</span>
              <span style={{ color: "#94a3b8", display: "block", fontFamily: "sans-serif", fontSize: "0.72rem", lineHeight: 1.4 }}>{focus.description}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "14px" }}>
        <div style={{ border: "1px solid rgba(103, 232, 249, 0.18)", background: "linear-gradient(135deg, rgba(8, 47, 73, 0.22), rgba(9, 9, 14, 0.88))", padding: "15px", minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ color: selectedFocus.accent, fontSize: "0.66rem", letterSpacing: "0.12em", marginBottom: "4px" }}>TWIN OUTCOME FIELD</div>
              <div style={{ color: "#e2e8f0", fontSize: "0.82rem" }}>{selectedFocus.label}</div>
            </div>
            <div style={{ fontSize: "0.62rem", color: "#94a3b8", textAlign: "right" }}>90-DAY HORIZON<br /><span style={{ color: "#e2e8f0" }}>UNCERTAINTY VISIBLE</span></div>
          </div>

          <svg viewBox="0 0 380 154" width="100%" height="168" role="img" aria-label="A comparison of baseline and projected twin readiness over 90 days" style={{ display: "block", overflow: "visible" }}>
            {[28, 64, 100, 136].map((y) => <line key={y} x1="20" x2="356" y1={y} y2={y} stroke="rgba(148,163,184,0.14)" strokeDasharray="3 6" />)}
            {[0, 1, 2, 3, 4, 5, 6].map((index) => <text key={index} x={20 + index * 56} y="151" fill="#64748b" fontSize="8" textAnchor="middle">D{index * 15}</text>)}
            <path d={makePath(timeline.baseline)} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
            <path d={makePath(timeline.projected)} fill="none" stroke={selectedFocus.accent} strokeWidth="3" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 5px ${selectedFocus.accent})`, transition: "d 280ms ease" }} />
            {timeline.projected.map((value, index) => <circle key={index} cx={20 + index * 56} cy={138 - value * 1.04} r={index === 6 ? 4 : 2.6} fill={selectedFocus.accent} />)}
            <text x="23" y="18" fill="#64748b" fontSize="8">READINESS INDEX</text>
          </svg>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "0.62rem", color: "#94a3b8", marginTop: "2px" }}>
            <span><i style={{ display: "inline-block", width: "15px", borderTop: "2px dashed #64748b", verticalAlign: "middle", marginRight: "6px" }} />Baseline trajectory</span>
            <span><i style={{ display: "inline-block", width: "15px", borderTop: `2px solid ${selectedFocus.accent}`, verticalAlign: "middle", marginRight: "6px" }} />Counterfactual twin</span>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(3, 7, 18, 0.65)", padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: "0.63rem", letterSpacing: "0.12em", marginBottom: "14px" }}>SCENARIO OUTPUT</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <Metric label="READINESS" value={`${projectedReadiness}%`} color={selectedFocus.accent} />
              <Metric label="RESIDUAL RISK" value={`${residualRisk}%`} color="#fbbf24" />
              <Metric label="MODEL CONF." value={`${Math.round(modelConfidence)}%`} color="#a7f3d0" />
              <Metric label="HEALTHSPAN Î”" value={`+${(selectedFocus.healthspan + intensity / 160).toFixed(1)}y`} color="#c4b5fd" />
            </div>
          </div>
          <div style={{ marginTop: "17px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", color: "#64748b", fontSize: "0.67rem", lineHeight: 1.55 }}>
            The model surfaces trade-offs and uncertainty. It does not replace a clinician or a validated medical system.
          </div>
        </div>
      </div>

      <div style={{ border: "1px solid rgba(196, 181, 253, 0.18)", padding: "15px", background: "rgba(76, 29, 149, 0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
          <label htmlFor="intervention-intensity" style={{ color: "#e2e8f0", fontSize: "0.72rem", letterSpacing: "0.1em" }}>INTERVENTION INTENSITY</label>
          <span style={{ color: "#c4b5fd", fontWeight: "bold", fontSize: "0.78rem" }}>{intensity}%</span>
        </div>
        <input
          id="intervention-intensity"
          type="range"
          min="20"
          max="90"
          value={intensity}
          onChange={(event) => setIntensity(Number(event.target.value))}
          style={{ width: "100%", accentColor: "#a78bfa", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.58rem", letterSpacing: "0.07em", marginTop: "7px" }}><span>CONSERVATIVE</span><span>EXPERIMENTAL</span></div>
        <button
          type="button"
          onClick={runProjection}
          disabled={isSimulating}
          style={{
            ...buttonStyle,
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            borderColor: isSimulating ? "rgba(103,232,249,0.28)" : "#67e8f9",
            color: isSimulating ? "#67e8f9" : "#020617",
            background: isSimulating ? "rgba(8,47,73,0.45)" : "#67e8f9",
            fontSize: "0.72rem",
            letterSpacing: "0.13em",
            fontWeight: "bold",
            cursor: isSimulating ? "wait" : "pointer",
            transition: "background 180ms ease, color 180ms ease",
          }}
        >
          {isSimulating ? "CALIBRATING TWINâ€¦" : "RUN COUNTERFACTUAL PROJECTION"}
        </button>
      </div>
    </section>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: "8px" }}>
      <div style={{ color: "#64748b", fontSize: "0.56rem", letterSpacing: "0.07em", marginBottom: "5px" }}>{label}</div>
      <div style={{ color, fontSize: "0.94rem", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

