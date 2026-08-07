"use client";
import React, { useState } from 'react';

const TWIN_METRICS = {
    biological: {
        name: "Biological Twin",
        tagline: "Macro-physiological homeostasis & systemic telemetry",
        metrics: [
            { label: "Systemic Homeostasis", value: "98.4%", status: "Optimal" },
            { label: "Cellular ATP Production", value: "+14% Δ", status: "Elevated" },
            { label: "Myocardial Efficiency", value: "92%", status: "Stable" }
        ],
        terminalPrompt: "BioGPT-X Core initialized. Ready for synthetic organoid simulation..."
    },
    genomic: {
        name: "Genomic Twin",
        tagline: "Base-pair sequence integrity & epigenetic modification maps",
        metrics: [
            { label: "Base-Pair Stability", value: "99.997%", status: "Nominal" },
            { label: "CRISPR Repair Targets", value: "12 Nodes", status: "Active" },
            { label: "Epigenetic Methylation Age", value: "-4.2 yrs", status: "Optimized" }
        ],
        terminalPrompt: "GenomeGPT Terminal online. Enter base-pair alignment sequences..."
    },
    neural: {
        name: "Neural Twin",
        tagline: "Synaptic density mapping & neurotransmitter load profiles",
        metrics: [
            { label: "Synaptic Sync Latency", value: "1.2 ms", status: "Excellent" },
            { label: "Cognitive Load Capacity", value: "34%", status: "Resting" },
            { label: "Neurotransmitter Index", value: "96/100", status: "Balanced" }
        ],
        terminalPrompt: "Neural Matrix link secure. Synaptic density telemetry streaming..."
    },
    behavioral: {
        name: "Behavioral Twin",
        tagline: "Circadian synchronization & predictive cognitive pathways",
        metrics: [
            { label: "Circadian Phase Alignment", value: "0.98", status: "Synchronized" },
            { label: "Decision Efficiency Quotient", value: "142 IQE", status: "High" },
            { label: "Kinetic Energy Yield", value: "5.4 km/e", status: "Nominal" }
        ],
        terminalPrompt: "Behavioral engine processing predictive choice-trees..."
    },
    environmental: {
        name: "Environmental Twin",
        tagline: "Exogenous stress vectors, atmospheric safety & radiation indexes",
        metrics: [
            { label: "Particulate Exposure Index", value: "3 AQI", status: "Pristine" },
            { label: "Shielding Attenuation Rate", value: "0.95 TeV", status: "Secure" },
            { label: "Ambient Barometric Stress", value: "1.01 atm", status: "Stable" }
        ],
        terminalPrompt: "Environmental telemetry synched with Interplanetary Node Selector..."
    }
};

export default function MultiTwinMatrix() {
    const [activeTwin, setActiveTwin] = useState('biological');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8">
            {/* Platform Header */}
            <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-mono tracking-wider text-teal-400 uppercase">Civilization 2050 // Matrix</h1>
                    <p className="text-xs text-slate-400 mt-1">Quantum Digital Human Live Emulation Engine</p>
                </div>
                <div className="text-right font-mono text-xs text-slate-500">
                    SECURE CONNECTION // NODE_ID: 884X-ALPHA
                </div>
            </header>

            {/* 5-Scale Matrix Tab Navigation */}
            <nav className="grid grid-cols-5 gap-2 mb-8">
                {Object.entries(TWIN_METRICS).map(([key, data]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTwin(key)}
                        className={`p-4 border transition-all duration-300 text-left font-mono ${activeTwin === key
                            ? 'bg-teal-950/40 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.15)] text-teal-300'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
                            }`}
                    >
                        <div className="text-xs uppercase tracking-widest opacity-60">Scale 0{Object.keys(TWIN_METRICS).indexOf(key) + 1}</div>
                        <div className="text-sm font-bold mt-1 tracking-wide">{data.name}</div>
                    </button>
                ))}
            </nav>

            {/* Primary Workspace Display */}
            <main className="grid grid-cols-1 gap-6">
                {/* Core Metrics Grid */}
                <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-mono text-slate-200 uppercase">{TWIN_METRICS[activeTwin].name} Control Profile</h2>
                        <p className="text-xs text-slate-400 mt-1 font-sans">{TWIN_METRICS[activeTwin].tagline}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {TWIN_METRICS[activeTwin].metrics.map((metric, idx) => (
                            <div key={idx} className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-sm flex flex-col justify-between">
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{metric.label}</span>
                                <div className="flex justify-between items-baseline mt-4">
                                    <span className="text-2xl font-mono tracking-tight font-semibold text-slate-100">{metric.value}</span>
                                    <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 text-teal-400 tracking-wide rounded-sm">
                                        {metric.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Future Expansion Slot: Specialized Core AI Terminal (Option 2 Setup) */}
                <section className="bg-slate-950 border border-slate-900 p-4 font-mono text-xs text-slate-400 rounded-sm">
                    <div className="flex items-center justify-between mb-3 text-slate-500 border-b border-slate-900 pb-2">
                        <span>[AI INTEGRATION TERMINAL - OPTION 2 PREVIEW]</span>
                        <span className="animate-pulse text-teal-500">● STABLE</span>
                    </div>
                    <div className="p-3 bg-slate-900/30 rounded-sm border border-slate-900 text-slate-300">
                        {TWIN_METRICS[activeTwin].terminalPrompt}
                    </div>
                    <div className="mt-3 flex gap-2">
                        <input
                            type="text"
                            placeholder="System prompt inputs disabled in structure mode..."
                            className="w-full bg-slate-900/50 border border-slate-800 p-2 text-slate-600 cursor-not-allowed text-xs outline-none"
                            disabled
                        />
                        <button className="bg-slate-900 border border-slate-800 px-4 text-slate-500 cursor-not-allowed uppercase text-xs tracking-wider">
                            Execute
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}