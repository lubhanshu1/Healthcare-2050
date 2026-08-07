"use client";
import { useState, useEffect } from "react";
import { compareBiometrics } from "../../lib/compareToReference";
import HealthComparisonDisclaimer from "./HealthComparisonDisclaimer";

export default function BiometricScannerForm() {
    const [showForm, setShowForm] = useState(false);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("bio-scan");
        if (saved) setResults(JSON.parse(saved));
    }, []);

    const handleScan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = compareBiometrics(
            Number(formData.get("height")),
            Number(formData.get("weight")),
            Number(formData.get("sys")),
            Number(formData.get("dia"))
        );
        setResults(res);
        localStorage.setItem("bio-scan", JSON.stringify(res));
        setShowForm(false);
    };

    const clearData = () => {
        localStorage.removeItem("bio-scan");
        setResults(null);
    };

    return (
        <div className="font-mono text-cyan-400 my-6">
            {!showForm && !results && (
                <button onClick={() => setShowForm(true)} className="border border-cyan-400 px-4 py-2 hover:bg-cyan-900/50 transition-colors">
                    [ RUN BIOMETRIC SCAN ]
                </button>
            )}

            {showForm && (
                <form onSubmit={handleScan} className="border border-cyan-500/50 p-4 max-w-md bg-black">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <input name="age" type="number" placeholder="AGE" required className="bg-transparent border-b border-cyan-500 outline-none p-1" />
                        <input name="height" type="number" placeholder="HEIGHT (cm)" required className="bg-transparent border-b border-cyan-500 outline-none p-1" />
                        <input name="weight" type="number" placeholder="WEIGHT (kg)" required className="bg-transparent border-b border-cyan-500 outline-none p-1" />
                        <div className="flex gap-2">
                            <input name="sys" type="number" placeholder="SYS (e.g. 120)" required className="bg-transparent border-b border-cyan-500 outline-none p-1 w-full" />
                            <span className="self-center">/</span>
                            <input name="dia" type="number" placeholder="DIA (e.g. 80)" required className="bg-transparent border-b border-cyan-500 outline-none p-1 w-full" />
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button type="submit" className="text-cyan-300 hover:text-white border border-cyan-300 px-2 py-1">[ EXECUTE ]</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white border border-gray-500 px-2 py-1">[ CANCEL ]</button>
                    </div>
                </form>
            )}

            {results && (
                <div className="border border-cyan-400 p-4 relative bg-black/80 max-w-md">
                    <button onClick={clearData} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-300">[ CLEAR DATA ]</button>
                    <h3 className="text-lg mb-2">BIOMETRIC SYNC ACHIEVED</h3>
                    <p className="text-sm">BMI: {results.bmi.value} - <span className="text-purple-400">{results.bmi.classification}</span></p>
                    <p className="text-xs text-gray-500 mb-2">Source: {results.bmi.sourceLabel}</p>

                    <p className="text-sm">BP: {results.bp.value} - <span className="text-purple-400">{results.bp.classification}</span></p>
                    <p className="text-xs text-gray-500">Source: {results.bp.sourceLabel}</p>

                    <HealthComparisonDisclaimer />
                </div>
            )}
        </div>
    );
}