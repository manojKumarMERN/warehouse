export const getQCImpact = (score: number) => {
    if (score >= 9) return { bonusPercent: 10 };     // Excellent (10% bonus)
    if (score >= 8) return { bonusPercent: 7 };      // Very Good
    if (score >= 7) return { bonusPercent: 5 };      // Good
    if (score >= 6) return { bonusPercent: 3 };      // Normal
    if (score >= 5) return { bonusPercent: 0 };      // No bonus
    if (score >= 4) return { bonusPercent: -3 };     // Minor issues
    if (score >= 3) return { bonusPercent: -5 };     // Poor QC
    return { bonusPercent: -10 };                    // Very poor (Deduction)
};
