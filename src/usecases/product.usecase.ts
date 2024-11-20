import { ICreateProduct, IUpdateProduct, IProduct, IMethodsRepositoryProduct } from "../interfaces/product.interface";
import { z } from 'zod';

export class ProductUsecase {
    private repositorie: IMethodsRepositoryProduct;

    constructor(repositorie: IMethodsRepositoryProduct) {
        this.repositorie = repositorie;
    }

    async create(data: ICreateProduct): Promise<IProduct> {
        const createProductSchema = z.object({
            name: z.string().min(1, { message: "Product name is required!" }),
            price: z.number().min(0, { message: "Price must be greater than or equal to 0!" }),
            stock: z.number().min(0, { message: "Stock must be greater than or equal to 0!" }),
        });

        const validatedData = createProductSchema.parse(data);

        const createdProduct = await this.repositorie.create(validatedData);

        return createdProduct;
    }

    async update(data: IUpdateProduct): Promise<IProduct> {
        const updateProductSchema = z.object({
            id: z.string().min(1, { message: "Product ID is required!" }),
            name: z.string().optional(),
            price: z.number().min(0).optional(),
            stock: z.number().min(0).optional(),
            isDeleted: z.boolean().optional(),
        });

        const validatedData = updateProductSchema.parse(data);

        const updatedProduct = await this.repositorie.update(validatedData);

        return updatedProduct;
    }

    async getById(id: string): Promise<IProduct> {
        if (!id) {
            throw new Error("Product ID is required!");
        }

        const product = await this.repositorie.getById(id);

        if (!product) {
            throw new Error("Product not found!");
        }

        return product;
    }

    async getAll(): Promise<IProduct[]> {
        const products = await this.repositorie.getAll();

        return products;
    }

    async delete(id: string): Promise<IProduct> {
        if (!id) {
            throw new Error("Product ID is required!");
        }

        const deletedProduct = await this.repositorie.delete(id);

        if (!deletedProduct) {
            throw new Error("Product not found!");
        }

        return deletedProduct;
    }
}
