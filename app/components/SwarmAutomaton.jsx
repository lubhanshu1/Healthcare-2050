import React, { useRef, useEffect, useState } from 'react';

const SwarmAutomaton = () => {
    const canvasRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [metrics, setMetrics] = useState({ pathogens: 0, nanobots: 0 });

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resolution = 5;
        const cols = Math.floor(canvas.width / resolution);
        const rows = Math.floor(canvas.height / resolution);

        // Grid states: 0 = Empty, 1 = Pathogen (Red), 2 = Nanobot (Teal)
        let grid = Array(cols).fill(null).map(() =>
            Array(rows).fill(null).map(() => (Math.random() > 0.95 ? 1 : 0))
        );

        let animationId;
        const updateGrid = () => {
            let next = grid.map(arr => [...arr]);
            let pCount = 0;
            let nCount = 0;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let state = grid[i][j];
                    let neighbors = { pathogens: 0, nanobots: 0 };

                    // Count neighbors
                    for (let x = -1; x < 2; x++) {
                        for (let y = -1; y < 2; y++) {
                            if (x === 0 && y === 0) continue;
                            let col = (i + x + cols) % cols;
                            let row = (j + y + rows) % rows;
                            if (grid[col][row] === 1) neighbors.pathogens++;
                            else if (grid[col][row] === 2) neighbors.nanobots++;
                        }
                    }

                    // Cellular Automaton Rules
                    if (state === 0 && neighbors.pathogens === 3 && neighbors.nanobots === 0) {
                        next[i][j] = 1; // Pathogen spreads
                    } else if (state === 1 && neighbors.nanobots > 0) {
                        next[i][j] = 2; // Nanobot consumes pathogen and replicates
                    } else if (state === 2 && neighbors.pathogens === 0 && neighbors.nanobots > 3) {
                        next[i][j] = 0; // Nanobot decays due to overpopulation/lack of targets
                    } else if (state === 1 && (neighbors.pathogens < 2 || neighbors.pathogens > 4)) {
                        next[i][j] = 0; // Pathogen dies of isolation or overpopulation
                    }

                    // Track metrics
                    if (next[i][j] === 1) pCount++;
                    if (next[i][j] === 2) nCount++;

                    // Draw
                    ctx.fillStyle = next[i][j] === 1 ? '#e11d48' : next[i][j] === 2 ? '#0d9488' : '#050508';
                    ctx.fillRect(i * resolution, j * resolution, resolution - 1, resolution - 1);
                }
            }

            grid = next;
            setMetrics({ pathogens: pCount, nanobots: nCount });
            animationId = requestAnimationFrame(() => setTimeout(updateGrid, 100)); // Throttle speed
        };

        updateGrid();
        return () => cancelAnimationFrame(animationId);
    }, [isActive]);

    const deployNanobots = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resolution = 5;

        // Inject nanobots directly into the center
        const centerX = Math.floor((canvas.width / resolution) / 2);
        const centerY = Math.floor((canvas.height / resolution) / 2);

        ctx.fillStyle = '#0d9488';
        for (let i = -5; i < 5; i++) {
            for (let j = -5; j < 5; j++) {
                ctx.fillRect((centerX + i) * resolution, (centerY + j) * resolution, resolution - 1, resolution - 1);
            }
        }
    };

    return (
        <div style={{
            width: '100%', maxWidth: '900px', margin: '20px auto', padding: '24px', backgroundColor: '#050508',
            border: '1px solid rgba(225,29,72,0.3)', borderRadius: '16px', fontFamily: '"Courier New", Courier, monospace',
            color: '#ffe4e6', boxShadow: '0 0 40px rgba(225,29,72,0.1)', boxSizing: 'border-box'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(225,29,72,0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#f43f5e', margin: '0 0 4px 0' }}>SWARM PROTOCOL: FOKKER-PLANCK</h2>
                    <p style={{ fontSize: '0.75rem', color: '#be123c', letterSpacing: '2px', margin: 0 }}>LIVE CELLULAR AUTOMATON</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                    <div style={{ color: '#e11d48' }}>PATHOGENS: {metrics.pathogens}</div>
                    <div style={{ color: '#14b8a6' }}>NANOBOTS: {metrics.nanobots}</div>
                </div>
            </div>

            <div style={{ backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                <canvas ref={canvasRef} width={850} height={250} style={{ display: 'block', width: '100%', backgroundColor: '#050508' }} />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setIsActive(!isActive)} style={{ flex: 1, padding: '12px', backgroundColor: isActive ? 'rgba(225,29,72,0.2)' : '#881337', color: isActive ? '#f43f5e' : '#fff', border: '1px solid #be123c', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}>
                    {isActive ? 'HALT SIMULATION' : 'INITIALIZE PATHOGEN ENVIRONMENT'}
                </button>
                <button onClick={deployNanobots} disabled={!isActive} style={{ flex: 1, padding: '12px', backgroundColor: isActive ? '#0f766e' : 'rgba(15,118,110,0.2)', color: isActive ? '#fff' : '#14b8a6', border: '1px solid #0d9488', borderRadius: '6px', cursor: isActive ? 'pointer' : 'not-allowed', fontWeight: 'bold', letterSpacing: '1px' }}>
                    INJECT NANOBOT SWARM
                </button>
            </div>
        </div>
    );
};

export default SwarmAutomaton;