async function emailRoutes(fastify) {
  const db = require("../db");

  fastify.get("/api/emails", async (request) => {
    const { search } = request.query;
    return search ? await db.emails.search(search) : await db.emails.getAll();
  });

  fastify.get("/api/emails/:id", async (request) => {
    return await db.emails.getById(request.params.id);
  });

  fastify.post("/api/emails", async (request) => {
    return await db.emails.create(request.body);
  });

  fastify.delete("/api/emails/:id", async (request) => {
    return await db.emails.delete(request.params.id);
  });

  fastify.put("/api/emails/:id/favorite", async (request) => {
    return await db.emails.favorite(request.params.id);
  });

  fastify.delete("/api/emails/:id/favorite", async (request) => {
    return await db.emails.unfavorite(request.params.id);
  });

  fastify.put("/api/emails/:id/archive", async (request) => {
    return await db.emails.archive(request.params.id);
  });

  fastify.delete("/api/emails/:id/archive", async (request) => {
    return await db.emails.unarchive(request.params.id);
  });
}

module.exports = emailRoutes;
