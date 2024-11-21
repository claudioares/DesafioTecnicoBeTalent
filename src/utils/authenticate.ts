import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';


export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {

    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
        reply.status(401).send({ error: 'Authorization token is required' });
        return;
    };


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourSecretKey");
        request.user = decoded;
    } catch (err) {
        reply.status(401).send({ error: 'Invalid or expired token' });
    }
};
