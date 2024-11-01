class LeadRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    return this.db("leads").select("*").orderBy("created_at", "desc");
  }

  async getById(id) {
    return this.db("leads").where({ id }).first();
  }

  async create(data) {
    return this.db("leads").insert(data).returning("*");
  }
}

module.exports = LeadRepository;
