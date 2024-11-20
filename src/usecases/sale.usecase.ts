import { ICreateSale, IMethodsRepositorySale, ISale } from "../interfaces/sale.interface";
import { z } from 'zod';

export class SaleUsecase {
    private repositorie: IMethodsRepositorySale;

    constructor(repositorie: IMethodsRepositorySale) {
        this.repositorie = repositorie;
    }

    async create(data: ICreateSale): Promise<ISale> {
        const createSaleSchema = z.object({
            customerId: z.string().min(1, { message: "Customer ID is required!" }),
            productId: z.string().min(1, { message: "Product ID is required!" }),
            quantity: z.number().min(1, { message: "Quantity must be at least 1!" }),
            price: z.number().min(0, { message: "Price must be greater than or equal to 0!" }),
        });

        const validatedData = createSaleSchema.parse(data);

        const createdSale = await this.repositorie.create(validatedData);

        return createdSale;
    }

    async getById(id: string): Promise<ISale> {
        if (!id) {
            throw new Error("Sale ID is required!");
        }

        const sale = await this.repositorie.getById(id);

        if (!sale) {
            throw new Error("Sale not found!");
        }

        return sale;
    }

    async getAll(): Promise<ISale[]> {
        const sales = await this.repositorie.getAll();

        return sales;
    }
}
