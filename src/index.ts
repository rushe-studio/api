import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' });
});

fastify.addHook('onRequest', (req, res, done) => {
    const { method, url } = req;
    console.log({ method, url });
    done();
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
