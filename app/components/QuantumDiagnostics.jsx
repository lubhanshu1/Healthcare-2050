import React, { useState, useEffect, useRef } from 'react';

const QuantumDiagnostics = () => {
    // Core Scanning States
    const [processingState, setProcessingState] = useState('IDLE');
    const [qubitStability, setQubitStability] = useState(100);
    const [coherenceTime, setCoherenceTime] = useState(0);
    const [diagnosticResults, setDiagnosticResults] = useState(null);

    // Feature 1: Waveform Animation State
    const [waveTime, setWaveTime] = useState(0);

    // Feature 2: Cryptographic Routing Terminal States
    const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM] Zero-Trust network routing standing by...']);
    const terminalEndRef = useRef(null);

    // Feature 3: Patient Ledger States
    const [scanLedger, setScanLedger] = useState([]);

    // Load ledger history from localStorage on mount
    useEffect(() => {
        const savedLedger = localStorage.getItem('quantum_scan_ledger');
        if (savedLedger) {
            setScanLedger(JSON.parse(savedLedger));
        }
    }, []);

    // Live Waveform Animation Loop
    useEffect(() => {
        let animationFrame;
        if (processingState === 'PROCESSING') {
            const updateWave = () => {
                setWaveTime((prev) => prev + 0.5);
                animationFrame = requestAnimationFrame(updateWave);
            };
            animationFrame = requestAnimationFrame(updateWave);
        } else {
            cancelAnimationFrame(animationFrame);
        }
        return () => cancelAnimationFrame(animationFrame);
    }, [processingState]);

    // Handle Terminal Auto-Scroll
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalLogs]);

    // Main Processing Engine Simulation
    useEffect(() => {
        let interval;
        let logTimeout1, logTimeout2, logTimeout3, logTimeout4;

        if (processingState === 'PROCESSING') {
            // Simulate telemetry updates
            interval = setInterval(() => {
                setQubitStability((prev) => Math.max(15, prev - (Math.random() * 4)));
                setCoherenceTime((prev) => prev + 14.8);
            }, 300);

            // Simulate Real-time Zero-Trust Routing Steps
            setTerminalLogs([
                '[SECURE] Initializing Zero-Trust Handshake protocol...',
                '[AUTH] Token verified via federated identity check.'
            ]);

            logTimeout1 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[NODE] Encrypted packet routed to edge node: 192.168.43.104']);
            }, 1000);

            logTimeout2 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[MATH] Running network inclusion-exclusion node validations...']);
            }, 2200);

            logTimeout3 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[CRYPT] SHA-256 Block Handshake generated: 0x7F9B...8CC1']);
            }, 3500);

            logTimeout4 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[SUCCESS] Decentralized cloud routing tunnel verified safely.']);
            }, 4400);

            // Finalize Scan
            setTimeout(() => {
                clearInterval(interval);
                setProcessingState('COMPLETE');
                setQubitStability(99.4);

                const finalResults = {
                    id: `QX-${Math.floor(100000 + Math.random() * 900000)}`,
                    timestamp: new Date().toLocaleTimeString(),
                    cellularDegradation: `${(Math.random() * 0.1).toFixed(3)}%`,
                    geneticAnomalies: 'None Detected',
                    predictiveLifespan: `+${(10 + Math.random() * 8).toFixed(1)} Years`,
                    recommendedNanotherapy: `Swarm Variant ${Math.floor(1 + Math.random() * 9)}-B`,
                };

                setDiagnosticResults(finalResults);

                // Update Ledger and save to LocalStorage
                setScanLedger((prev) => {
                    const updated = [finalResults, ...prev];
                    localStorage.setItem('quantum_scan_ledger', JSON.stringify(updated));
                    return updated;
                });

            }, 5000);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(logTimeout1);
            clearTimeout(logTimeout2);
            clearTimeout(logTimeout3);
            clearTimeout(logTimeout4);
        };
    }, [processingState]);

    const initiateScan = () => {
        setProcessingState('PROCESSING');
        setDiagnosticResults(null);
        setQubitStability(100);
        setCoherenceTime(0);
    };

    const clearLedger = () => {
        localStorage.removeItem('quantum_scan_ledger');
        setScanLedger([]);
    };

    // Generate SVG path coordinate strings for the Waveform
    const generateWavePath = () => {
        let points = [];
        const width = 300;
        const height = 80;
        const amplitude = processingState === 'PROCESSING' ? 22 : 0; // Collapses when complete or idle
        const frequency = processingState === 'PROCESSING' ? 0.15 : 0.05;

        for (let x = 0; x <= width; x += 5) {
            const y = (height / 2) + Math.sin(x * frequency + waveTime) * amplitude * Math.sin(x * 0.01);
            points.push(`${x},${y}`);
        }
        return `M ${points.join(' L ')}`;
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '900px',
            margin: '20px auto',
            padding: '24px',
            backgroundColor: '#050508',
            border: '1px solid rgba(6,182,212,0.3)',
            borderRadius: '16px',
            fontFamily: '"Courier New", Courier, monospace',
            color: '#cffafe',
            boxShadow: '0 0 40px rgba(6,182,212,0.1)',
            boxSizing: 'border-box'
        }}>

            <style>{`
        @keyframes pulseGlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes scanLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      `}</style>

            {/* Main Panel Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(6,182,212,0.2)', paddingBottom: '16px' }}>
                <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: '2px', color: '#22d3ee', margin: '0 0 4px 0' }}>QML DIAGNOSTICS COMPLEX</h2>
                    <p style={{ fontSize: '0.75rem', color: '#0891b2', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Integrated Network Security & Telemetry Engine</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#0e7490', marginBottom: '4px' }}>CORE MONITOR</div>
                    <div style={{
                        fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px',
                        color: processingState === 'PROCESSING' ? '#f59e0b' : processingState === 'COMPLETE' ? '#10b981' : '#06b6d4',
                        animation: processingState === 'PROCESSING' ? 'pulseGlow 1.5s infinite' : 'none'
                    }}>
                        [{processingState}]
                    </div>
                </div>
            </div>

            {/* Upper Layout Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>

                {/* Telemetry Configuration Node */}
                <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px' }}>
                    <h3 style={{ fontSize: '0.85rem', color: '#06b6d4', borderBottom: '1px solid rgba(6,182,212,0.15)', paddingBottom: '8px', margin: '0 0 16px 0', letterSpacing: '1px' }}>SYSTEM TELEMETRY</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                                <span>Qubit Entanglement Stability</span>
                                <span style={{ color: '#22d3ee', fontWeight: 'bold' }}>{qubitStability.toFixed(1)}%</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#111827', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                                <div style={{
                                    backgroundColor: qubitStability > 50 ? '#06b6d4' : '#ef4444',
                                    height: '100%',
                                    transition: 'width 0.2s ease, background-color 0.3s',
                                    width: `${qubitStability}%`
                                }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid #111827', paddingTop: '10px' }}>
                            <span>Coherence Matrix Bound (μs)</span>
                            <span style={{ color: '#a855f7', fontWeight: 'bold' }}>{coherenceTime.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                {/* Predictive Metrics & Superposition Waveform View */}
                <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ fontSize: '0.85rem', color: '#06b6d4', borderBottom: '1px solid rgba(6,182,212,0.15)', paddingBottom: '8px', margin: '0 0 12px 0', letterSpacing: '1px' }}>SUPERPOSITION WAVE & RESULTS</h3>

                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                        {/* Live SVG Waveform */}
                        <svg width="100%" height="70" viewBox="0 0 300 70" style={{ marginBottom: '12px' }}>
                            <path
                                d={generateWavePath()}
                                fill="none"
                                stroke={processingState === 'PROCESSING' ? '#22d3ee' : processingState === 'COMPLETE' ? '#10b981' : '#1e293b'}
                                strokeWidth="2"
                                style={{ transition: 'stroke 0.5s ease' }}
                            />
                        </svg>

                        {processingState === 'IDLE' && (
                            <span style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '1px' }}>AWAITING BIOLOGICAL FEED...</span>
                        )}

                        {processingState === 'PROCESSING' && (
                            <span style={{ color: '#06b6d4', fontSize: '0.7rem', letterSpacing: '1px', animation: 'pulseGlow 1s infinite' }}>COLLAPSING WAVE FUNCTIONS...</span>
                        )}

                        {processingState === 'COMPLETE' && diagnosticResults && (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>SIG-ID:</span> <span style={{ color: '#38bdf8' }}>{diagnosticResults.id}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>Degradation:</span> <span style={{ color: '#10b981' }}>{diagnosticResults.cellularDegradation}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>Projection:</span> <span style={{ color: '#22d3ee' }}>{diagnosticResults.predictiveLifespan}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Protocol:</span> <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{diagnosticResults.recommendedNanotherapy}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Control Execution Trigger */}
            <button
                onClick={initiateScan}
                disabled={processingState === 'PROCESSING'}
                style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    letterSpacing: '3px',
                    fontFamily: '"Courier New", Courier, monospace',
                    transition: 'all 0.2s ease',
                    cursor: processingState === 'PROCESSING' ? 'not-allowed' : 'pointer',
                    backgroundColor: processingState === 'PROCESSING' ? 'rgba(15,23,42,0.6)' : '#083344',
                    color: processingState === 'PROCESSING' ? '#0891b2' : '#22d3ee',
                    border: processingState === 'PROCESSING' ? '1px solid #164e63' : '1px solid #06b6d4',
                    boxShadow: processingState === 'PROCESSING' ? 'none' : '0 0 15px rgba(6,182,212,0.15)',
                    marginBottom: '20px'
                }}
                onMouseEnter={(e) => {
                    if (processingState !== 'PROCESSING') {
                        e.currentTarget.style.backgroundColor = '#0e7490';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(34,211,238,0.35)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (processingState !== 'PROCESSING') {
                        e.currentTarget.style.backgroundColor = '#083344';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(6,182,212,0.15)';
                    }
                }}
            >
                {processingState === 'PROCESSING' ? 'COMPUTING MOLECULAR METRICS...' : 'EXECUTE QUANTUM DIAGNOSTIC'}
            </button>

            {/* Cryptographic Zero-Trust Routing Terminal Console */}
            <div style={{
                backgroundColor: '#020204',
                border: '1px solid rgba(168,85,247,0.25)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#a855f7', borderBottom: '1px solid rgba(168,85,247,0.2)', paddingBottom: '6px', marginBottom: '8px', letterSpacing: '1px' }}>
                    <span>SECURE CRYPTO-ROUTING GATEWAY</span>
                    <span>ZERO-TRUST MONITOR v1.0.4</span>
                </div>
                <div style={{
                    height: '85px',
                    overflowY: 'auto',
                    fontSize: '0.72rem',
                    color: '#c084fc',
                    lineHeight: '1.4',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    {terminalLogs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                    <div ref={terminalEndRef} />
                </div>
            </div>

            {/* Persistent Patient Scan History Ledger */}
            <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(16,185,129,0.2)', paddingBottom: '8px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '0.85rem', color: '#10b981', letterSpacing: '1px', margin: 0 }}>PERSISTENT DIAGNOSTIC LEDGER</h3>
                    {scanLedger.length > 0 && (
                        <button
                            onClick={clearLedger}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                fontSize: '0.68rem',
                                cursor: 'pointer',
                                fontFamily: '"Courier New", Courier, monospace',
                                letterSpacing: '1px'
                            }}
                        >
                            [CLEAR LOGS]
                        </button>
                    )}
                </div>

                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {scanLedger.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', padding: '16px 0' }}>
                            No localized history records found in browser state storage.
                        </div>
                    ) : (
                        scanLedger.map((record, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                                gap: '8px',
                                padding: '8px',
                                backgroundColor: '#040407',
                                border: '1px solid #111827',
                                borderRadius: '6px',
                                fontSize: '0.7rem'
                            }}>
                                <div><span style={{ color: '#10b981' }}>ID:</span> {record.id}</div>
                                <div><span style={{ color: '#64748b' }}>TIME:</span> {record.timestamp}</div>
                                <div><span style={{ color: '#64748b' }}>DEG:</span> {record.cellularDegradation}</div>
                                <div><span style={{ color: '#22d3ee' }}>SPAN:</span> {record.predictiveLifespan}</div>
                                <div style={{ textAlign: 'right', color: '#f59e0b' }}>{record.recommendedNanotherapy}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default QuantumDiagnostics;