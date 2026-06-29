"use client";
import QuantumDiagnostics from './components/QuantumDiagnostics';
import DigitalHumanHologram from './components/DigitalHumanHologram';
import SystemArchitectID from './components/SystemArchitectID';
import SwarmAutomaton from './components/SwarmAutomaton';
import FederatedTopology from './components/FederatedTopology';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- GLOBAL AUDIO ENGINE (Synthesizer) ---
let audioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx?.state === 'suspended') audioCtx.resume();
};
const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.05) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

const navLabels: Record<string, string> = {
  quantumTwins: "Digital Humans",
  agiPhysicians: "QML Diagnostics",
  nanobotSwarms: "Swarm Medicine",
  infrastructure: "Infrastructure",
  publications: "Publications",
  connect: "System Architect",
};

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // UI State
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Quantum Engine State
  const [isAgiActive, setIsAgiActive] = useState(false);

  const handleCloseModal = () => {
    setActiveModal(null);
    setTimeout(() => {
      setIsAgiActive(false);
    }, 500);
  };

  const contentDatabase: Record<string, { title: string; body: React.ReactNode }> = {
    quantumTwins: {
      title: "Digital Humans",
      body: <DigitalHumanHologram />,
    },
    agiPhysicians: {
      title: isAgiActive ? "Quantum Engine: Online" : "QML Diagnostics",
      body: isAgiActive ? (
        <div style={{ animation: "fadeIn 0.5s ease" }}>
          <QuantumDiagnostics />
          <button onClick={() => setIsAgiActive(false)} style={{ width: "100%", padding: "12px", background: "transparent", color: "gray", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", marginTop: "1.5rem" }}>Disconnect Core</button>
        </div>
      ) : (
        <div>
          <p style={{ lineHeight: 1.8, color: "gray", fontWeight: 300, marginBottom: "20px" }}>Advanced Quantum Machine Learning Engine, processing complex biological data using simulated quantum states to predict patient health trajectories.</p>
          <button onClick={() => { initAudio(); playTone(600, 'sawtooth', 0.5); setIsAgiActive(true); }} style={{ padding: "12px 24px", background: "#b400ff", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>Access Quantum Core</button>
        </div>
      ),
    },
    nanobotSwarms: {
      title: "Swarm Medicine",
      body: <SwarmAutomaton />,
    },
    infrastructure: {
      title: "Edge Telemetry & Cloud Security",
      body: <FederatedTopology />,
    },
    publications: {
      title: "Research & Publications",
      body: (
        <>
          <div style={{ marginBottom: "3rem" }}>
            <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "1rem", fontWeight: 400 }}>Healthcare Civilization 2050</h4>
            <p style={{ fontSize: "0.95rem", color: "gray", lineHeight: 1.7, fontWeight: 300, marginBottom: "1rem" }}>The year 2050 marks the realization of a planetary and interplanetary healthcare civilization, fundamentally redefining the human biological paradigm.</p>
            <a href="/Healthcare-2050-Research-Metaplan.pdf" target="_blank" style={{ padding: "10px 20px", border: "1px solid #14b8a6", color: "#14b8a6", textDecoration: "none", display: "inline-block", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Download Metaplan</a>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", margin: "3rem 0" }}></div>
          <div>
            <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "1rem", fontWeight: 400 }}>Inclusion–Exclusion Principle</h4>
            <p style={{ fontSize: "0.95rem", color: "gray", lineHeight: 1.7, fontWeight: 300, marginBottom: "1rem" }}>An in-depth exploration of advanced discrete mathematics applied directly to modern network security architectures and identity routing.</p>
            <a href="/inclusion-exclusion-report.pdf" target="_blank" style={{ padding: "10px 20px", border: "1px solid #14b8a6", color: "#14b8a6", textDecoration: "none", display: "inline-block", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Download Report</a>
          </div>
        </>
      ),
    },
    connect: {
      title: "System Architect",
      body: <SystemArchitectID />,
    },
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.002);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 4500;
    const geometry = new THREE.BufferGeometry();

    // TYPE FIXES ADDED HERE:
    const positions: number[] = [];
    const originalPositions: number[] = [];
    const colors: number[] = [];

    const color1 = new THREE.Color(0x00e5ff);
    const color2 = new THREE.Color(0xb400ff);

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 30;
      const radius = 40 + Math.random() * 15;
      const offset = i % 2 === 0 ? 0 : Math.PI;
      const x = Math.cos(t + offset) * radius;
      const y = (i / particleCount - 0.5) * 600;
      const z = Math.sin(t + offset) * radius;
      const isScatter = Math.random() > 0.85;
      const finalX = isScatter ? x + (Math.random() - 0.5) * 180 : x;
      const finalY = isScatter ? y + (Math.random() - 0.5) * 180 : y;
      const finalZ = isScatter ? z + (Math.random() - 0.5) * 180 : z;
      positions.push(finalX, finalY, finalZ);
      originalPositions.push(finalX, finalY, finalZ);
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0; let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };
    document.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.012;
      particles.rotation.x += (mouseY * 0.05 - particles.rotation.x) * 0.05;
      particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.05;
      particles.rotation.y += 0.003;
      const positionsArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const origX = originalPositions[i3];
        const origY = originalPositions[i3 + 1];
        const origZ = originalPositions[i3 + 2];
        positionsArray[i3] = origX + Math.sin(time + origY * 0.02) * 6;
        positionsArray[i3 + 2] = origZ + Math.cos(time + origY * 0.02) * 6;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose(); material.dispose();
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#030305', minHeight: '100vh', overflow: 'hidden', color: 'white', position: 'relative', fontFamily: 'sans-serif' }}>

      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} ref={mountRef}></div>

      {/* MATRIX ROUTER BUTTON */}
      <button
        onClick={() => { initAudio(); playTone(1200, 'sine', 0.2); router.push('/matrix'); }}
        style={{
          position: 'absolute', bottom: '40px', right: '40px', zIndex: 100, padding: '12px 24px',
          background: 'rgba(3, 7, 18, 0.8)', border: '1px solid #14b8a6', color: '#14b8a6',
          cursor: 'pointer', fontFamily: '"Courier New", monospace', fontSize: '0.85rem',
          letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)', transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#14b8a6'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(3, 7, 18, 0.8)'; e.currentTarget.style.color = '#14b8a6'; }}
      >
        [ Access Secure Matrix ]
      </button>

      {/* TOP NAVIGATION */}
      <div style={{ position: 'relative', zIndex: 10, padding: '40px 60px', display: 'flex', justifyContent: 'space-between' }}>
        <nav style={{ display: 'flex', gap: '40px', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          {Object.keys(navLabels).map((key) => (
            <button key={key} onClick={() => { initAudio(); playTone(500, 'sine', 0.1); setActiveModal(key); }} style={{ background: 'none', border: 'none', color: 'gray', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}>
              {navLabels[key]}
            </button>
          ))}
        </nav>
      </div>

      {/* HERO TEXT */}
      <div style={{ position: 'relative', zIndex: 10, padding: '60px', pointerEvents: 'none' }}>
        <h1 style={{ fontSize: "4.5rem", lineHeight: 1.1, fontWeight: 300 }}>
          Healthcare <br />Civilization <span style={{ color: '#00e5ff' }}>2050.</span>
        </h1>
        <p style={{ maxWidth: "550px", fontSize: "1.05rem", color: 'gray', marginTop: '20px', lineHeight: 1.6 }}>
          AGI, Quantum Intelligence, Digital Humans, and Autonomous Medicine for Planetary and Interplanetary Health.
        </p>
        <div style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "gray", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Curated by Lubhanshu
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && (
        <div onClick={handleCloseModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', width: '100%', maxWidth: '950px', borderRadius: '8px', position: 'relative' }}>
            <button onClick={handleCloseModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'gray', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "2rem", color: "#fff", letterSpacing: "-0.02em" }}>
              {contentDatabase[activeModal]?.title}
            </h3>
            <div>{contentDatabase[activeModal]?.body}</div>
          </div>
        </div>
      )}
    </main>
  );
}