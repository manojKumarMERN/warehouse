import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SalaryRecord from "@/models/SalaryRecord";
import { calculateSalary } from "@/services/salaryCalculator";

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        const result = calculateSalary(data);

        const salaryRecord = await SalaryRecord.create({
            worker: data.worker,
            jobWork: data.jobWork,
            calculationMethod: data.method,
            finalProductWeight: data.finalProductWeight,
            baseAmount: result.baseAmount,
            wastageDeduction: result.wastageDeduction,
            qcBonusOrPenalty: result.qcBonusOrPenalty,
            bonusPercent: result.bonusPercent,
            finalPayment: result.finalPayment,
            qcScore: data.qcScore,
            notes: data.notes || "",
        });
        return NextResponse.json({ success: true, salaryRecord });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
