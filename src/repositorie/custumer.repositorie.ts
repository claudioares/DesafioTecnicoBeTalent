import { prisma } from "../DB/prisma.config";
import { ICreateCustomer, ICustomer, IMethodsRepositoryCustomer, IUpdateCustomer } from "../interfaces/custumer.interface";

export class MethodsRepositoryCustumer implements IMethodsRepositoryCustomer{
    async create(data: ICreateCustomer): Promise<ICreateCustomer> {
        const resultDataBase = await prisma.customer.create({
            data: {
                name: data.name,
                email: data.email,
                userId: data.userId,
            }
        });

        return resultDataBase;
    }

    async update(data: IUpdateCustomer): Promise<ICustomer> {
        const resultDataBase = await prisma.customer.update({
        where: { id: data.id },
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
        },
        });

        return resultDataBase;
    }

    async getById(id: string): Promise<ICustomer> {
        const resultDataBase = await prisma.customer.findUniqueOrThrow({
            where: { id },
        });

        return resultDataBase;
    }

    async getAll(): Promise<ICustomer[]> {
        const resultDataBase = await prisma.customer.findMany();

        return resultDataBase;
    }

    async delete(id: string): Promise<ICustomer> {
        const resultDataBase = await prisma.customer.delete({
            where: { id },
        });

        return resultDataBase;
    }
}
   