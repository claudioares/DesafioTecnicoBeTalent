import { ICreateUser, ILoginUser, IUpdateUser, IUser } from "../interfaces/user.interface";
import { MethodsRepositoryUser } from "../repositorie/user.repositorie";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

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

        const user = await this.repositorie.getByEmail(_data.email);
        if (user) {
            throw new Error('This user already exists');
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(_data.password, saltRounds);
        
        
        const userData = {
            ..._data,
            password: hashedPassword,
        };

        const resultRepositorie = await this.repositorie.create(userData);

        // Gerar o token JWT
        const token = jwt.sign(
            { id: resultRepositorie.id, email: resultRepositorie.email }, // Payload
            process.env.JWT_SECRET || "yourSecretKey", // Chave secreta
            { expiresIn: "1h" } // Tempo de expiração
        );
       
        return resultRepositorie;
    };

    async login (data:ILoginUser):Promise<IUser> {
        const loginUserSchema = z.object({
            email: z.string().email({ message: "Invalid email address!" }),
            password: z.string().min(6, { message: "Password should be at least 6 characters long!" }),
        });

        const _data = loginUserSchema.parse(data);

        const user = await this.repositorie.getByEmail(_data.email);
        if (!user) {
            throw new Error('User not found');
        };

        const isPasswordValid = await bcrypt.compare(_data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const loginUser = {
            email: user.email,
            password: user.password
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "yourSecretKey", 
            { expiresIn: "1h" }
        );

        const reaultLoginUser = await this.repositorie.login(loginUser);

         const newUserData = {
            ...reaultLoginUser,
            token,
        };

        return newUserData;
    };


    async update(data:IUpdateUser):Promise<IUser>{
        console.log('entrou no update')
        const updateUserSchema = z.object({
            id: z.string().min(1, { message: "User ID is required!" }),
            name: z.string().min(1, { message: "Name is required!" }).optional(),
            email: z.string().email({ message: "Invalid email address!" }).optional(),
            password: z.string().min(6, { message: "Password should be at least 6 characters long!" }).optional(),
        });

        const _data = updateUserSchema.parse(data);

        console.log('passou pelo data')


        const existingUser = await this.repositorie.getById(_data.id);
        if (!existingUser) {
            throw new Error('User not found!');
        };

        console.log('primeito if ')


        if (_data.password) {
            const hashedPassword = await bcrypt.hash(_data.password, 10);
            _data.password = hashedPassword;
        }
        
        console.log('segundo if ')

        const updatedUser = await this.repositorie.update(_data);

        console.log('retorno para router ')

        return updatedUser;
    };

     async getById(id:string):Promise<IUser>{
        if (!id) {
            throw new Error("User ID is required!");
        };

        const user = await this.repositorie.getById(id);

        if (!user) {
            throw new Error("User not found");
        };

        return user;
    };

     async delete(id:string):Promise<IUser>{
        if (!id) {
            throw new Error("User ID is required!");
        };

        const user = await this.repositorie.getById(id);

        if (!user) {
            throw new Error("User not found");
        };

        const deletedUser = await this.repositorie.delete(id);

         return deletedUser;
    };
}