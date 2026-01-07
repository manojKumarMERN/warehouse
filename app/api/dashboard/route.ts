import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import Inventory from "@/models/Inventory";
import Worker from "@/models/Worker";
import JobWork from "@/models/JobWork";

export async function GET(req: Request) {
  try {
    await connectDB();

    const user: any = (req as any).user;
    const { role, userId, branchId } = user;

    let response: any = {};

    if (role === "super-admin") {
      response.orders = {
        total: await Order.countDocuments(),
        completed: await Order.countDocuments({ status: "completed" }),
        pending: await Order.countDocuments({ status: "pending" })
      };

      const revenue = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
      const payments = await Payment.aggregate([{ $group: { _id: null, received: { $sum: "$amount" } } }]);

      response.revenue = {
        totalRevenue: revenue[0]?.total || 0,
        received: payments[0]?.received || 0,
        due: (revenue[0]?.total || 0) - (payments[0]?.received || 0)
      };

      response.inventory = await Inventory.find();
      response.workers = await Worker.countDocuments({ status: "active" });
    }

    if (role === "admin") {
      response.orders = {
        total: await Order.countDocuments({ branch: branchId }),
        completed: await Order.countDocuments({ branch: branchId, status: "completed" }),
        pending: await Order.countDocuments({ branch: branchId, status: "pending" })
      };

      response.inventory = await Inventory.find({ branch: branchId });
      response.workers = await Worker.countDocuments({ branch: branchId, status: "active" });
    }

    if (role === "worker") {
      const jobWorks = await JobWork.find({ worker: userId });
      const completed = jobWorks.filter(j => j.status === "completed").length;

      response.jobs = {
        total: jobWorks.length,
        completed,
        pending: jobWorks.length - completed
      };

      const payments = await Payment.aggregate([
        { $match: { worker: userId } },
        { $group: { _id: null, amount: { $sum: "$amount" } } }
      ]);

      response.salary = payments[0]?.amount || 0;
    }

    if (role === "customer") {
      const orders = await Order.find({ customer: userId });
      response.orders = orders;
    }

    return NextResponse.json({ success: true, data: response });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
