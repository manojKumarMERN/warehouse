export const generateInvoiceNumber = () => {
  const prefix = "INV";
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}/${currentYear}/${random}`;
};
