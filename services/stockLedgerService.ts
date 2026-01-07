import StockLedger from "@/models/StockLedger";

export const updateInventoryAfterProductAdd = async (product: any) => {
    await StockLedger.create({
        type: "IN",
        reference: "Finished Product",
        referenceId: product._id,
        material: product.material,
        weight: product.netWeight,
        cost: product.totalCost,
    });
};
