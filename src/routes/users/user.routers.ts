import { FastifyInstance } from "fastify"
import { UserUseCase } from "../../usecases/user.usecase";
import { ICreateUser, ILoginUser, IUser } from "../../interfaces/user.interface";
import { authenticate } from "../../utils/authenticate";


export async function UserRouters(app: FastifyInstance) {
    const usecase = new UserUseCase();

    app.post("/users", async (request, reply) => {

        const data: ICreateUser = request.body as ICreateUser;

        try {
            const { id }:IUser = await usecase.create(data) as IUser;

            return reply.status(201).send({ id });

        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    });

    app.post("/login", async (request, reply) => {

        const data: ILoginUser = request.body as ILoginUser;

        try {
            
            const useLogin:IUser = await usecase.login(data);

            return reply.status(201).send(useLogin.token);

        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    });

    app.put("/users/:id", { preHandler: authenticate }, async (request, reply) => {
        try {
            const { id } = request.params as { id: string };

            const body = request.body as {
                name?: string;
                email?: string;
                password?: string;
            };

            const updatedUser = await usecase.update({
                id,
                name: body.name,
                email: body.email,
                password: body.password,
            });

            const { password, ...userWithoutPassword } = updatedUser;

            return reply.status(201).send(userWithoutPassword);

        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    });

    app.get("/users/:id", { preHandler: authenticate }, async (request, reply) => {
        try {

            const { id } = request.params as { id: string };

            const user = await usecase.getById(id);

            if (!user) {
                return reply.status(404).send({ message: "User not found" });
            }

            const { password, ...userWithoutPassword } = user;

            return reply.status(200).send(userWithoutPassword);

        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    });

    app.delete("/users/:id", { preHandler: authenticate }, async (request, reply) => {
        try {
            const { id } = request.params as { id: string };

            const deletedUser = await usecase.delete(id);

            if (!deletedUser) {
                return reply.status(404).send({ message: "User not found" });
            }

            const { password, ...userWithoutPassword } = deletedUser;

            return reply.status(200).send({
                message: "User successfully deleted",
                user: userWithoutPassword,
            });
        } catch (error) {
            console.error('Error during event create:', error);
            return reply.status(500).send({ error: "Error during creation!" });
        }
    });
}