import React, { useState, useEffect } from 'react';

const DigitalHumanHologram = () => {
    const [telomere, setTelomere] = useState(20);
    const [crispr, setCrispr] = useState(10);
    const [isSyncing, setIsSyncing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsSyncing(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Calculate dynamic colors based on slider values
    const primaryColor = `rgb(${Math.floor(telomere * 2.5)}, ${Math.floor(255 - (crispr * 1.5))}, 255)`;
    const secondaryColor = `rgb(${Math.floor(crispr * 2.5)}, 255, ${Math.floor(255 - (telomere * 1.5))})`;

    return (
        <div style={{
            width: '100%', maxWidth: '900px', margin: '0 auto', padding: '24px', backgroundColor: '#030305',
            border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', fontFamily: '"Courier New", Courier, monospace',
            color: '#f3e8ff', boxShadow: '0 0 40px rgba(139, 92, 246, 0.1)', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
        }}>
            <style>{`
        @keyframes scanGlow { 0% { opacity: 0.5; filter: drop-shadow(0 0 5px ${primaryColor}); } 50% { opacity: 1; filter: drop-shadow(0 0 20px ${secondaryColor}); } 100% { opacity: 0.5; filter: drop-shadow(0 0 5px ${primaryColor}); } }
        @keyframes sweep { 0% { transform: translateY(-100%); } 100% { transform: translateY(400px); } }
      `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(139, 92, 246, 0.2)', paddingBottom: '16px', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#a855f7', margin: '0 0 4px 0' }}>QDH SIMULATION CORE</h2>
                    <p style={{ fontSize: '0.75rem', color: '#c084fc', letterSpacing: '2px', margin: 0 }}>SUBJECT-8924 | DIGITAL TWIN IN-VIVO</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#9333ea', marginBottom: '4px' }}>SYNC STATUS</div>
                    <div style={{ color: isSyncing ? '#f59e0b' : '#10b981', fontWeight: 'bold', letterSpacing: '1px' }}>
                        {isSyncing ? '[ESTABLISHING LINK...]' : '[BIOMETRICS LOCKED]'}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                {/* Hologram Display */}
                <div style={{ position: 'relative', height: '300px', backgroundColor: '#010103', border: '1px solid #2e1065', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#a855f7', opacity: 0.5, animation: 'sweep 3s linear infinite', zIndex: 10 }}></div>

                    <svg viewBox="0 0 200 300" style={{ width: '100%', height: '80%', animation: 'scanGlow 4s ease-in-out infinite', transition: 'all 0.3s ease' }}>
                        <defs>
                            <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={primaryColor} />
                                <stop offset="100%" stopColor={secondaryColor} />
                            </linearGradient>
                        </defs>
                        {/* Abstract DNA/Body Wireframe */}
                        <path d="M100 20 C130 50, 140 100, 100 150 C60 200, 70 250, 100 280 C130 250, 140 200, 100 150 C60 100, 70 50, 100 20 Z" fill="none" stroke="url(#holoGradient)" strokeWidth="2" strokeDasharray="4 2" />
                        <path d="M80 80 L120 120 M120 80 L80 120 M80 180 L120 220 M120 180 L80 220" stroke="url(#holoGradient)" strokeWidth="1" opacity="0.6" />
                        <circle cx="100" cy="150" r="40" fill="none" stroke={secondaryColor} strokeWidth="1" opacity="0.4" />
                        <circle cx="100" cy="150" r={crispr / 2 + 10} fill={primaryColor} opacity="0.2" />
                    </svg>

                    {/* Overlay Stats */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.65rem', color: primaryColor }}>
                        T-EXT: {telomere.toFixed(2)}%<br />
                        C-CAS: {crispr.toFixed(2)}%
                    </div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.65rem', color: secondaryColor, textAlign: 'right' }}>
                        CELLULAR DECAY: {(100 - telomere).toFixed(1)}%<br />
                        MUTATION RATE: {(crispr * 0.14).toFixed(3)}
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#c084fc', marginBottom: '10px', letterSpacing: '1px' }}>
                            <span>TELOMERASE REVERSE TRANSCRIPTASE (TERT)</span>
                            <span style={{ color: '#e9d5ff' }}>{telomere}%</span>
                        </label>
                        <input
                            type="range" min="0" max="100" value={telomere}
                            onChange={(e) => setTelomere(+e.target.value)}
                            style={{ width: '100%', height: '4px', appearance: 'none', background: '#2e1065', outline: 'none', borderRadius: '2px', cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: '0.65rem', color: '#6b21a8', marginTop: '6px' }}>Regulates cellular aging and chromosomal stability parameters.</p>
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#c084fc', marginBottom: '10px', letterSpacing: '1px' }}>
                            <span>CRISPR-CAS12 MULTIPLEX EDITING</span>
                            <span style={{ color: '#e9d5ff' }}>{crispr}%</span>
                        </label>
                        <input
                            type="range" min="0" max="100" value={crispr}
                            onChange={(e) => setCrispr(+e.target.value)}
                            style={{ width: '100%', height: '4px', appearance: 'none', background: '#2e1065', outline: 'none', borderRadius: '2px', cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: '0.65rem', color: '#6b21a8', marginTop: '6px' }}>Adjusts precision mapping for deep-tissue genomic anomaly correction.</p>
                    </div>

                    <div style={{ padding: '12px', backgroundColor: 'rgba(88, 28, 135, 0.2)', border: '1px solid #4c1d95', borderRadius: '6px', fontSize: '0.75rem', lineHeight: '1.5', color: '#d8b4fe' }}>
                        <strong>WARNING:</strong> Exceeding 85% on combined modification parameters may destabilize the quantum twin's molecular coherence lattice. Proceed with caution.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DigitalHumanHologram;