import { getQCImpact } from "./qcBonusService";

export const calculateSalary = (data: any) => {
    // Base salary calculation
    const baseAmount =
        data.method === "GRAM"
            ? data.finalProductWeight * data.ratePerGram
            : data.ratePerPiece;

    const wastageDeduction = data.wastageGrams * data.wastageRate;

    // QC Bonus / Deduction Logic
    const qcImpact = getQCImpact(data.qcScore); // 0–10 score
    const qcBonusOrPenalty = (baseAmount * qcImpact.bonusPercent) / 100;

    // Final Salary
    const finalPayment = baseAmount - wastageDeduction + qcBonusOrPenalty;

    return {
        baseAmount,
        wastageDeduction,
        qcBonusOrPenalty,
        bonusPercent: qcImpact.bonusPercent,
        finalPayment,
    };
};
