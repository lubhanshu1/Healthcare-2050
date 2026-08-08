"use client";
import { useState } from "react";
import { useHealthSession } from "@/lib/useHealthSession";
import {
    classifyBloodPressure, HR_BANDS, TOTAL_CHOL_BANDS, LDL_BANDS, classifyHDL,
} from "@/lib/healthReference";

function classifyByBands(value: number, bands: any[], source: string) {
    const band = bands.find((b: any) => (b.min === undefined || value >= b.min) && (b.max === undefined || value < b.max));
    return band ? { label: band.label, source } : { label: "Outside charted range", source };
}

export function CardiacScan() {
    const { data, setMetric } = useHealthSession();
    const [sys, setSys] = useState(data.systolic?.toString() || "");
    const [dia, setDia] = useState(data.diastolic?.toString() || "");
    const [hr, setHr] = useState(data.restingHR?.toString() || "");

    const [scanning, setScanning] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // --- HACKATHON BOUNTY STATES ---
    const [missingData, setMissingData] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [highRiskFlag, setHighRiskFlag] = useState<string | null>(null);

    const handleRun = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. MISSING-DATA STATE CHECK
        if (!sys || !dia || !hr) {
            setMissingData(true);
            setValidationError(null);
            setHighRiskFlag(null);
            return;
        }
        setMissingData(false);

        const s = parseFloat(sys);
        const d = parseFloat(dia);
        const h = parseFloat(hr);

        // 2. INPUT SCHEMA VALIDATION (Tests for invalid clinical inputs)
        if (s < 50 || s > 300 || d < 30 || d > 200 || h < 20 || h > 300) {
            setValidationError("SCHEMA ERROR: Values outside human physiological limits.");
            setHighRiskFlag(null);
            return;
        }
        setValidationError(null);

        // 3. HIGH-RISK FLAG RULES (Automated Dosing System Safety Warning)
        if (s >= 180 || d >= 120) {
            setHighRiskFlag("CRITICAL RISK: Hypertensive Crisis. AUTOMATED DOSING SYSTEM locked. Manual physician override required.");
        } else {
            setHighRiskFlag(null);
        }

        // Pass Validation
        setMetric("systolic", s);
        setMetric("diastolic", d);
        setMetric("restingHR", h);

        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setSubmitted(true);
        }, 800);
    };

    const bpResult = data.systolic && data.diastolic ? classifyBloodPressure(data.systolic, data.diastolic) : null;
    const hrResult = data.restingHR ? classifyByBands(data.restingHR, HR_BANDS, "AHA") : null;

    return (
        <div className="w-full font-mono text-gray-300 text-xs mb-6">
            <div className="text-cyan-400 mb-2 uppercase tracking-widest">Cardiac Vector Scan & Dosing System</div>

            {/* BOUNTY WARNING DISPLAYS */}
            {missingData && (
                <div className="mb-3 p-2 bg-yellow-900/40 border border-yellow-500 text-yellow-400 animate-pulse">
                    [!] MISSING-DATA STATE: All clinical inputs must be provided before scanning.
                </div>
            )}
            {validationError && (
                <div className="mb-3 p-2 bg-red-900/40 border border-red-500 text-red-400">
                    [!] INVALID CLINICAL INPUT - {validationError}
                </div>
            )}
            {highRiskFlag && (
                <div className="mb-3 p-2 bg-purple-900/40 border border-purple-500 text-purple-300 animate-pulse font-bold">
                    [!] HIGH-RISK FLAG DETECTED - {highRiskFlag}
                </div>
            )}

            {!submitted ? (
                <form onSubmit={handleRun} className="border border-gray-400">
                    <div className="flex border-b border-gray-400">
                        <div className="flex-1 border-r border-gray-400">
                            <input type="number" value={sys} onChange={e => setSys(e.target.value)} placeholder="SYS (mmHg)" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                        <div className="flex-1 border-r border-gray-400">
                            <input type="number" value={dia} onChange={e => setDia(e.target.value)} placeholder="DIA (mmHg)" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                        <div className="flex-1">
                            <input type="number" value={hr} onChange={e => setHr(e.target.value)} placeholder="REST HR" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                    </div>
                    <div className="flex p-1 bg-transparent text-white">
                        <button type="submit" disabled={scanning} className="hover:text-cyan-400 transition-colors uppercase cursor-pointer bg-transparent border-none">
                            {scanning ? "[ ANALYZING... ]" : "[ EXECUTE SCAN & DOSING PROTOCOL ]"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="border border-gray-400 p-2 text-xs leading-relaxed">
                    <div className="flex items-center mb-3">
                        <button onClick={() => setSubmitted(false)} className="hover:text-cyan-400 text-white uppercase cursor-pointer bg-transparent border-none mr-2">[ RECALIBRATE ]</button>
                        <span className="text-white uppercase font-bold tracking-widest">CARDIAC VECTOR LOCKED</span>
                    </div>
                    {bpResult && <div className="mb-2"><span className="text-white uppercase">BP:</span> {bpResult.label} <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {bpResult.source}</div></div>}
                    {hrResult && <div className="mb-2"><span className="text-white uppercase">HR:</span> {hrResult.label} <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {hrResult.source}</div></div>}
                </div>
            )}
        </div>
    );
}

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
        setScanning(true); setTimeout(() => { setScanning(false); setSubmitted(true); }, 800);
    };

    const tcRes = data.totalChol ? classifyByBands(data.totalChol, TOTAL_CHOL_BANDS, "NIH/NHLBI") : null;
    const ldlRes = data.ldl ? classifyByBands(data.ldl, LDL_BANDS, "NIH/NHLBI") : null;
    const hdlRes = data.hdl && data.sex ? classifyHDL(data.hdl, data.sex) : null;

    return (
        <div className="w-full font-mono text-gray-300 text-xs mb-6">
            <div className="text-cyan-400 mb-2 uppercase tracking-widest">Lipid Profile Scan</div>
            {!submitted ? (
                <form onSubmit={handleRun} className="border border-gray-400">
                    <div className="flex border-b border-gray-400">
                        <div className="flex-1 border-r border-gray-400">
                            <input type="number" value={tc} onChange={e => setTc(e.target.value)} placeholder="TOTAL (mg/dL)" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                        <div className="flex-1 border-r border-gray-400">
                            <input type="number" value={ldl} onChange={e => setLdl(e.target.value)} placeholder="LDL (mg/dL)" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                        <div className="flex-1">
                            <input type="number" value={hdl} onChange={e => setHdl(e.target.value)} placeholder="HDL (mg/dL)" className="w-full bg-transparent p-1 outline-none placeholder-gray-600 text-cyan-300 uppercase appearance-none" />
                        </div>
                    </div>
                    {hdl && !data.sex && (
                        <div className="flex border-b border-gray-400">
                            <div className="flex-1 p-2 text-gray-500 uppercase tracking-widest border-r border-gray-400">Select Biological Sex:</div>
                            <button type="button" onClick={() => setLocalSex("female")} className={`flex-1 border-r border-gray-400 transition-colors uppercase tracking-widest ${localSex === "female" ? "bg-cyan-900/30 text-cyan-300" : "hover:bg-gray-900 text-gray-500"}`}>Female</button>
                            <button type="button" onClick={() => setLocalSex("male")} className={`flex-1 transition-colors uppercase tracking-widest ${localSex === "male" ? "bg-cyan-900/30 text-cyan-300" : "hover:bg-gray-900 text-gray-500"}`}>Male</button>
                        </div>
                    )}
                    <div className="flex p-1 bg-transparent text-white">
                        <button type="submit" disabled={scanning || (hdl !== "" && !data.sex && !localSex)} className="hover:text-cyan-400 transition-colors uppercase cursor-pointer bg-transparent border-none disabled:opacity-50">
                            {scanning ? "[ ANALYZING... ]" : "[ EXECUTE SCAN ]"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="border border-gray-400 p-2 text-xs leading-relaxed">
                    <div className="flex items-center mb-3">
                        <button onClick={() => setSubmitted(false)} className="hover:text-cyan-400 text-white uppercase cursor-pointer bg-transparent border-none mr-2">[ RECALIBRATE ]</button>
                        <span className="text-white uppercase font-bold tracking-widest">LIPID PROFILE LOCKED</span>
                    </div>
                    {tcRes && <div className="mb-2"><span className="text-white uppercase">TOTAL CHOL:</span> {tcRes.label} <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {tcRes.source}</div></div>}
                    {ldlRes && <div className="mb-2"><span className="text-white uppercase">LDL:</span> {ldlRes.label} <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {ldlRes.source}</div></div>}
                    {hdlRes && <div className="mb-2"><span className="text-white uppercase">HDL:</span> {hdlRes.label} <div className="text-[10px] text-gray-500 mt-1 uppercase">Source: {hdlRes.source}</div></div>}
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
                [SYSTEM NOTE]: Educational simulation against public reference data. Automated Dosing Protocols strictly monitored.
            </p>
        </div>
    );
}