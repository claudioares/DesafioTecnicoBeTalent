import { prisma } from "../DB/prisma.config";
import { ICreateProduct, IMethodsRepositoryProduct, IProduct, IUpdateProduct } from "../interfaces/product.interface";

export class ProductRepositorie implements IMethodsRepositoryProduct {
    async create(data: ICreateProduct): Promise<IProduct> {
        const resultDataBase = await prisma.product.create({
        data: {
            name: data.name,
            price: data.price,
            stock: data.stock,
        },
        });

        return resultDataBase;
    };

    async update(data: IUpdateProduct): Promise<IProduct> {
        const resultDataBase = await prisma.product.update({
        where: { id: data.id },
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                isDeleted: data.isDeleted,
            },
        });

        return resultDataBase;
    };

    async getById(id: string): Promise<IProduct> {
        const resultDataBase = await prisma.product.findUniqueOrThrow({
            where: { id },
        });

        return resultDataBase;
    };

    async getAll(): Promise<IProduct[]> {
        const resultDataBase = await prisma.product.findMany();

        return resultDataBase;
    };

    async delete(id: string): Promise<IProduct> {
        const resultDataBase = await prisma.product.update({
        where: { id },
            data: { isDeleted: true },
        });

        return resultDataBase;
    }
    
}