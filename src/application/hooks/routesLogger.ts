import { Logger } from '@/application/services/logger';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, HTTPMethods } from 'fastify';

export const routesLogger = (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction): void => {
    const { method, url } = req;
    if (req.server.hasRoute({ url, method: method as HTTPMethods })) {
        Logger.info('Request', `${method} ${url}`);
    } else {
        Logger.error('Invalid request', `${method} ${url}`);
    }

    done();
};