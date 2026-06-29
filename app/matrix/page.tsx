"use client";

import React, { useState, useEffect, useRef } from 'react';

const NODE_DATA = {
    earth: { name: "Earth Mega-City Hub", status: "PRIMARY", telemetry: "Terrestrial fiber grids operational. Quantum relays synchronized.", module: "MATRIX", actionText: "INITIALIZE 5-SCALE MATRIX" },
    lunar: { name: "Lunar Base Alpha", status: "STABLE", telemetry: "Laser communication arrays tracking. Surface radiation shielding nominal.", module: "QML", actionText: "EXECUTE QML ANALYTICS" },
    mars: { name: "Mars Colony Prime", status: "DEGRADED SIGNAL", telemetry: "Deep space telemetry experiencing atmospheric interference.", module: "TOPOLOGY", actionText: "CALCULATE HAMILTONIAN CIRCUITS" }
};

export default function CivilizationCore() {
    const [appStage, setAppStage] = useState('GATEWAY');
    const [nodeId, setNodeId] = useState('LUBHANSHU-25BCS10043');
    const [passkey, setPasskey] = useState('');
    const [activeNode, setActiveNode] = useState<'earth' | 'lunar' | 'mars'>('earth');

    // Matrix State
    const [activeTwin, setActiveTwin] = useState('biological');
    const [metrics, setMetrics] = useState({ primary: 98.4, secondary: 42.1 });
    const [cmdInput, setCmdInput] = useState('');
    const [terminalLogs, setTerminalLogs] = useState(["[SYSTEM]: GPT-X Core initialized. Ready for prompt..."]);
    const logEndRef = useRef<HTMLDivElement>(null);

    // QML State (Interactive Math Params)
    const [qmlDataset, setQmlDataset] = useState(10000);
    const [qmlNoise, setQmlNoise] = useState(5);
    const [qmlErrorCorrection, setQmlErrorCorrection] = useState(15);

    // Topology State
    const [topoPath, setTopoPath] = useState<number[]>([]);
    const [calcStatus, setCalcStatus] = useState('IDLE');

    // Matrix Telemetry Hook
    useEffect(() => {
        if (appStage !== 'MATRIX') return;
        const interval = setInterval(() => {
            setMetrics(prev => ({
                primary: Math.min(99.9, Math.max(90.0, prev.primary + (Math.random() - 0.4))),
                secondary: Math.min(100, Math.max(10, prev.secondary + (Math.random() - 0.5) * 4))
            }));
        }, 800);
        return () => clearInterval(interval);
    }, [appStage, activeTwin]);

    useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [terminalLogs]);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passkey) return;
        setAppStage('HANDSHAKE');
        setTimeout(() => setAppStage('VERIFYING'), 1000);
        setTimeout(() => setAppStage('GRANTED'), 2500);
    };

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cmdInput.trim()) return;
        setTerminalLogs(prev => [...prev, `> ${cmdInput}`]);
        const currentCmd = cmdInput.toLowerCase();
        setCmdInput('');
        setTimeout(() => {
            let response = "[GPT-X]: Command unacknowledged. Check syntax.";
            if (currentCmd.includes('analyze') || currentCmd.includes('scan')) response = `[GPT-X]: Analyzing ${activeTwin} variables... No critical anomalies detected.`;
            else if (currentCmd.includes('clear')) { setTerminalLogs(["[SYSTEM]: Memory cleared. Core ready."]); return; }
            setTerminalLogs(prev => [...prev, response]);
        }, 900);
    };

    const runHamiltonianCircuit = () => {
        setCalcStatus('CALCULATING');
        setTopoPath([]);
        let step = 0;
        const optimalPath = [0, 1, 2, 5, 8, 7, 4, 3, 6];
        const trace = setInterval(() => {
            if (step < optimalPath.length) { setTopoPath(prev => [...prev, optimalPath[step]]); step++; }
            else { clearInterval(trace); setCalcStatus('SECURE'); }
        }, 400);
    };

    // QML Math Calculations: Classical O(N) vs Quantum O(sqrt(N))
    const classicalTimeMs = qmlDataset * 0.05;
    const quantumTimeMs = Math.sqrt(qmlDataset) * 2.5 * (1 + qmlNoise / 100) * (1 + qmlErrorCorrection / 100);
    const qmlAdvantage = classicalTimeMs > quantumTimeMs ? (((classicalTimeMs - quantumTimeMs) / classicalTimeMs) * 100).toFixed(1) : "0.0";
    const cBarWidth = Math.min(100, (classicalTimeMs / Math.max(classicalTimeMs, quantumTimeMs)) * 100);
    const qBarWidth = Math.min(100, (quantumTimeMs / Math.max(classicalTimeMs, quantumTimeMs)) * 100);

    const injectedStyles = `
    .sys-container { background-color: #030712; color: #14b8a6; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Courier New', Courier, monospace; padding: 20px; }
    .sys-window { border: 1px solid #1f2937; background: rgba(0, 0, 0, 0.95); padding: 40px; max-width: 1000px; width: 100%; box-shadow: 0 0 40px rgba(20, 184, 166, 0.05); }
    .scan-line { width: 100%; height: 2px; background: #14b8a6; opacity: 0.2; animation: scan 4s linear infinite; margin-bottom: 20px; }
    @keyframes scan { 0% { transform: translateY(-15px); opacity: 0; } 50% { opacity: 0.4; } 100% { transform: translateY(15px); opacity: 0; } }
    
    .glitch-header { color: #5eead4; font-size: 1.4rem; margin-bottom: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
    .sys-input { background: transparent; border: none; border-bottom: 1px solid #374151; color: #ccfbf1; font-family: inherit; font-size: 1rem; padding: 10px 0; width: 100%; outline: none; transition: all 0.3s; margin-bottom: 25px; }
    .sys-input:focus { border-bottom-color: #14b8a6; }
    .sys-btn { background: transparent; border: 1px solid #14b8a6; color: #14b8a6; padding: 12px 24px; cursor: pointer; text-transform: uppercase; font-weight: bold; width: 100%; transition: all 0.3s; letter-spacing: 2px; margin-top: 10px; }
    .sys-btn:hover { background: #14b8a6; color: #000; box-shadow: 0 0 15px rgba(20, 184, 166, 0.3); }
    .sys-btn-alt { border-color: #facc15; color: #facc15; }
    .sys-btn-alt:hover { background: #facc15; color: #000; box-shadow: 0 0 15px rgba(250, 204, 21, 0.3); }
    
    .grid-2col { display: grid; grid-template-columns: 250px 1fr; gap: 20px; margin-top: 20px; }
    .side-tab { display: block; width: 100%; text-align: left; padding: 12px; background: transparent; border: 1px solid #1f2937; color: #9ca3af; margin-bottom: 10px; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; }
    .side-tab.active { border-color: #14b8a6; color: #5eead4; background: rgba(20,184,166,0.1); }
    .data-panel { border: 1px solid #1f2937; padding: 20px; background: #0b1329; }
    
    .terminal-box { background: #030712; border: 1px solid #374151; height: 150px; overflow-y: auto; padding: 10px; font-size: 0.8rem; color: #9ca3af; margin-bottom: 10px; }
    .terminal-input-form { display: flex; gap: 10px; }
    .terminal-cmd { flex-grow: 1; background: transparent; border: none; border-bottom: 1px solid #14b8a6; color: #5eead4; font-family: inherit; font-size: 0.8rem; outline: none; }
    
    .topo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
    .topo-node { border: 1px solid #1f2937; padding: 25px 15px; text-align: center; color: #6b7280; font-size: 0.75rem; background: #030712; transition: all 0.3s; }
    .topo-node.active { border-color: #4ade80; color: #4ade80; background: rgba(74, 222, 128, 0.1); box-shadow: 0 0 15px rgba(74, 222, 128, 0.2); }
    
    .qml-slider { width: 100%; margin-top: 5px; accent-color: #14b8a6; }
    .qml-bar-bg { width: 100%; background: #1f2937; height: 12px; margin-top: 8px; overflow: hidden; }
  `;

    return (
        <div className="sys-container">
            <style>{injectedStyles}</style>
            <div className="sys-window">
                <div className="scan-line"></div>

                {['GATEWAY', 'HANDSHAKE', 'VERIFYING', 'GRANTED'].includes(appStage) && (
                    <div>
                        <h1 className="glitch-header">Civilization 2050 // Identity Gateway</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '30px' }}>CRYPTOGRAPHIC HANDSHAKE REQUIRED.</p>
                        {appStage === 'GATEWAY' && (
                            <form onSubmit={handleAuth}>
                                <input type="text" className="sys-input" value={nodeId} onChange={e => setNodeId(e.target.value)} spellCheck="false" />
                                <input type="password" className="sys-input" value={passkey} onChange={e => setPasskey(e.target.value)} placeholder="Enter clearance hash..." required />
                                <button type="submit" className="sys-btn">Initiate Handshake</button>
                            </form>
                        )}
                        {appStage !== 'GATEWAY' && (
                            <div style={{ marginTop: '20px' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Node Identity: {nodeId}</p>
                                {appStage === 'HANDSHAKE' && <p style={{ color: '#facc15', fontSize: '0.85rem' }}>{">"} Negotiating Quantum Keys...</p>}
                                {(appStage === 'VERIFYING' || appStage === 'GRANTED') && <p style={{ color: '#4ade80', fontSize: '0.85rem' }}>Verification complete. Level 4 Clearance.</p>}
                                {appStage === 'GRANTED' && <button onClick={() => setAppStage('VISUALIZER')} className="sys-btn" style={{ marginTop: '20px', borderColor: '#4ade80', color: '#4ade80' }}>Enter Network</button>}
                            </div>
                        )}
                    </div>
                )}

                {appStage === 'VISUALIZER' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px', marginBottom: '20px' }}>
                            <h1 className="glitch-header" style={{ margin: 0 }}>Global Node Network</h1>
                            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>AUTH: {nodeId}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {(Object.keys(NODE_DATA) as Array<keyof typeof NODE_DATA>).map((key) => (
                                <button key={key} onClick={() => setActiveNode(key)} className={`sys-btn ${activeNode === key ? '' : 'sys-btn-alt'}`} style={{ padding: '10px', fontSize: '0.8rem', opacity: activeNode === key ? 1 : 0.5 }}>
                                    {NODE_DATA[key].name}
                                </button>
                            ))}
                        </div>
                        <div className="data-panel" style={{ marginTop: '20px' }}>
                            <h2 style={{ color: '#f3f4f6', margin: '0 0 10px 0', fontSize: '1.2rem' }}>{NODE_DATA[activeNode].name}</h2>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '20px' }}>{NODE_DATA[activeNode].telemetry}</p>
                            <button onClick={() => setAppStage(NODE_DATA[activeNode].module)} className="sys-btn" style={{ backgroundColor: 'rgba(20,184,166,0.1)' }}>{NODE_DATA[activeNode].actionText}</button>
                        </div>
                    </div>
                )}

                {appStage === 'MATRIX' && (
                    <div>
                        <h1 className="glitch-header">5-Scale Multi-Twin Matrix</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Dynamic Quantum Simulation Streaming Live.</p>
                        <div className="grid-2col">
                            <div>
                                {['biological', 'genomic', 'neural', 'behavioral', 'environmental'].map(twin => (
                                    <button key={twin} onClick={() => setActiveTwin(twin)} className={`side-tab ${activeTwin === twin ? 'active' : ''}`}>{twin} Twin</button>
                                ))}
                            </div>
                            <div className="data-panel">
                                <h3 style={{ margin: '0 0 15px 0', color: '#5eead4', textTransform: 'uppercase' }}>{activeTwin} PARAMETERS</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px', marginBottom: '10px' }}>
                                    <span style={{ color: '#9ca3af' }}>Systemic Integrity / Coherence</span>
                                    <span style={{ color: metrics.primary > 95 ? '#4ade80' : '#facc15' }}>{metrics.primary.toFixed(2)}%</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px', marginBottom: '20px' }}>
                                    <span style={{ color: '#9ca3af' }}>Recursive Optimization Flow</span>
                                    <span style={{ color: '#5eead4' }}>{metrics.secondary.toFixed(1)} TFlops</span>
                                </div>
                                <div className="terminal-box">
                                    {terminalLogs.map((log, i) => <div key={i} style={{ marginBottom: '4px', color: log.startsWith('>') ? '#f3f4f6' : '#9ca3af' }}>{log}</div>)}
                                    <div ref={logEndRef} />
                                </div>
                                <form className="terminal-input-form" onSubmit={handleTerminalSubmit}>
                                    <span style={{ color: '#14b8a6', fontWeight: 'bold' }}>C:\&gt;</span>
                                    <input type="text" className="terminal-cmd" value={cmdInput} onChange={e => setCmdInput(e.target.value)} placeholder="Type 'analyze' or 'clear'..." spellCheck="false" />
                                </form>
                            </div>
                        </div>
                        <button onClick={() => setAppStage('VISUALIZER')} className="sys-btn sys-btn-alt">Return to Network</button>
                    </div>
                )}

                {appStage === 'QML' && (
                    <div>
                        <h1 className="glitch-header">Quantum Machine Learning Core</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Benchmarking Classical O(N) vs Quantum O(sqrt(N)) Complexity.</p>

                        <div className="data-panel" style={{ marginTop: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', justifyContent: 'space-between' }}>
                                        DATASET COMPLEXITY (N) <span style={{ color: '#5eead4' }}>{qmlDataset.toLocaleString()}</span>
                                    </label>
                                    <input type="range" min="1000" max="100000" step="1000" value={qmlDataset} onChange={e => setQmlDataset(Number(e.target.value))} className="qml-slider" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', justifyContent: 'space-between' }}>
                                        QPU NOISE LEVEL <span style={{ color: '#facc15' }}>{qmlNoise}%</span>
                                    </label>
                                    <input type="range" min="0" max="30" value={qmlNoise} onChange={e => setQmlNoise(Number(e.target.value))} className="qml-slider" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', justifyContent: 'space-between' }}>
                                        ERROR CORRECTION OVERHEAD <span style={{ color: '#facc15' }}>{qmlErrorCorrection}%</span>
                                    </label>
                                    <input type="range" min="0" max="50" value={qmlErrorCorrection} onChange={e => setQmlErrorCorrection(Number(e.target.value))} className="qml-slider" />
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: '#f3f4f6' }}>Classical GPU Compute Time</span>
                                        <span style={{ color: '#f3f4f6' }}>{classicalTimeMs.toFixed(1)} ms</span>
                                    </div>
                                    <div className="qml-bar-bg"><div style={{ width: `${cBarWidth}%`, height: '100%', background: '#facc15', transition: 'width 0.3s' }}></div></div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: '#f3f4f6' }}>Quantum Tensor Network Time</span>
                                        <span style={{ color: '#4ade80' }}>{quantumTimeMs.toFixed(1)} ms</span>
                                    </div>
                                    <div className="qml-bar-bg"><div style={{ width: `${qBarWidth}%`, height: '100%', background: '#4ade80', transition: 'width 0.3s' }}></div></div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', border: `1px solid ${Number(qmlAdvantage) > 0 ? '#4ade80' : '#facc15'}`, color: Number(qmlAdvantage) > 0 ? '#4ade80' : '#facc15' }}>
                                    {Number(qmlAdvantage) > 0 ? `QUANTUM ADVANTAGE ACHIEVED: +${qmlAdvantage}% FASTER` : 'CLASSICAL SYSTEMS CURRENTLY OPTIMAL'}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setAppStage('VISUALIZER')} className="sys-btn sys-btn-alt">Return to Network</button>
                    </div>
                )}

                {appStage === 'TOPOLOGY' && (
                    <div>
                        <h1 className="glitch-header">Network Topology Simulation</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Calculating optimal discrete math pathways for deep space routing.</p>
                        <div className="data-panel" style={{ marginTop: '20px' }}>
                            <div className="topo-grid">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className={`topo-node ${topoPath.includes(i) ? 'active' : ''}`}>
                                        NODE 0{i + 1}<br />
                                        <span style={{ color: topoPath.includes(i) ? '#4ade80' : '#374151', fontSize: '0.65rem' }}>
                                            {topoPath.includes(i) ? `LOCKED (STEP ${topoPath.indexOf(i) + 1})` : 'AWAITING CONNECTION'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                {calcStatus === 'IDLE' && <button onClick={runHamiltonianCircuit} className="sys-btn">Execute Hamiltonian Hunt</button>}
                                {calcStatus === 'CALCULATING' && <p style={{ color: '#facc15' }}>{">"} Mapping inclusion-exclusion variables... isolating nodes...</p>}
                                {calcStatus === 'SECURE' && <p style={{ color: '#4ade80', fontWeight: 'bold' }}>CIRCUIT SECURED. All nodes connected optimally.</p>}
                            </div>
                        </div>
                        <button onClick={() => { setAppStage('VISUALIZER'); setTopoPath([]); setCalcStatus('IDLE'); }} className="sys-btn sys-btn-alt">Return to Network</button>
                    </div>
                )}
            </div>
        </div>
    );
}