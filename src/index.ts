import Fastify from 'fastify';
import { routesLogger } from '@/application/hooks/routesLogger';
import { Logger } from '@/application/services/logger';
import { Constants } from '@/config/constants';

const fastify = Fastify();

fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' });
});

fastify.addHook('onRequest', routesLogger);

fastify.listen({ port: Constants.API_PORT }, (err, address) => {
    Logger.info(`API started at port ${Constants.API_PORT}`, 'index.ts');

    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
