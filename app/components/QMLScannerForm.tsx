"use client";
import { useState } from "react";
import { useHealthSession } from "@/lib/useHealthSession";
import {
    classifyBloodPressure, HR_BANDS,
    GLUCOSE_BANDS, A1C_BANDS,
    TOTAL_CHOL_BANDS, LDL_BANDS, classifyHDL,
} from "@/lib/healthReference";

function classifyByBands(value: number, bands: any[], source: string) {
    const band = bands.find((b: any) => (b.min === undefined || value >= b.min) && (b.max === undefined || value < b.max));
    return band ? { label: band.label, source } : { label: "Outside charted range", source };
}

// CARDIAC SCAN
export function CardiacScan() {
    const { data, setMetric } = useHealthSession();
    const [sys, setSys] = useState(data.systolic?.toString() || "");
    const [dia, setDia] = useState(data.diastolic?.toString() || "");
    const [hr, setHr] = useState(data.restingHR?.toString() || "");
    const [scanning, setScanning] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRun = (e: React.FormEvent) => {
        e.preventDefault();
        if (sys) setMetric("systolic", parseFloat(sys));
        if (dia) setMetric("diastolic", parseFloat(dia));
        if (hr) setMetric("restingHR", parseFloat(hr));
        setScanning(true);
        setTimeout(() => { setScanning(false); setSubmitted(true); }, 800);
    };

    const bpResult = data.systolic && data.diastolic ? classifyBloodPressure(data.systolic, data.diastolic) : null;
    const hrResult = data.restingHR ? classifyByBands(data.restingHR, HR_BANDS, "AHA") : null;

    return (
        <div className="border border-cyan-900/40 rounded-xl p-5 bg-[#030305]/80 font-mono mb-6">
            <h3 className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Cardiac Vector Scan</h3>
            {!submitted ? (
                <form onSubmit={handleRun} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Sys (mmHg)</label>
                            <input type="number" value={sys} onChange={e => setSys(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Dia (mmHg)</label>
                            <input type="number" value={dia} onChange={e => setDia(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Rest HR</label>
                            <input type="number" value={hr} onChange={e => setHr(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button type="submit" disabled={scanning} className="text-cyan-400 text-xs uppercase tracking-widest hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer">
                            {scanning ? "[ ANALYZING... ]" : "[ EXECUTE CARDIAC SCAN ]"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="border border-gray-700/50 p-4 rounded text-xs text-gray-300 bg-black/40 space-y-4">
                    {bpResult && (
                        <div><span className="text-gray-400">Blood Pressure:</span> {bpResult.label} <div className="text-[9px] text-gray-500 uppercase mt-1">Source: {bpResult.source}</div></div>
                    )}
                    {hrResult && (
                        <div><span className="text-gray-400">Resting HR:</span> {hrResult.label} <div className="text-[9px] text-gray-500 uppercase mt-1">Source: {hrResult.source}</div></div>
                    )}
                    <button onClick={() => setSubmitted(false)} className="text-cyan-500 hover:text-cyan-300 text-[10px] tracking-widest uppercase cursor-pointer bg-transparent border-none mt-2">[ RECALIBRATE ]</button>
                </div>
            )}
        </div>
    );
}

// LIPID SCAN
export function LipidScan() {
    const { data, setMetric } = useHealthSession();
    const [tc, setTc] = useState(data.totalChol?.toString() || "");
    const [ldl, setLdl] = useState(data.ldl?.toString() || "");
    const [hdl, setHdl] = useState(data.hdl?.toString() || "");
    const [localSex, setLocalSex] = useState<"male" | "female" | "">(data.sex || "");
    const [scanning, setScanning] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRun = (e: React.FormEvent) => {
        e.preventDefault();
        if (tc) setMetric("totalChol", parseFloat(tc));
        if (ldl) setMetric("ldl", parseFloat(ldl));
        if (hdl) setMetric("hdl", parseFloat(hdl));
        if (localSex && !data.sex) setMetric("sex", localSex as "male" | "female");
        setScanning(true);
        setTimeout(() => { setScanning(false); setSubmitted(true); }, 800);
    };

    const tcRes = data.totalChol ? classifyByBands(data.totalChol, TOTAL_CHOL_BANDS, "NIH/NHLBI") : null;
    const ldlRes = data.ldl ? classifyByBands(data.ldl, LDL_BANDS, "NIH/NHLBI") : null;
    const hdlRes = data.hdl && data.sex ? classifyHDL(data.hdl, data.sex) : null;

    return (
        <div className="border border-cyan-900/40 rounded-xl p-5 bg-[#030305]/80 font-mono mb-6">
            <h3 className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Lipid Profile Scan</h3>
            {!submitted ? (
                <form onSubmit={handleRun} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Total (mg/dL)</label>
                            <input type="number" value={tc} onChange={e => setTc(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">LDL (mg/dL)</label>
                            <input type="number" value={ldl} onChange={e => setLdl(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest">HDL (mg/dL)</label>
                            <input type="number" value={hdl} onChange={e => setHdl(e.target.value)} className="w-full bg-black/40 border border-cyan-900/30 rounded p-2 text-cyan-200 text-xs focus:border-cyan-500 outline-none" />
                        </div>
                    </div>
                    {hdl && !data.sex && (
                        <div className="pt-4 border-t border-cyan-900/30 mt-4">
                            <label className="block text-[10px] text-gray-500 mb-3 uppercase tracking-widest">Biological Sex (Req. for HDL)</label>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setLocalSex("female")} className={`border rounded px-4 py-1 text-[10px] uppercase tracking-widest transition-all ${localSex === "female" ? "border-cyan-400 text-cyan-300" : "border-cyan-900/30 text-gray-500"}`}>Female</button>
                                <button type="button" onClick={() => setLocalSex("male")} className={`border rounded px-4 py-1 text-[10px] uppercase tracking-widest transition-all ${localSex === "male" ? "border-cyan-400 text-cyan-300" : "border-cyan-900/30 text-gray-500"}`}>Male</button>
                            </div>
                        </div>
                    )}
                    <div className="pt-2">
                        <button type="submit" disabled={scanning || (hdl !== "" && !data.sex && !localSex)} className="text-cyan-400 text-xs uppercase tracking-widest hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer disabled:opacity-50">
                            {scanning ? "[ ANALYZING... ]" : "[ EXECUTE LIPID SCAN ]"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="border border-gray-700/50 p-4 rounded text-xs text-gray-300 bg-black/40 space-y-4">
                    {tcRes && <div><span className="text-gray-400">Total Chol:</span> {tcRes.label} <div className="text-[9px] text-gray-500 uppercase mt-1">Source: {tcRes.source}</div></div>}
                    {ldlRes && <div><span className="text-gray-400">LDL:</span> {ldlRes.label} <div className="text-[9px] text-gray-500 uppercase mt-1">Source: {ldlRes.source}</div></div>}
                    {hdlRes && <div><span className="text-gray-400">HDL:</span> {hdlRes.label} <div className="text-[9px] text-gray-500 uppercase mt-1">Source: {hdlRes.source}</div></div>}
                    <button onClick={() => setSubmitted(false)} className="text-cyan-500 hover:text-cyan-300 text-[10px] tracking-widest uppercase cursor-pointer bg-transparent border-none mt-2">[ RECALIBRATE ]</button>
                </div>
            )}
        </div>
    );
}

export default function QMLScannerForm() {
    return (
        <div className="w-full">
            <CardiacScan />
            <LipidScan />
            <p className="text-[9px] text-gray-600 mt-2 uppercase tracking-widest leading-relaxed">
                [SYSTEM NOTE]: Educational simulation against public reference data — not medical advice. Saved locally.
            </p>
        </div>
    );
}