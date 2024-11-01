const db = require("./config");
const EmailRepository = require("./repositories/EmailRepository");
const LeadRepository = require("./repositories/LeadRepository");

class DatabaseService {
  constructor(db) {
    this.emails = new EmailRepository(db);
    this.leads = new LeadRepository(db);
  }
}

const databaseService = new DatabaseService(db);
module.exports = databaseService;
