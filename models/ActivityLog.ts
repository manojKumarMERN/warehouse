import { Schema, model, models } from "mongoose";

const activityLogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    module: { type: String, required: true }, // "Order" | "Inventory" | "Expense" | ...
    action: { type: String, required: true }, // "CREATE" | "UPDATE" | "DELETE" | "STAGE_CHANGE" | ...
    referenceId: { type: Schema.Types.ObjectId, required: true }, // target record ID
    description: { type: String, required: true },
    oldData: { type: Object, default: null },
    newData: { type: Object, default: null },
  },
  { timestamps: true }
);

export default models.ActivityLog || model("ActivityLog", activityLogSchema);
