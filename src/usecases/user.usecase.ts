import { ICreateUser, IUpdateUser, IUser } from "../interfaces/user.interface";
import { MethodsRepositoryUser } from "../repositorie/user.repositorie";
import { z } from "zod";
import bcrypt from 'bcryptjs';

export class UserUseCase {
    
    private repositorie: MethodsRepositoryUser;

    constructor() {
        this.repositorie = new MethodsRepositoryUser();
    };


    async create(data:ICreateUser):Promise<IUser>{

        const createUserSchema = z.object({
            name: z.string().min(1, { message: "Name is required!" }),
            email: z.string().email({ message: "Invalid email address!" }),
            password: z.string().min(6, { message: "Password should be at least 6 characters long!" }),
        });

        const _data = createUserSchema.parse(data);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(_data.password, saltRounds);
        
        const userData = {
            ..._data,
            password: hashedPassword,
        };

        const resultRepositorie = await this.repositorie.create(userData);

        return resultRepositorie;
    };

    async update(data:IUpdateUser):Promise<IUser>{
        const updateUserSchema = z.object({
            id: z.string().min(1, { message: "User ID is required!" }),
            name: z.string().min(1, { message: "Name is required!" }).optional(),
            email: z.string().email({ message: "Invalid email address!" }).optional(),
            password: z.string().min(6, { message: "Password should be at least 6 characters long!" }).optional(),
        });

        const _data = updateUserSchema.parse(data);

        const existingUser = await this.repositorie.getById(_data.id);
        if (!existingUser) {
            throw new Error('User not found!');
        };

         if (_data.password) {

            const isPasswordCorrect = await bcrypt.compare(_data.password, existingUser.password);
            if (isPasswordCorrect) {
                throw new Error('The new password cannot be the same as the current password.');
            }
            
            const hashedPassword = await bcrypt.hash(_data.password, 10);
            _data.password = hashedPassword;
        }

        const updatedUser = await this.repositorie.update(_data);

        return updatedUser;
    };

    //  async getById(id:string):Promise<IUser>{
    //     return {id:'', email: '', password: ''}
    // };
    //  async delete(id:string):Promise<IUser>{
    //     return {id:'', email: '', password: ''}
    // };
}