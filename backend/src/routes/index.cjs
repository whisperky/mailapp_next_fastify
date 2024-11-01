const emailRoutes = require("./email.routes");
const leadRoutes = require("./lead.routes");

async function routes(fastify) {
  fastify.register(emailRoutes);
  fastify.register(leadRoutes);
}

module.exports = routes;
