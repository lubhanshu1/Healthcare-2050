"use client";
import { useState } from "react";

export function CloneTransferProtocol() {
    const [transferring, setTransferring] = useState(false);
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const [layers, setLayers] = useState({
        genomic: true,
        metabolic: true,
        neural: false,
    });

    const toggleLayer = (layer: keyof typeof layers) => {
        if (!transferring) {
            setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
        }
    };

    const initiateTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!layers.genomic && !layers.metabolic && !layers.neural) return;

        setTransferring(true);
        setComplete(false);
        setProgress(0);
        setLogs(["[SYSTEM]: Establishing quantum entanglement tunnel..."]);

        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 12;

            if (current > 30 && current < 40) {
                setLogs(prev => [...prev, "[DATA]: Syncing biological markers..."]);
            } else if (current > 60 && current < 70) {
                setLogs(prev => [...prev, layers.neural ? "[DATA]: Uploading synaptic engrams..." : "[DATA]: Compiling physical telemetry..."]);
            }

            if (current >= 100) {
                clearInterval(interval);
                setProgress(100);
                setTransferring(false);
                setComplete(true);
                setLogs(prev => [...prev, "[SUCCESS]: Host data successfully mapped to Digital Clone."]);
            } else {
                setProgress(current);
            }
        }, 400);
    };

    return (
        <div className="w-full font-mono text-gray-300 text-xs mt-6">
            <div className="text-cyan-400 mb-2 uppercase tracking-widest">Digital Clone Data Transfer Protocol</div>

            <div className="border border-gray-400">
                {/* Layer Selection */}
                <div className="flex border-b border-gray-400">
                    <div
                        onClick={() => toggleLayer('genomic')}
                        className={`flex-1 border-r border-gray-400 p-2 cursor-pointer transition-colors ${layers.genomic ? 'bg-cyan-900/30 text-cyan-300' : 'hover:bg-gray-900'}`}
                    >
                        [{layers.genomic ? 'X' : ' '}] GENOMIC BASE
                    </div>
                    <div
                        onClick={() => toggleLayer('metabolic')}
                        className={`flex-1 border-r border-gray-400 p-2 cursor-pointer transition-colors ${layers.metabolic ? 'bg-cyan-900/30 text-cyan-300' : 'hover:bg-gray-900'}`}
                    >
                        [{layers.metabolic ? 'X' : ' '}] REAL-TIME VITALS
                    </div>
                    <div
                        onClick={() => toggleLayer('neural')}
                        className={`flex-1 p-2 cursor-pointer transition-colors ${layers.neural ? 'bg-purple-900/30 text-purple-300' : 'hover:bg-gray-900'}`}
                    >
                        [{layers.neural ? 'X' : ' '}] SYNAPTIC (MEMORIES)
                    </div>
                </div>

                {/* Progress Bar Area */}
                <div className="p-3 border-b border-gray-400 relative overflow-hidden bg-black/50 h-10 flex items-center">
                    {/* Animated Background Bar */}
                    <div
                        className="absolute left-0 top-0 h-full bg-cyan-900/40 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />

                    <div className="relative z-10 flex justify-between w-full font-bold tracking-widest">
                        <span className={complete ? 'text-cyan-400' : 'text-gray-400'}>
                            {transferring ? 'UPLOADING TO MATRIX...' : complete ? 'TRANSFER COMPLETE' : 'AWAITING UPLOAD INITIALIZATION'}
                        </span>
                        <span className="text-cyan-300">{Math.floor(progress)}%</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex p-1 bg-transparent text-white">
                    <button
                        onClick={initiateTransfer}
                        disabled={transferring || (!layers.genomic && !layers.metabolic && !layers.neural)}
                        className="hover:text-cyan-400 transition-colors uppercase cursor-pointer bg-transparent border-none disabled:opacity-50"
                    >
                        {transferring ? "[ EXECUTING UPLOAD ]" : "[ INITIATE CLONE SYNC ]"}
                    </button>
                </div>
            </div>

            {/* Terminal Log Output */}
            {logs.length > 0 && (
                <div className="mt-2 border border-gray-700 p-2 text-[10px] text-gray-400 h-24 overflow-y-auto bg-black/60">
                    {logs.map((log, index) => (
                        <div key={index} className="mb-1">
                            <span className="text-gray-600">{">"}</span> {log}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}