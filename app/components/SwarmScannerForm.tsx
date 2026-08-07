"use client";
import { useHealthSession } from "@/lib/useHealthSession";

export default function SwarmScannerForm() {
    const { data, setMetric } = useHealthSession();

    const handleSelect = (status: "never" | "former" | "current") => {
        setMetric("smokingStatus", status);
    };

    return (
        <div className="border border-cyan-900/40 rounded-xl p-6 bg-[#030305]/80 font-mono w-full">
            <h3 className="text-cyan-400 text-sm tracking-widest uppercase mb-4">Defense Readiness Vector</h3>
            <label className="block text-[10px] uppercase text-gray-500 mb-4 tracking-widest">Behavioral Input: Smoking Status</label>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {(["never", "former", "current"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => handleSelect(status)}
                        className={`border rounded p-2 text-[10px] uppercase tracking-widest transition-all ${data.smokingStatus === status
                            ? "border-cyan-400 bg-cyan-900/20 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                            : "border-cyan-900/30 bg-black/40 text-gray-500 hover:border-cyan-700/80 hover:text-gray-300"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="min-h-[80px]">
                {data.smokingStatus === "current" && (
                    <div className="border border-gray-700/50 p-4 rounded text-xs text-cyan-200 bg-black/40 leading-relaxed">
                        Smoking is one of the most modifiable risk factors for cardiovascular and respiratory disease — risk drops measurably within years of quitting, at any age.
                        <span className="block text-[9px] text-gray-500 mt-3 uppercase tracking-widest">Source: WHO</span>
                    </div>
                )}
                {data.smokingStatus === "former" && (
                    <div className="border border-gray-700/50 p-4 rounded text-xs text-cyan-200 bg-black/40 leading-relaxed">
                        Acknowledging sustained cessation benefits — physiological recovery metrics trend positively post-cessation.
                        <span className="block text-[9px] text-gray-500 mt-3 uppercase tracking-widest">Source: WHO</span>
                    </div>
                )}
                {data.smokingStatus === "never" && (
                    <div className="border border-gray-700/50 p-4 rounded text-xs text-cyan-200 bg-black/40 leading-relaxed">
                        Baseline respiratory trajectory aligns with optimal non-smoker clinical reference datasets.
                        <span className="block text-[9px] text-gray-500 mt-3 uppercase tracking-widest">Source: WHO</span>
                    </div>
                )}
            </div>

            <p className="text-[9px] text-gray-600 mt-6 uppercase tracking-widest leading-relaxed">
                [SYSTEM NOTE]: Educational simulation against public reference data — not medical advice.
            </p>
        </div>
    );
}