"use client";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLIENT INITIALIZATION ---
// This grabs the keys from your .env.local file. If they aren't there yet, 
// it safely falls back to placeholders so your Vercel build won't crash.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// --------------------------------------

export interface HealthData {
    height?: number;
    weight?: number;
    sleepHours?: number;
    activityMinutes?: number;
    smokingStatus?: "never" | "former" | "current";
    systolic?: number;
    diastolic?: number;
    restingHR?: number;
    totalChol?: number;
    ldl?: number;
    hdl?: number;
    sex?: "male" | "female";
}

export function useHealthSession() {
    const [data, setData] = useState<HealthData>({});

    useEffect(() => {
        // Load initial cached state from localStorage for instant UI feedback
        const saved = localStorage.getItem("health_matrix_session");
        if (saved) {
            try { setData(JSON.parse(saved)); } catch (e) { console.error(e); }
        }
    }, []);

    const setMetric = async <K extends keyof HealthData>(key: K, value: HealthData[K]) => {
        const updated = { ...data, [key]: value };
        setData(updated);
        localStorage.setItem("health_matrix_session", JSON.stringify(updated));

        // Push live to Supabase PostgreSQL Database
        try {
            await supabase.from("diagnostic_ledger").insert([
                {
                    node_id: "LUBHANSHU-25BCS10043",
                    metric_type: String(key),
                    metric_values: updated,
                    source_reference: "WH-2050-TELEMETRY"
                }
            ]);
        } catch (err) {
            console.error("Telemetry sync error:", err);
        }
    };

    return { data, setMetric };
}