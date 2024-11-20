import fastify, { FastifyInstance } from "fastify"
import cors from "@fastify/cors";
import { CreateUser } from "./routes/users/user.create";


export class App {
    private app: FastifyInstance;
    constructor() {
        this.app = fastify()
    }


    listen(){
        this.app.listen({
            host: '0.0.0.0',
            port: process.env.PORT ? Number(process.env.PORT) : 3333,
        }).then(()=>console.log("HTTP Server running..."));
    };

    register(){
        this.app.register(cors, {
            origin: "*",
            methods: ['POST', 'DELETE', 'GET']
        });
        this.app.register(CreateUser);
    }
}