
import bcrypt from 'bcryptjs';
import { ICreateCustomer, ICustomer, IMethodsRepositoryCustomer, IUpdateCustomer } from '../interfaces/custumer.interface';
import z from 'zod';

export class CustomerUsecase {
    private repositorie: IMethodsRepositoryCustomer;

    constructor(repositorie: IMethodsRepositoryCustomer) {
        this.repositorie = repositorie;
    }

   // Método para criar um cliente
    async create(data: ICreateCustomer): Promise<ICustomer> {
        // Definindo o esquema de validação com Zod
        const createCustomerSchema = z.object({
            name: z.string().min(1, { message: "Name is required!" }),
            email: z.string().email({ message: "Invalid email address!" }),
            userId: z.string().min(1, { message: "userId is required!" }),
        });

        const validatedData = createCustomerSchema.parse(data);

        // Criando o cliente
        const createdCustomer = await this.repositorie.create(validatedData);
        return createdCustomer as ICustomer;
    }
    
    async update(data: IUpdateCustomer): Promise<ICustomer> {
        const customer = await this.repositorie.getById(data.id);
        if (!customer) {
            throw new Error("Customer not found");
        }

        const updatedCustomer = await this.repositorie.update(data);
        return updatedCustomer;
    }

    async getById(id: string): Promise<ICustomer> {
        if (!id) {
            throw new Error("Customer ID is required!");
        }

        const customer = await this.repositorie.getById(id);
        if (!customer) {
            throw new Error("Customer not found");
        }

        return customer;
    }

    async getAll(): Promise<ICustomer[]> {
        const customers = await this.repositorie.getAll();
        return customers;
    }

    async delete(id: string): Promise<ICustomer> {
        if (!id) {
            throw new Error("Customer ID is required!");
        }

        const customer = await this.repositorie.getById(id);
        if (!customer) {
            throw new Error("Customer not found");
        }

        const deletedCustomer = await this.repositorie.delete(id);
        return deletedCustomer;
    }
}
