import { prisma } from "../DB/prisma.config";
import { ICreateSale, IMethodsRepositorySale, ISale } from "../interfaces/sale.interface";

export class SaleRepositorie implements IMethodsRepositorySale {
    async create(data: ICreateSale): Promise<ISale> {
        const resultDataBase = await prisma.sale.create({
        data: {
            customerId: data.customerId,
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
        },
        });

        return resultDataBase;
    };

    async getById(id: string): Promise<ISale> {
        const resultDataBase = await prisma.sale.findUniqueOrThrow({
            where: { id },
        });

        return resultDataBase;
    };

    async getAll(): Promise<ISale[]> {
        const resultDataBase = await prisma.sale.findMany();

        return resultDataBase;
    }
}