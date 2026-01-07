import Supplier from "@/models/Supplier";

export const SupplierService = {
    create: async (payload: any) => Supplier.create(payload),
    list: async () => Supplier.find(),
    get: async (id: string) => Supplier.findById(id),
    update: async (id: string, payload: any) => Supplier.findByIdAndUpdate(id, payload, { new: true }),
    remove: async (id: string) => Supplier.findByIdAndDelete(id),
};
