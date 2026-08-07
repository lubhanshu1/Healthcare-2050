import React, { useRef, useEffect } from 'react';

const FederatedTopology = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Define Network Nodes
        const nodes = [
            { x: 100, y: 150, label: 'EDGE-A', type: 'edge' },
            { x: 100, y: 250, label: 'EDGE-B', type: 'edge' },
            { x: 350, y: 100, label: 'CRYPTO-GATE-1', type: 'relay' },
            { x: 350, y: 300, label: 'CRYPTO-GATE-2', type: 'relay' },
            { x: 600, y: 200, label: 'QUANTUM CORE', type: 'core' },
            { x: 800, y: 200, label: 'GLOBAL LEDGER', type: 'ledger' }
        ];

        // Define Connections (Edges)
        const connections = [
            { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 },
            { from: 3, to: 4 }, { from: 2, to: 3 }, { from: 4, to: 5 }
        ];

        // Generate Data Packets
        let packets = Array(12).fill(null).map(() => ({
            connectionIndex: Math.floor(Math.random() * connections.length),
            progress: Math.random(),
            speed: 0.005 + (Math.random() * 0.01)
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Connections
            ctx.lineWidth = 1;
            connections.forEach(conn => {
                const start = nodes[conn.from];
                const end = nodes[conn.to];
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
                ctx.stroke();
            });

            // Draw Packets
            packets.forEach(packet => {
                const conn = connections[packet.connectionIndex];
                const start = nodes[conn.from];
                const end = nodes[conn.to];

                // Calculate current position
                const currentX = start.x + (end.x - start.x) * packet.progress;
                const currentY = start.y + (end.y - start.y) * packet.progress;

                ctx.beginPath();
                ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#60a5fa'; // Glowing blue
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#3b82f6';
                ctx.fill();
                ctx.shadowBlur = 0; // Reset

                // Move packet
                packet.progress += packet.speed;
                if (packet.progress >= 1) {
                    packet.progress = 0;
                    // Randomly pick next path (simple routing)
                    packet.connectionIndex = Math.floor(Math.random() * connections.length);
                }
            });

            // Draw Nodes
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.type === 'core' ? 12 : 8, 0, Math.PI * 2);
                ctx.fillStyle = node.type === 'core' ? '#8b5cf6' : node.type === 'edge' ? '#10b981' : '#3b82f6';
                ctx.fill();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + 25);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div style={{
            width: '100%', maxWidth: '900px', margin: '20px auto', padding: '24px', backgroundColor: '#050508',
            border: '1px solid rgba(59,130,246,0.3)', borderRadius: '16px', fontFamily: '"Courier New", Courier, monospace',
            color: '#eff6ff', boxShadow: '0 0 40px rgba(59,130,246,0.1)', boxSizing: 'border-box'
        }}>
            <div style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 4px 0' }}>DTQFL FEDERATED TOPOLOGY</h2>
                <p style={{ fontSize: '0.75rem', color: '#3b82f6', letterSpacing: '2px', margin: 0 }}>ZERO-TRUST NETWORK VISUALIZER</p>
            </div>

            <div style={{ backgroundColor: '#020203', border: '1px solid #1e3a8a', borderRadius: '8px', overflow: 'hidden' }}>
                <canvas ref={canvasRef} width={900} height={400} style={{ display: 'block', width: '100%' }} />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                <span><span style={{ color: '#10b981' }}>●</span> EDGE NODES (Wearables)</span>
                <span><span style={{ color: '#3b82f6' }}>●</span> CRYPTO RELAYS (Encryption)</span>
                <span><span style={{ color: '#8b5cf6' }}>●</span> QUANTUM CORE (Processing)</span>
            </div>
        </div>
    );
};

export default FederatedTopology;