"use client";
import { useState, useEffect } from "react";
import HealthComparisonDisclaimer from "./HealthComparisonDisclaimer";

export default function SwarmScannerForm() {
    const [showForm, setShowForm] = useState(false);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("swarm-scan");
        if (saved) setResults(JSON.parse(saved));
    }, []);

    const handleScan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const symptom = formData.get("symptom") as string;
        const duration = Number(formData.get("duration"));
        const pain = Number(formData.get("pain"));

        // Micro-engine to calculate severity based on your reference data parameters
        let classification = "UNKNOWN ANOMALY";
        let protocol = "General observation recommended.";
        let severityClass = "text-gray-400";

        if (pain >= 8 || duration > 14) {
            classification = "CRITICAL SEVERITY";
            protocol = "Immediate Nanobot Swarm Deployment (Class A)";
            severityClass = "text-red-500";
        } else if (pain >= 5 || duration > 7) {
            classification = "MODERATE SEVERITY";
            protocol = "Targeted Micro-dosing Swarm (Class B)";
            severityClass = "text-yellow-400";
        } else {
            classification = "LOW SEVERITY";
            protocol = "Preventative Maintenance Swarm (Class C)";
            severityClass = "text-green-400";
        }

        const res = { symptom: symptom.toUpperCase(), classification, protocol, severityClass };
        setResults(res);
        localStorage.setItem("swarm-scan", JSON.stringify(res));
        setShowForm(false);
    };

    const clearData = () => {
        localStorage.removeItem("swarm-scan");
        setResults(null);
    };

    return (
        <div className="font-mono text-cyan-400 my-6">
            {!showForm && !results && (
                <button onClick={() => setShowForm(true)} className="border border-cyan-400 px-4 py-2 hover:bg-cyan-900/50 transition-colors">
                    [ INITIALIZE SYMPTOM TRIAGE ]
                </button>
            )}

            {showForm && (
                <form onSubmit={handleScan} className="border border-cyan-500/50 p-4 max-w-md bg-black">
                    <div className="flex flex-col gap-4 text-sm">
                        <div>
                            <label className="text-cyan-600 text-xs">PRIMARY SYMPTOM</label>
                            <input name="symptom" type="text" placeholder="e.g., Chest Pain, Migraine" required className="w-full bg-transparent border-b border-cyan-500 outline-none p-1 mt-1 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-cyan-600 text-xs">DURATION (DAYS)</label>
                                <input name="duration" type="number" placeholder="Days" required className="w-full bg-transparent border-b border-cyan-500 outline-none p-1 mt-1 text-white" />
                            </div>
                            <div>
                                <label className="text-cyan-600 text-xs">PAIN LEVEL (1-10)</label>
                                <input name="pain" type="number" min="1" max="10" placeholder="1-10" required className="w-full bg-transparent border-b border-cyan-500 outline-none p-1 mt-1 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button type="submit" className="text-cyan-300 hover:text-white border border-cyan-300 px-2 py-1">[ ANALYZE ]</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white border border-gray-500 px-2 py-1">[ CANCEL ]</button>
                    </div>
                </form>
            )}

            {results && (
                <div className="border border-cyan-400 p-4 relative bg-black/80 max-w-md">
                    <button onClick={clearData} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-300">[ CLEAR DATA ]</button>
                    <h3 className="text-lg mb-2 text-cyan-300">SWARM PROTOCOL GENERATED</h3>
                    <p className="text-sm text-gray-400 mb-1">TARGET: {results.symptom}</p>
                    <p className={`text-xl font-bold mb-2 ${results.severityClass}`}>{results.classification}</p>
                    <p className="text-sm text-white mb-2">&gt; {results.protocol}</p>

                    <HealthComparisonDisclaimer />
                </div>
            )}
        </div>
    );
}