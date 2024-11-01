async function leadRoutes(fastify) {
  const db = require("../db");

  fastify.get("/api/leads", async () => {
    return await db.leads.getAll();
  });

  fastify.get("/api/leads/:id", async (request) => {
    return await db.leads.getById(request.params.id);
  });

  fastify.post("/api/leads", async (request) => {
    return await db.leads.create(request.body);
  });
}

module.exports = leadRoutes;
