"use client";
import { useState, useEffect } from "react";
import { compareQML } from "../../lib/compareToReference";
import HealthComparisonDisclaimer from "./HealthComparisonDisclaimer";

export default function QMLScannerForm() {
    const [showForm, setShowForm] = useState(false);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("qml-scan");
        if (saved) setResults(JSON.parse(saved));
    }, []);

    const handleScan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = compareQML(
            formData.get("smoking") === "yes",
            formData.get("exercise") as string,
            formData.get("familyHistory") === "yes"
        );
        setResults(res);
        localStorage.setItem("qml-scan", JSON.stringify(res));
        setShowForm(false);
    };

    const clearData = () => {
        localStorage.removeItem("qml-scan");
        setResults(null);
    };

    return (
        <div className="font-mono text-cyan-400 my-6">
            {!showForm && !results && (
                <button onClick={() => setShowForm(true)} className="border border-cyan-400 px-4 py-2 hover:bg-cyan-900/50 transition-colors">
                    [ INITIATE QML PROJECTION ]
                </button>
            )}

            {showForm && (
                <form onSubmit={handleScan} className="border border-cyan-500/50 p-4 max-w-md bg-black">
                    <div className="flex flex-col gap-3 text-sm">
                        <input name="age" type="number" placeholder="AGE" required className="bg-transparent border-b border-cyan-500 outline-none p-1" />
                        <input name="sleep" type="number" placeholder="SLEEP (HOURS/NIGHT)" required className="bg-transparent border-b border-cyan-500 outline-none p-1" />

                        <label className="text-cyan-600 mt-2">SMOKING STATUS</label>
                        <select name="smoking" className="bg-black border-b border-cyan-500 outline-none p-1 text-cyan-300">
                            <option value="no">NO</option>
                            <option value="yes">YES</option>
                        </select>

                        <label className="text-cyan-600 mt-2">EXERCISE FREQUENCY</label>
                        <select name="exercise" className="bg-black border-b border-cyan-500 outline-none p-1 text-cyan-300">
                            <option value="none">NONE</option>
                            <option value="1-2x">1-2x PER WEEK</option>
                            <option value="3+">3+ PER WEEK</option>
                        </select>

                        <label className="text-cyan-600 mt-2">FAMILY HISTORY OF CHRONIC ILLNESS</label>
                        <select name="familyHistory" className="bg-black border-b border-cyan-500 outline-none p-1 text-cyan-300">
                            <option value="no">NO</option>
                            <option value="yes">YES</option>
                        </select>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button type="submit" className="text-cyan-300 hover:text-white border border-cyan-300 px-2 py-1">[ EXECUTE ]</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white border border-gray-500 px-2 py-1">[ CANCEL ]</button>
                    </div>
                </form>
            )}

            {results && (
                <div className="border border-cyan-400 p-4 relative bg-black/80 max-w-md">
                    <button onClick={clearData} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-300">[ CLEAR DATA ]</button>
                    <h3 className="text-lg mb-2 text-yellow-500">PROJECTION BAND COMPUTED</h3>
                    <p className="text-2xl font-bold text-white mb-1">{results.value}</p>
                    <p className="text-sm text-purple-400">{results.classification}</p>
                    <p className="text-xs text-gray-500 mb-2">Source: {results.sourceLabel}</p>

                    <HealthComparisonDisclaimer />
                </div>
            )}
        </div>
    );
}