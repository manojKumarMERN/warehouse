import Inventory from "@/models/Inventory";

export const updateInventoryAfterPurchase = async (items: any[]) => {
  for (const item of items) {
    const { material, purity, weightInGram, totalPrice } = item;

    // find existing inventory row
    let existing = await Inventory.findOne({ material });

    if (existing) {
      // Update weight
      const newWeight = existing.weightInGram + weightInGram;
      const newTotalValue = existing.totalValue + totalPrice;

      // Recalculate average price
      const avgPrice = newTotalValue / newWeight;

      existing.weightInGram = newWeight;
      existing.totalValue = newTotalValue;
      existing.avgPricePerGram = Number(avgPrice.toFixed(2));

      await existing.save();
    } else {
      // first-time purchase → create inventory item
      await Inventory.create({
        material,
        purity,
        weightInGram,
        totalValue: totalPrice,
        avgPricePerGram: totalPrice / weightInGram,
      });
    }
  }
};
