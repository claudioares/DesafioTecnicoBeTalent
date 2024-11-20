import { prisma } from "../DB/prisma.config";
import { ICreateUser, IMethodsRepositoryUser, IUpdateUser, IUser } from "../interfaces/user.interface";

export class MethodsRepositoryUser implements IMethodsRepositoryUser {
    async create(data: ICreateUser): Promise<IUser> {
        const resultDataBase = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        return resultDataBase;
    };

    async update(data: IUpdateUser): Promise<IUser> {
        const resultDataBase = await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        return resultDataBase;
    };

    async getById(id: string): Promise<IUser> {
        const resultDataBase = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if (!resultDataBase) {
            throw new Error("User not found");
        }

        return resultDataBase;
    };

    async getAll(): Promise<IUser[]> {
        const resultDataBase = await prisma.user.findMany();
        return resultDataBase;
    };

    async delete(id: string): Promise<IUser> {
        const resultDataBase = await prisma.user.delete({
            where: {
                id: id,
            }
        });

        return resultDataBase;
    };
};