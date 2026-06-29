import React from 'react';

const SystemArchitectID = () => {
    return (
        <div style={{
            width: '100%', maxWidth: '600px', margin: '20px auto',
            backgroundColor: '#050505', borderRadius: '16px',
            padding: '4px', // Creates the glowing border effect
            background: 'linear-gradient(135deg, #00e5ff 0%, #050505 20%, #050505 80%, #b400ff 100%)',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
            fontFamily: '"Courier New", Courier, monospace',
            boxSizing: 'border-box',
            position: 'relative'
        }}>

            {/* Card Inner Background */}
            <div style={{
                backgroundColor: '#0a0a0f', borderRadius: '12px', padding: '30px',
                backgroundImage: 'linear-gradient(transparent 95%, rgba(0, 229, 255, 0.03) 95%)',
                backgroundSize: '100% 4px' // Scanline effect
            }}>

                {/* Header Ribbon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1f2937', paddingBottom: '16px', marginBottom: '24px' }}>
                    <div>
                        <div style={{ color: '#00e5ff', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>Security Clearance: Level 9</div>
                        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '4px' }}>SYSTEM ARCHITECT</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#b400ff', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>ACTIVE</div>
                        <div style={{ color: '#4b5563', fontSize: '0.6rem', letterSpacing: '1px' }}>SYS-VERIFIED</div>
                    </div>
                </div>

                {/* Main Profile Section */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
                    {/* Avatar/Bio Placeholder */}
                    <div style={{
                        width: '100px', height: '120px', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '6px',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.1) 50%, transparent 100%)', animation: 'scan 2s linear infinite' }}></div>
                        <span style={{ color: '#374151', fontSize: '2rem' }}>👤</span>
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <div style={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '2px' }}>OPERATIVE NAME</div>
                            <div style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: '2px' }}>LUBHANSHU SAINI</div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <div style={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '2px' }}>DESIGNATION</div>
                                <div style={{ color: '#00e5ff', fontSize: '0.9rem', fontWeight: 'bold' }}>B.TECH CSE</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '2px' }}>AFFILIATION</div>
                                <div style={{ color: '#b400ff', fontSize: '0.9rem', fontWeight: 'bold' }}>CHANDIGARH UNIVERSITY</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clearance ID & Barcode */}
                <div style={{ backgroundColor: '#030712', border: '1px solid #1f2937', padding: '16px', borderRadius: '6px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '2px', marginBottom: '4px' }}>SECURE IDENTIFIER</div>
                        <div style={{ color: '#10b981', fontSize: '1.4rem', letterSpacing: '3px' }}>25BCS10043</div>
                    </div>
                    {/* Fake Barcode Generator */}
                    <div style={{ display: 'flex', height: '30px', gap: '2px' }}>
                        {[3, 1, 4, 2, 6, 1, 3, 5, 2, 4, 1, 3].map((width, i) => (
                            <div key={i} style={{ width: `${width}px`, backgroundColor: '#4b5563', height: '100%' }}></div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Modules */}
                <div>
                    <div style={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '2px', marginBottom: '10px' }}>AUTHORIZED SYSTEM MODULES</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['C / C++', 'PYTHON', 'MICROSOFT AZURE', 'REACT', 'GENERATIVE AI'].map((tech, i) => (
                            <span key={i} style={{
                                padding: '6px 12px', backgroundColor: 'rgba(0, 229, 255, 0.05)',
                                border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00e5ff',
                                fontSize: '0.7rem', borderRadius: '4px', letterSpacing: '1px'
                            }}>
                                [{tech}]
                            </span>
                        ))}
                    </div>
                </div>

                <style>{`
          @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        `}</style>
            </div>
        </div>
    );
};

export default SystemArchitectID;