import { FastifyInstance } from "fastify"
import { ICreateUser, IUser } from "../../interfaces/custumer.interface";
import { UserUseCase } from "../../usecases/user.usecase";

export async function CreateUser(app: FastifyInstance) {

    app.post("/users", async (request, reply) => {

        const data: ICreateUser = request.body as ICreateUser;

        try {
            const usecase = new UserUseCase();
            const {id}:IUser = await usecase.create(data) as IUser;

            return reply.status(201).send({ data: { id }});

        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    })
}