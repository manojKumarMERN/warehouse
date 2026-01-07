export const generateInvoice = (count: number) => {
    const year = new Date().getFullYear().toString().slice(-2);
    return `INV-${year}-${String(count + 1).padStart(5, "0")}`;
};
