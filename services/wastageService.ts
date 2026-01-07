export const calculateWastage = (assignedItems: any[], returnedItems: any[], finalProductWeight: number) => {
    const totalAssigned = assignedItems.reduce((sum, item) => sum + item.weightInGram, 0);
    const totalReturned = returnedItems.reduce((sum, item) => sum + item.weightInGram, 0);

    return totalAssigned - (totalReturned + finalProductWeight);
};
