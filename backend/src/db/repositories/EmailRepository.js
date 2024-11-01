class EmailRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    return this.db("emails").select("*").orderBy("created_at", "desc");
  }

  async search(searchTerm) {
    return this.db("emails")
      .where("subject", "like", `%${searchTerm}%`)
      .orWhere("body", "like", `%${searchTerm}%`)
      .orderBy("created_at", "desc");
  }

  async getById(id) {
    return this.db("emails").where({ id }).first();
  }

  async create(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.to)) {
      throw new Error("Invalid email format");
    }

    return this.db("emails").insert(email).returning("*");
  }

  async updateFlag(id, flag, value) {
    return this.db("emails")
      .where({ id })
      .update({ [flag]: value })
      .returning("*");
  }

  async favorite(id) {
    return this.updateFlag(id, "favorite", 1);
  }

  async unfavorite(id) {
    return this.updateFlag(id, "favorite", 0);
  }

  async archive(id) {
    return this.updateFlag(id, "archived", 1);
  }

  async unarchive(id) {
    return this.updateFlag(id, "archived", 0);
  }

  async delete(id) {
    return this.updateFlag(id, "deleted", 1);
  }

  async restore(id) {
    return this.updateFlag(id, "deleted", 0);
  }
}

module.exports = EmailRepository;
