"use client";
import { useState } from "react";
import { useHealthSession } from "@/lib/useHealthSession";
import { classifyBMI, SLEEP_BANDS, ACTIVITY_MIN_BANDS } from "@/lib/healthReference";

function classifyByBands(value: number, bands: any[], source: string) {
    const band = bands.find((b: any) => (b.min === undefined || value >= b.min) && (b.max === undefined || value < b.max));
    return band ? { label: band.label, source } : { label: "Outside charted range", source };
}

export function BiometricTwinScans() {
    const { data, setMetric } = useHealthSession();

    const [h, setH] = useState(data.heightCm?.toString() || "");
    const [w, setW] = useState(data.weightKg?.toString() || "");
    const [sleep, setSleep] = useState(data.sleepHours?.toString() || "");
    const [activity, setActivity] = useState(data.weeklyActivityMin?.toString() || "");

    const [scanning, setScanning] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRun = (e: React.FormEvent) => {
        e.preventDefault();
        if (h) setMetric("heightCm", parseFloat(h));
        if (w) setMetric("weightKg", parseFloat(w));
        if (sleep) setMetric("sleepHours", parseFloat(sleep));
        if (activity) setMetric("weeklyActivityMin", parseFloat(activity));

        setScanning(true);
        setTimeout(() => { setScanning(false); setSubmitted(true); }, 1000);
    };

    const bmiRes = data.heightCm && data.weightKg ? classifyBMI(data.heightCm, data.weightKg) : null;
    const sleepRes = data.sleepHours ? classifyByBands(data.sleepHours, SLEEP_BANDS, "CDC") : null;
    const actRes = data.weeklyActivityMin ? classifyByBands(data.weeklyActivityMin, ACTIVITY_MIN_BANDS, "WHO / CDC") : null;

    const clearForm = () => {
        setH(""); setW(""); setSleep(""); setActivity("");
    };

    return (
        <div className="w-full font-mono text-gray-300 text-xs mb-6">
            {!submitted ? (
                <form onSubmit={handleRun} className="border border-gray-400">

                    {/* Row 1: Height & Weight */}
                    <div className="flex border-b border-gray-400">
                        <div className="flex-1 border-r border-gray-400">
                            <input
                                type="number"
                                value={h}
                                onChange={e => setH(e.target.value)}
                                placeholder="HEIGHT (cm)"
                                className="w-full bg-transparent p-1 outline-none placeholder-gray-500 text-cyan-300 uppercase appearance-none"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                value={w}
                                onChange={e => setW(e.target.value)}
                                placeholder="WEIGHT (kg)"
                                className="w-full bg-transparent p-1 outline-none placeholder-gray-500 text-cyan-300 uppercase appearance-none"
                            />
                        </div>
                    </div>

                    {/* Row 2: Sleep & Activity */}
                    <div className="flex border-b border-gray-400">
                        <div className="flex-1 border-r border-gray-400">
                            <input
                                type="number"
                                step="0.5"
                                value={sleep}
                                onChange={e => setSleep(e.target.value)}
                                placeholder="AVG SLEEP (hrs)"
                                className="w-full bg-transparent p-1 outline-none placeholder-gray-500 text-cyan-300 uppercase appearance-none"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                value={activity}
                                onChange={e => setActivity(e.target.value)}
                                placeholder="ACTIVITY (min/wk)"
                                className="w-full bg-transparent p-1 outline-none placeholder-gray-500 text-cyan-300 uppercase appearance-none"
                            />
                        </div>
                    </div>

                    {/* Row 3: Buttons */}
                    <div className="flex p-1 bg-transparent text-white">
                        <button type="submit" disabled={scanning} className="hover:text-cyan-400 transition-colors uppercase cursor-pointer bg-transparent border-none">
                            {scanning ? "[ EXECUTING... ]" : "[ EXECUTE ]"}
                        </button>
                        <span className="mx-1 text-gray-500">|</span>
                        <button type="button" onClick={clearForm} className="hover:text-cyan-400 transition-colors uppercase cursor-pointer bg-transparent border-none">
                            [ CANCEL ]
                        </button>
                    </div>
                </form>

            ) : (

                <div className="border border-gray-400 p-2 text-xs leading-relaxed">
                    <div className="flex items-center mb-3">
                        <button onClick={() => setSubmitted(false)} className="hover:text-cyan-400 text-white uppercase cursor-pointer bg-transparent border-none mr-2">
                            [ CLEAR DATA ]
                        </button>
                        <span className="text-white uppercase font-bold tracking-widest">BIOMETRIC SYNC ACHIEVED</span>
                    </div>

                    {bmiRes && (
                        <div className="mb-2">
                            <span className="text-white uppercase">BMI:</span> {bmiRes.label}
                            <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {bmiRes.source}</div>
                        </div>
                    )}
                    {sleepRes && (
                        <div className="mb-2">
                            <span className="text-white uppercase">CIRCADIAN:</span> {sleepRes.label}
                            <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {sleepRes.source}</div>
                        </div>
                    )}
                    {actRes && (
                        <div className="mb-2">
                            <span className="text-white uppercase">KINETIC:</span> {actRes.label}
                            <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {actRes.source}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}