import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema(
    {
        material: {
            type: String,
            enum: ["Gold", "Silver", "Copper", "Stone"],
            required: true,
            unique: true,
        },
        purity: { type: Number }, // for metals (example: 91.6 / 75 / 18KT). for stones keep null
        weightInGram: { type: Number, default: 0 }, // total physical stock
        totalValue: { type: Number, default: 0 }, // INR total value stock
        avgPricePerGram: { type: Number, default: 0 }, // auto-calculate
    },
    { timestamps: true }
);

export default models.Inventory || model("Inventory", InventorySchema);
