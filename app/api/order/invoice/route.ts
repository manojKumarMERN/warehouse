import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Customer from "@/models/Customer";
import FinishedProduct from "@/models/FinishedProduct";
import { connectDB } from "@/lib/db";
import puppeteer from "puppeteer-core";
import { invoiceTemplate } from "@/templates/invoiceTemplate";
import { numberToWordsINR } from "@/utils/numberToWords";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { orderId } = await req.json();

        const order = await Order.findById(orderId)
            .populate("customer")
            .populate("items.product");

        if (!order) throw new Error("Order not found");

        const html = invoiceTemplate({
            invoiceNo: order.invoiceNo,
            date: new Date(order.createdAt).toLocaleDateString(),
            company: {
                name: "ABC Jewellery",
                address: "Chennai – India",
                phone: "+91 98765 43210",
                gstNumber: "GSTIN1234567890",
                logo: "https://your-logo-url.png",
                authorizedPerson: "Manager Name",
            },
            customer: order.customer,
            items: order.items.map((item: any) => ({
                productName: item.product.name,
                goldWeight: item.product.goldWeight,
                stoneWeight: item.product.stoneWeight,
                netWeight: item.product.netWeight,
                rate: item.rate,
                total: item.total,
            })),
            subTotal: order.subTotal,
            gstPercent: order.gstPercent,
            gstAmount: order.gstAmount,
            grandTotal: order.grandTotal,
            amountInWords: numberToWordsINR(order.grandTotal),
            paymentStatus: order.paymentStatus,
            advancePaid: order.advancePaid,
            dueAmount: order.dueAmount,
            qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay",
        });

        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
            executablePath: process.env.CHROME_BIN,
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({ format: "A4" });

        await browser.close();

        const pdfBuffer = Buffer.from(pdf);
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=${order.invoiceNo}.pdf`,
            },
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
