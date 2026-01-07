import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Worker from "@/models/Worker";
import SalaryPayment from "@/models/SalaryPayment";

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        const worker = await Worker.findById(data.worker);
        if (!worker) {
            return NextResponse.json(
                { success: false, message: "Worker not found" },
                { status: 404 }
            );
        }

        // Check if enough pending balance
        if (worker.pendingSalary < data.amountPaid) {
            return NextResponse.json(
                { success: false, message: "Amount exceeds pending salary" },
                { status: 400 }
            );
        }

        // Insert payment record
        const payment = await SalaryPayment.create({
            worker: data.worker,
            amountPaid: data.amountPaid,
            paymentMethod: data.paymentMethod,
            transactionId: data.transactionId,
            notes: data.notes || "",
        });

        // Update worker wallet
        worker.pendingSalary -= data.amountPaid;
        worker.totalPaidSalary += data.amountPaid;
        await worker.save();

        return NextResponse.json({ success: true, payment });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
