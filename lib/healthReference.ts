// lib/healthReference.ts
//
// Static, source-cited reference ranges for the vitals-comparison feature.
// Educational/illustrative use only. This file must never be used to output
// a diagnosis, a risk score, or a treatment recommendation — only a category
// label plus the source it came from. Do not add, remove, or edit a
// threshold without an equally-cited public health source.

export type Tone = "normal" | "watch" | "elevated" | "high" | "critical";

export interface RangeBand {
    label: string;
    min?: number; // inclusive
    max?: number; // exclusive
    tone: Tone;
}

export interface ClassifiedResult {
    label: string;
    tone: Tone;
    source: string;
}

function classifyByBands(value: number, bands: RangeBand[], source: string): ClassifiedResult {
    const band = bands.find(
        (b) => (b.min === undefined || value >= b.min) && (b.max === undefined || value < b.max)
    );
    return band
        ? { label: band.label, tone: band.tone, source }
        : { label: "Outside charted range — consider discussing with a clinician", tone: "watch", source };
}

/* ------------------------------ Digital Humans ----------------------------- */

export const BMI_BANDS: RangeBand[] = [
    { label: "Underweight", max: 18.5, tone: "watch" },
    { label: "Normal range", min: 18.5, max: 25, tone: "normal" },
    { label: "Overweight", min: 25, max: 30, tone: "elevated" },
    { label: "Obese — Class I", min: 30, max: 35, tone: "high" },
    { label: "Obese — Class II", min: 35, max: 40, tone: "high" },
    { label: "Obese — Class III", min: 40, tone: "critical" },
];
export function classifyBMI(heightCm: number, weightKg: number): ClassifiedResult {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return classifyByBands(bmi, BMI_BANDS, "WHO / NIH–NHLBI");
}

export const SLEEP_BANDS: RangeBand[] = [
    { label: "Below the recommended range", max: 7, tone: "watch" },
    { label: "Within the recommended range", min: 7, max: 9, tone: "normal" },
    { label: "Above the typical range", min: 9, tone: "watch" },
];

export const ACTIVITY_MIN_BANDS: RangeBand[] = [
    { label: "Below the weekly guideline", max: 150, tone: "watch" },
    { label: "Meets the weekly guideline", min: 150, max: 300, tone: "normal" },
    { label: "Exceeds the baseline guideline", min: 300, tone: "normal" },
];

/* ------------------------------ QML Diagnostics ---------------------------- */

export const GLUCOSE_BANDS: RangeBand[] = [
    { label: "Normal", max: 100, tone: "normal" },
    { label: "Prediabetes range", min: 100, max: 126, tone: "watch" },
    { label: "Diabetes range", min: 126, tone: "high" },
];

export const A1C_BANDS: RangeBand[] = [
    { label: "Normal", max: 5.7, tone: "normal" },
    { label: "Prediabetes range", min: 5.7, max: 6.5, tone: "watch" },
    { label: "Diabetes range", min: 6.5, tone: "high" },
];

export const TOTAL_CHOL_BANDS: RangeBand[] = [
    { label: "Desirable", max: 200, tone: "normal" },
    { label: "Borderline high", min: 200, max: 240, tone: "watch" },
    { label: "High", min: 240, tone: "high" },
];

export const LDL_BANDS: RangeBand[] = [
    { label: "Optimal", max: 100, tone: "normal" },
    { label: "Near optimal", min: 100, max: 130, tone: "normal" },
    { label: "Borderline high", min: 130, max: 160, tone: "watch" },
    { label: "High", min: 160, max: 190, tone: "high" },
    { label: "Very high", min: 190, tone: "critical" },
];

export function classifyHDL(hdlMgDl: number, sex: "male" | "female"): ClassifiedResult {
    const lowCutoff = sex === "male" ? 40 : 50;
    const source = "NIH / AHA";
    if (hdlMgDl < lowCutoff) return { label: "Low — a cardiovascular risk factor", tone: "watch", source };
    if (hdlMgDl >= 60) return { label: "High — considered protective", tone: "normal", source };
    return { label: "Typical range", tone: "normal", source };
}

export const HR_BANDS: RangeBand[] = [
    { label: "Below the typical resting range", max: 60, tone: "watch" },
    { label: "Typical resting range", min: 60, max: 100, tone: "normal" },
    { label: "Above the typical resting range", min: 100, tone: "watch" },
];

export function classifyBloodPressure(systolic: number, diastolic: number): ClassifiedResult {
    const source = "American Heart Association";
    if (systolic > 180 || diastolic > 120)
        return { label: "Hypertensive crisis range — seek care promptly", tone: "critical", source };
    if (systolic >= 140 || diastolic >= 90)
        return { label: "Stage 2 hypertension range", tone: "high", source };
    if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89))
        return { label: "Stage 1 hypertension range", tone: "elevated", source };
    if (systolic >= 120 && systolic <= 129 && diastolic < 80)
        return { label: "Elevated", tone: "watch", source };
    if (systolic < 120 && diastolic < 80)
        return { label: "Normal range", tone: "normal", source };
    return { label: "Outside charted range — consider discussing with a clinician", tone: "watch", source };
}

export const SPO2_BANDS: RangeBand[] = [
    { label: "Typical", min: 95, tone: "normal" },
    { label: "Below typical — monitor", min: 90, max: 95, tone: "watch" },
    { label: "Low — seek medical attention", max: 90, tone: "critical" },
];

export const TEMP_C_BANDS: RangeBand[] = [
    { label: "Below typical", max: 36.1, tone: "watch" },
    { label: "Typical range", min: 36.1, max: 37.3, tone: "normal" },
    { label: "Elevated — monitor", min: 37.3, max: 38, tone: "watch" },
    { label: "Fever range", min: 38, tone: "high" },
];