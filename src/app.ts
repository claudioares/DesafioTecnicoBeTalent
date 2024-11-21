import fastify, { FastifyInstance } from "fastify"
import cors from "@fastify/cors";
import { UserRouters } from "./routes/users/user.routers";
import fastifyJwt from 'fastify-jwt';


export class App {
    private app: FastifyInstance;
    constructor() {
        this.app = fastify();

        this.app.register(fastifyJwt, {
            secret: process.env.JWT_SECRET || 'yourSecretKey',
            sign: { expiresIn: '1h' }, 
        });
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
        this.app.register(UserRouters);
    }
}