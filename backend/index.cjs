const fastify = require("fastify")({
  logger: true,
});

const cors = require("@fastify/cors");

const routes = require("./src/routes/index.cjs");

// Register CORS middleware
fastify.register(cors, {
  origin: ["http://localhost:3000"], // Allow requests from your Next.js frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

fastify.register(routes);

fastify.listen({ port: process.env.PORT || 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
