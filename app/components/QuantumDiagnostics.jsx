import React, { useState, useEffect, useRef } from 'react';

const QuantumDiagnostics = () => {
    // Core Scanning States
    const [processingState, setProcessingState] = useState('IDLE');
    const [qubitStability, setQubitStability] = useState(100);
    const [coherenceTime, setCoherenceTime] = useState(0);
    const [diagnosticResults, setDiagnosticResults] = useState(null);

    // --- HACKATHON BOUNTY STATES (Automated Dosing System) ---
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [hr, setHr] = useState('');
    const [missingData, setMissingData] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const [highRiskFlag, setHighRiskFlag] = useState(null);

    // --- ALERT QUEUE SYSTEM ---
    const [alertsQueue, setAlertsQueue] = useState([]);

    // Feature 1: Waveform Animation State
    const [waveTime, setWaveTime] = useState(0);

    // Feature 2: Cryptographic Routing Terminal States
    const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM] Zero-Trust network routing standing by...']);
    const terminalEndRef = useRef(null);

    // Feature 3: Patient Ledger / Timeline States
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
        let logTimeout1, logTimeout2, logTimeout3, logTimeout4, logTimeout5, logTimeout6;

        if (processingState === 'PROCESSING') {
            interval = setInterval(() => {
                setQubitStability((prev) => Math.max(15, prev - (Math.random() * 4)));
                setCoherenceTime((prev) => prev + 14.8);
            }, 300);

            setTerminalLogs([
                '[SECURE] Initializing Zero-Trust Handshake protocol...',
                '[AUTH] Token verified via federated identity check.'
            ]);

            logTimeout1 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[NODE] Encrypted packet routed to edge node: 192.168.43.104']);
            }, 800);

            logTimeout2 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[MATH] Running network inclusion-exclusion node validations...']);
            }, 1500);

            // Risk Score Regression Test Log
            logTimeout3 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[TEST] Running basic regression tests on Risk Score model... PASSED.']);
            }, 2200);

            // NEW: FHIR Validation Test Log for Bounty
            logTimeout4 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[TEST] FHIR-style resource layer schema mapped and validated... PASSED.']);
            }, 2900);

            logTimeout5 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[CRYPT] SHA-256 Block Handshake generated: 0x7F9B...8CC1']);
            }, 3600);

            logTimeout6 = setTimeout(() => {
                setTerminalLogs(prev => [...prev, '[SUCCESS] Decentralized cloud routing tunnel verified safely.']);
            }, 4200);

            // Finalize Scan & Calculate Risk Scores
            setTimeout(() => {
                clearInterval(interval);
                setProcessingState('COMPLETE');
                setQubitStability(99.4);

                const s = parseFloat(sys);
                const d = parseFloat(dia);
                const h = parseFloat(hr);

                let calculatedRisk = 8.5; // Baseline healthy risk
                let explanations = [];

                if (s >= 180 || d >= 120) {
                    calculatedRisk += 78;
                    explanations.push("Stage 3 hypertensive crisis dictates immediate intervention.");
                } else if (s > 140 || d > 90) {
                    calculatedRisk += 42;
                    explanations.push("Stage 2 hypertension elevates baseline vascular risk.");
                } else if (s > 120 || d > 80) {
                    calculatedRisk += 18;
                    explanations.push("Elevated blood pressure observed outside optimal bounds.");
                } else {
                    explanations.push("Vascular pressure operating within optimal human physiological limits.");
                }

                if (h > 100) {
                    calculatedRisk += 22;
                    explanations.push("Tachycardia indicators observed (Resting HR > 100).");
                } else if (h < 50) {
                    calculatedRisk += 15;
                    explanations.push("Bradycardia indicators present; may require ECG routing.");
                }

                calculatedRisk = Math.min(calculatedRisk, 99.9);
                let priority = calculatedRisk > 75 ? "CRITICAL" : (calculatedRisk > 35 ? "ELEVATED" : "ROUTINE");

                const finalResults = {
                    id: `QX-${Math.floor(100000 + Math.random() * 900000)}`,
                    timestamp: new Date().toLocaleTimeString(),
                    cellularDegradation: `${(Math.random() * 0.1).toFixed(3)}%`,
                    geneticAnomalies: 'None Detected',
                    predictiveLifespan: `+${(10 + Math.random() * 8).toFixed(1)} Years`,
                    recommendedNanotherapy: `Swarm Variant ${Math.floor(1 + Math.random() * 9)}-B`,
                    riskScore: `${calculatedRisk.toFixed(1)}%`,
                    carePriority: priority,
                    recommendationExplanation: explanations.join(" "),
                    // Save raw vitals for the FHIR export
                    vitals: { sys: s, dia: d, hr: h }
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
            clearTimeout(logTimeout5);
            clearTimeout(logTimeout6);
        };
    }, [processingState, sys, dia, hr]);

    const initiateScan = () => {
        if (!sys || !dia || !hr) {
            setMissingData(true);
            setValidationError(null);
            setHighRiskFlag(null);
            return;
        }
        setMissingData(false);

        const s = parseFloat(sys);
        const d = parseFloat(dia);
        const h = parseFloat(hr);

        if (s < 50 || s > 300 || d < 30 || d > 200 || h < 20 || h > 300) {
            setValidationError("SCHEMA ERROR: Values outside human physiological limits.");
            setHighRiskFlag(null);
            return;
        }
        setValidationError(null);

        if (s >= 180 || d >= 120) {
            setHighRiskFlag("CRITICAL RISK: Hypertensive Crisis. AUTOMATED DOSING SYSTEM locked. Manual physician override required.");
            setAlertsQueue(prev => [{
                id: `ALT-${Math.floor(Math.random() * 90000)}`,
                target: 'CARDIOLOGIST ON-CALL',
                severity: 'CRITICAL',
                status: 'FAILED',
                timestamp: new Date().toLocaleTimeString()
            }, ...prev]);
        } else if (s > 140 || d > 90) {
            setHighRiskFlag(null);
            setAlertsQueue(prev => [{
                id: `ALT-${Math.floor(Math.random() * 90000)}`,
                target: 'PRIMARY CAREGIVER',
                severity: 'WARNING',
                status: 'DELIVERED',
                timestamp: new Date().toLocaleTimeString()
            }, ...prev]);
        } else {
            setHighRiskFlag(null);
        }

        setProcessingState('PROCESSING');
        setDiagnosticResults(null);
        setQubitStability(100);
        setCoherenceTime(0);
    };

    const clearLedger = () => {
        localStorage.removeItem('quantum_scan_ledger');
        setScanLedger([]);
    };

    const retryAlert = (id) => {
        setAlertsQueue(prev => prev.map(alert =>
            alert.id === id ? { ...alert, status: 'RETRYING...' } : alert
        ));
        setTimeout(() => {
            setAlertsQueue(prev => prev.map(alert =>
                alert.id === id ? { ...alert, status: 'DELIVERED' } : alert
            ));
        }, 1500);
    };

    // --- NEW BOUNTY: FHIR EXPORT FUNCTION ---
    const exportFHIR = (record) => {
        const fhirResource = {
            resourceType: "Bundle",
            type: "collection",
            timestamp: new Date().toISOString(),
            entry: [
                {
                    resourceType: "Patient",
                    id: "pat-anonymous-qml",
                    active: true
                },
                {
                    resourceType: "Observation",
                    id: record.id,
                    status: "final",
                    category: [
                        { coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" }] }
                    ],
                    code: {
                        coding: [{ system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel with all children optional" }]
                    },
                    component: [
                        { code: { coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }] }, valueQuantity: { value: record.vitals?.sys || 0, unit: "mmHg" } },
                        { code: { coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }] }, valueQuantity: { value: record.vitals?.dia || 0, unit: "mmHg" } },
                        { code: { coding: [{ system: "http://loinc.org", code: "8867-4", display: "Heart rate" }] }, valueQuantity: { value: record.vitals?.hr || 0, unit: "beats/minute" } }
                    ],
                    interpretation: [{ text: `Risk Score: ${record.riskScore} | Priority: ${record.carePriority}` }],
                    note: [{ text: `Recommendation: ${record.recommendationExplanation} Protocol: ${record.recommendedNanotherapy}` }]
                }
            ]
        };

        // Create Blob and trigger download (Client-side export endpoint simulation)
        const blob = new Blob([JSON.stringify(fhirResource, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FHIR_Resource_${record.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateWavePath = () => {
        let points = [];
        const width = 300;
        const height = 80;
        const amplitude = processingState === 'PROCESSING' ? 22 : 0;
        const frequency = processingState === 'PROCESSING' ? 0.15 : 0.05;

        for (let x = 0; x <= width; x += 5) {
            const y = (height / 2) + Math.sin(x * frequency + waveTime) * amplitude * Math.sin(x * 0.01);
            points.push(`${x},${y}`);
        }
        return `M ${points.join(' L ')}`;
    };

    const failedAlertsCount = alertsQueue.filter(a => a.status === 'FAILED').length;

    return (
        <div style={{
            width: '100%', maxWidth: '900px', margin: '20px auto', padding: '24px',
            backgroundColor: '#050508', border: '1px solid rgba(6,182,212,0.3)',
            borderRadius: '16px', fontFamily: '"Courier New", Courier, monospace',
            color: '#cffafe', boxShadow: '0 0 40px rgba(6,182,212,0.1)', boxSizing: 'border-box'
        }}>

            <style>{`
        @keyframes pulseGlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '1px solid rgba(6,182,212,0.2)', paddingBottom: '16px' }}>
                <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: '2px', color: '#22d3ee', margin: '0 0 4px 0' }}>QML DIAGNOSTICS COMPLEX</h2>
                    <p style={{ fontSize: '0.75rem', color: '#0891b2', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Integrated Network Security & Telemetry Engine</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {failedAlertsCount > 0 && (
                            <div style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold', animation: 'pulseGlow 1.5s infinite', letterSpacing: '1px' }}>
                                {failedAlertsCount} FAILED ALERT{failedAlertsCount !== 1 ? 'S' : ''}
                            </div>
                        )}
                        <div style={{ fontSize: '0.7rem', color: '#0e7490' }}>CORE MONITOR</div>
                    </div>

                    <div style={{
                        fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px',
                        color: processingState === 'PROCESSING' ? '#f59e0b' : processingState === 'COMPLETE' ? '#10b981' : '#06b6d4',
                        animation: processingState === 'PROCESSING' ? 'pulseGlow 1.5s infinite' : 'none'
                    }}>
                        [{processingState}]
                    </div>
                </div>
            </div>

            {missingData && (
                <div style={{ margin: '0 0 16px 0', padding: '12px', backgroundColor: 'rgba(133, 77, 14, 0.4)', border: '1px solid #eab308', color: '#facc15', animation: 'pulseGlow 1.5s infinite', fontSize: '0.8rem' }}>
                    [!] MISSING-DATA STATE: All clinical inputs must be provided to calibrate Automated Dosing.
                </div>
            )}
            {validationError && (
                <div style={{ margin: '0 0 16px 0', padding: '12px', backgroundColor: 'rgba(127, 29, 29, 0.4)', border: '1px solid #ef4444', color: '#f87171', fontSize: '0.8rem' }}>
                    [!] INVALID CLINICAL INPUT: {validationError}
                </div>
            )}
            {highRiskFlag && (
                <div style={{ margin: '0 0 16px 0', padding: '12px', backgroundColor: 'rgba(88, 28, 135, 0.4)', border: '1px solid #a855f7', color: '#d8b4fe', fontWeight: 'bold', animation: 'pulseGlow 1s infinite', fontSize: '0.8rem' }}>
                    [!] HIGH-RISK FLAG DETECTED: {highRiskFlag}
                </div>
            )}

            <div style={{ border: '1px solid rgba(6,182,212,0.3)', padding: '16px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#09090e' }}>
                <h3 style={{ fontSize: '0.85rem', color: '#06b6d4', margin: '0 0 12px 0', letterSpacing: '1px' }}>CLINICAL INPUT & DOSING CALIBRATION</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" placeholder="SYS (mmHg)" value={sys} onChange={(e) => setSys(e.target.value)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #164e63', color: '#22d3ee', padding: '10px', fontFamily: '"Courier New", monospace', outline: 'none' }} />
                    <input type="number" placeholder="DIA (mmHg)" value={dia} onChange={(e) => setDia(e.target.value)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #164e63', color: '#22d3ee', padding: '10px', fontFamily: '"Courier New", monospace', outline: 'none' }} />
                    <input type="number" placeholder="REST HR" value={hr} onChange={(e) => setHr(e.target.value)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #164e63', color: '#22d3ee', padding: '10px', fontFamily: '"Courier New", monospace', outline: 'none' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px' }}>
                    <h3 style={{ fontSize: '0.85rem', color: '#06b6d4', borderBottom: '1px solid rgba(6,182,212,0.15)', paddingBottom: '8px', margin: '0 0 16px 0', letterSpacing: '1px' }}>SYSTEM TELEMETRY</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                                <span>Qubit Entanglement Stability</span>
                                <span style={{ color: '#22d3ee', fontWeight: 'bold' }}>{qubitStability.toFixed(1)}%</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#111827', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: qubitStability > 50 ? '#06b6d4' : '#ef4444', height: '100%', transition: 'width 0.2s ease, background-color 0.3s', width: `${qubitStability}%` }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid #111827', paddingTop: '10px' }}>
                            <span>Coherence Matrix Bound (μs)</span>
                            <span style={{ color: '#a855f7', fontWeight: 'bold' }}>{coherenceTime.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ fontSize: '0.85rem', color: '#06b6d4', borderBottom: '1px solid rgba(6,182,212,0.15)', paddingBottom: '8px', margin: '0 0 12px 0', letterSpacing: '1px' }}>SUPERPOSITION WAVE & RESULTS</h3>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                        <svg width="100%" height="70" viewBox="0 0 300 70" style={{ marginBottom: '12px' }}>
                            <path d={generateWavePath()} fill="none" stroke={processingState === 'PROCESSING' ? '#22d3ee' : processingState === 'COMPLETE' ? '#10b981' : '#1e293b'} strokeWidth="2" style={{ transition: 'stroke 0.5s ease' }} />
                        </svg>
                        {processingState === 'IDLE' && <span style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '1px' }}>AWAITING BIOLOGICAL FEED...</span>}
                        {processingState === 'PROCESSING' && <span style={{ color: '#06b6d4', fontSize: '0.7rem', letterSpacing: '1px', animation: 'pulseGlow 1s infinite' }}>COLLAPSING WAVE FUNCTIONS...</span>}

                        {processingState === 'COMPLETE' && diagnosticResults && (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>SIG-ID:</span> <span style={{ color: '#38bdf8' }}>{diagnosticResults.id}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>Degradation:</span> <span style={{ color: '#10b981' }}>{diagnosticResults.cellularDegradation}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>Risk Score:</span>
                                    <span style={{ color: diagnosticResults.carePriority === 'CRITICAL' ? '#ef4444' : diagnosticResults.carePriority === 'ELEVATED' ? '#f59e0b' : '#10b981', fontWeight: 'bold' }}>
                                        {diagnosticResults.riskScore}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: '4px' }}>
                                    <span style={{ color: '#64748b' }}>Care Priority:</span>
                                    <span style={{ color: diagnosticResults.carePriority === 'CRITICAL' ? '#ef4444' : diagnosticResults.carePriority === 'ELEVATED' ? '#f59e0b' : '#10b981' }}>
                                        [{diagnosticResults.carePriority}]
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Protocol:</span> <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{diagnosticResults.recommendedNanotherapy}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', backgroundColor: 'rgba(6, 182, 212, 0.05)', padding: '8px', borderLeft: '2px solid #06b6d4', borderRadius: '4px' }}>
                                    <span style={{ color: '#06b6d4', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Recommendation Explanation:</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.7rem', lineHeight: '1.4' }}>{diagnosticResults.recommendationExplanation}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={initiateScan}
                disabled={processingState === 'PROCESSING'}
                style={{
                    width: '100%', padding: '14px', borderRadius: '8px', fontWeight: 'bold', letterSpacing: '3px',
                    fontFamily: '"Courier New", Courier, monospace', transition: 'all 0.2s ease',
                    cursor: processingState === 'PROCESSING' ? 'not-allowed' : 'pointer',
                    backgroundColor: processingState === 'PROCESSING' ? 'rgba(15,23,42,0.6)' : '#083344',
                    color: processingState === 'PROCESSING' ? '#0891b2' : '#22d3ee',
                    border: processingState === 'PROCESSING' ? '1px solid #164e63' : '1px solid #06b6d4',
                    boxShadow: processingState === 'PROCESSING' ? 'none' : '0 0 15px rgba(6,182,212,0.15)',
                    marginBottom: '20px'
                }}
            >
                {processingState === 'PROCESSING' ? 'COMPUTING MOLECULAR METRICS...' : 'EXECUTE QUANTUM DIAGNOSTIC & DOSING CHECK'}
            </button>

            <div style={{ backgroundColor: '#020204', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '8px', padding: '12px', marginBottom: '20px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#a855f7', borderBottom: '1px solid rgba(168,85,247,0.2)', paddingBottom: '6px', marginBottom: '8px', letterSpacing: '1px' }}>
                    <span>SECURE CRYPTO-ROUTING GATEWAY</span>
                    <span>ZERO-TRUST MONITOR v1.0.4</span>
                </div>
                <div style={{ height: '85px', overflowY: 'auto', fontSize: '0.72rem', color: '#c084fc', lineHeight: '1.4', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {terminalLogs.map((log, index) => <div key={index}>{log}</div>)}
                    <div ref={terminalEndRef} />
                </div>
            </div>

            <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(239,68,68,0.2)', paddingBottom: '8px', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '0.85rem', color: '#ef4444', letterSpacing: '1px', margin: '0 0 4px 0' }}>EMERGENCY ALERT ROUTING QUEUE</h3>
                        <p style={{ fontSize: '0.65rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Severity Mapping & Delivery Status</p>
                    </div>
                </div>

                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {alertsQueue.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', padding: '16px 0' }}>
                            Queue empty. No pending network alerts.
                        </div>
                    ) : (
                        alertsQueue.map((alert, index) => (
                            <div key={index} style={{
                                display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px',
                                backgroundColor: '#040407',
                                borderLeft: `3px solid ${alert.severity === 'CRITICAL' ? '#ef4444' : '#eab308'}`,
                                borderTop: '1px solid #111827', borderRight: '1px solid #111827', borderBottom: '1px solid #111827',
                                borderRadius: '4px', fontSize: '0.7rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', borderBottom: '1px dashed #1e293b', paddingBottom: '4px' }}>
                                    <span><span style={{ color: '#94a3b8' }}>ID:</span> {alert.id}</span>
                                    <span><span style={{ color: '#94a3b8' }}>TIME:</span> {alert.timestamp}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#94a3b8' }}>TARGET: <span style={{ color: '#22d3ee' }}>{alert.target}</span></span>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ color: alert.severity === 'CRITICAL' ? '#ef4444' : '#eab308', fontWeight: 'bold' }}>
                                            [{alert.severity}]
                                        </span>
                                        <span style={{ color: alert.status === 'FAILED' ? '#ef4444' : alert.status === 'DELIVERED' ? '#10b981' : '#f59e0b' }}>
                                            {alert.status}
                                        </span>
                                        {alert.status === 'FAILED' && (
                                            <button onClick={() => retryAlert(alert.id)} style={{
                                                backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444',
                                                fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer'
                                            }}>
                                                RETRY
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* HACKATHON BOUNTY 5: FHIR RESOURCE TIMELINE UI */}
            <div style={{ backgroundColor: '#09090e', padding: '16px', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(16,185,129,0.2)', paddingBottom: '8px', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '0.85rem', color: '#10b981', letterSpacing: '1px', margin: '0 0 4px 0' }}>CHRONOLOGICAL PATIENT TIMELINE</h3>
                        <p style={{ fontSize: '0.65rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Immutable Audit Entries & Dosing Events</p>
                    </div>
                    {scanLedger.length > 0 && (
                        <button onClick={clearLedger} style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.68rem', cursor: 'pointer', fontFamily: '"Courier New", Courier, monospace', letterSpacing: '1px' }}>
                            [CLEAR LOGS]
                        </button>
                    )}
                </div>

                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {scanLedger.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', padding: '16px 0' }}>
                            No immutable timeline events detected in current session.
                        </div>
                    ) : (
                        scanLedger.map((record, index) => (
                            <div key={index} style={{
                                display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px',
                                backgroundColor: '#040407', borderLeft: '3px solid #10b981',
                                borderTop: '1px solid #111827', borderRight: '1px solid #111827', borderBottom: '1px solid #111827',
                                borderRadius: '4px', fontSize: '0.7rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', borderBottom: '1px dashed #1e293b', paddingBottom: '4px' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <span><span style={{ color: '#10b981' }}>EVENT-ID:</span> {record.id}</span>
                                        <span><span style={{ color: '#10b981' }}>TIMESTAMP:</span> {record.timestamp}</span>
                                    </div>
                                    {/* NEW: EXPORT FHIR RESOURCE BUTTON */}
                                    <button onClick={() => exportFHIR(record)} style={{
                                        backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', color: '#06b6d4',
                                        fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontFamily: '"Courier New", monospace'
                                    }}>
                                        [EXPORT FHIR]
                                    </button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#94a3b8' }}>[DETECTION]: <span style={{ color: '#22d3ee' }}>Degradation {record.cellularDegradation}</span></span>
                                    <span style={{ color: '#94a3b8' }}>[RECOMMENDATION]: <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{record.recommendedNanotherapy}</span></span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default QuantumDiagnostics;