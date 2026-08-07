"use client";
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface HealthSessionData {
    sex?: "male" | "female";
    heightCm?: number;
    weightKg?: number;
    sleepHours?: number;
    weeklyActivityMin?: number;
    systolic?: number;
    diastolic?: number;
    restingHR?: number;
    glucoseMgDl?: number;
    a1cPercent?: number;
    totalChol?: number;
    ldl?: number;
    hdl?: number;
    spo2?: number;
    tempC?: number;
    smokingStatus?: "never" | "former" | "current";
}

type Key = keyof HealthSessionData;

const STORAGE_KEY = "healthcare_civilization_2050_ledger";

const HealthSessionContext = createContext<{
    data: HealthSessionData;
    setMetric: <K extends Key>(key: K, value: HealthSessionData[K]) => void;
    hasMetric: (key: Key) => boolean;
    clearSession: () => void;
} | null>(null);

export function HealthSessionProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<HealthSessionData>(() => {
        if (typeof window === "undefined") return {};
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Storage error:", e);
        }
    }, [data]);

    const setMetric = useCallback(<K extends Key>(key: K, value: HealthSessionData[K]) => {
        setData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const hasMetric = useCallback((key: Key) => data[key] !== undefined, [data]);

    const clearSession = useCallback(() => {
        setData({});
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch { }
    }, []);

    return (
        <HealthSessionContext.Provider value= {{ data, setMetric, hasMetric, clearSession }
}>
    { children }
    </HealthSessionContext.Provider>
  );
}

export function useHealthSession() {
    const ctx = useContext(HealthSessionContext);
    if (!ctx) throw new Error("useHealthSession must be used within HealthSessionProvider");
    return ctx;
}