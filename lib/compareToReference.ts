// @ts-nocheck
import bmiData from './reference-data/bmi-classes.json';
import bpData from './reference-data/blood-pressure-categories.json';
import lifeData from './reference-data/life-expectancy-bands.json';
import symptomData from './reference-data/symptom-severity-reference.json';

export const compareBiometrics = (heightCm: number, weightKg: number, sys: number, dia: number) => {
    // BMI Math
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiResult = bmiData.data.find((b) => bmi < b.max);

    // BP Math
    const bpResult = bpData.data.find((b) => sys < b.sysMax && dia < b.diaMax) || bpData.data[bpData.data.length - 1];

    return {
        bmi: { value: bmi.toFixed(1), classification: bmiResult?.classification, sourceLabel: bmiData.source },
        bp: { value: `${sys}/${dia}`, classification: bpResult?.classification, sourceLabel: bpData.source }
    };
};

export const compareQML = (smoking: boolean, exercise: string, familyHistory: boolean) => {
    let projection = lifeData.data.base_baseline;
    if (smoking) projection += lifeData.data.smoker_penalty;
    if (exercise === '1-2x') projection += lifeData.data.exercise_bonus_1_2;
    if (exercise === '3+') projection += lifeData.data.exercise_bonus_3_plus;
    if (familyHistory) projection += lifeData.data.family_history_penalty;

    return {
        value: `~${projection} Years`,
        classification: "Illustrative population baseline variance",
        sourceLabel: lifeData.source
    };
};

export const compareSwarm = (temp: number, days: number) => {
    let severity = 'low';
    if (temp > 100.4 || days > 3) severity = 'medium';
    if (temp > 103 || days > 7) severity = 'high';

    return {
        value: `Severity: ${severity.toUpperCase()}`,
        classification: symptomData.data[severity as keyof typeof symptomData.data],
        sourceLabel: symptomData.source
    };
};