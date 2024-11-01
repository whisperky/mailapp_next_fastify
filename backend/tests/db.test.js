const databaseService = require("../src/db/index.js");
const EmailRepository = require("../src/db/repositories/EmailRepository");
const LeadRepository = require("../src/db/repositories/LeadRepository");
const knex = require("knex");
const path = require("path");

// Setup test database
const testDb = knex({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  migrations: {
    directory: path.join(__dirname, "../migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "../seeds"),
  },
  useNullAsDefault: true,
});

describe("Database Operations", () => {
  let emailRepo;
  let leadRepo;
  let trx;

  // Sample test data
  const sampleEmails = [
    {
      to: "user1@example.com",
      subject: "Team Meeting",
      body: "Let's meet tomorrow",
      favorite: 0,
      archived: 0,
    },
    {
      to: "user2@example.com",
      subject: "Project Update",
      body: "Project is on track",
      favorite: 1,
      archived: 0,
    },
  ];

  const sampleLeads = [
    {
      name: "John Doe",
      email: "john@company.com",
      company: "Company A",
    },
    {
      name: "Jane Smith",
      email: "jane@startup.com",
      company: "Startup B",
    },
  ];

  beforeAll(async () => {
    await testDb.migrate.latest();
  });

  beforeEach(async () => {
    trx = await testDb.transaction();

    // Create new instances with transaction
    emailRepo = new EmailRepository(trx);
    leadRepo = new LeadRepository(trx);

    // Insert sample data within the transaction
    await trx("emails").insert(sampleEmails);
    await trx("leads").insert(sampleLeads);
  });

  afterEach(async () => {
    await trx.rollback();
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  describe("Email Operations", () => {
    test("getAll should handle empty database", async () => {
      await trx("emails").delete();
      const emails = await emailRepo.getAll();
      expect(emails).toEqual([]);
    });

    test("create should reject invalid email format", async () => {
      const invalidEmail = {
        to: "invalid-email",
        subject: "Test",
        body: "Test",
      };
      await expect(emailRepo.create(invalidEmail)).rejects.toThrow(
        "Invalid email format"
      );
    });

    test("getAll should return all emails", async () => {
      const emails = await emailRepo.getAll();
      expect(Array.isArray(emails)).toBe(true);
      expect(emails.length).toBeGreaterThan(0);
    });

    test("search should return matching emails", async () => {
      const results = await emailRepo.search("Team Meeting");
      expect(Array.isArray(results)).toBe(true);
      expect(
        results.some((email) => email.subject.includes("Team Meeting"))
      ).toBe(true);
    });

    test("create should insert new email", async () => {
      const newEmail = {
        to: "test@example.com",
        subject: "Test Email",
        body: "Test content",
      };
      const result = await emailRepo.create(newEmail);
      expect(result[0]).toHaveProperty("id");
      expect(result[0].to).toBe(newEmail.to);
    });

    test("favorite should update favorite status", async () => {
      const email = await emailRepo.create({
        to: "test@example.com",
        subject: "Favorite Test",
        body: "Test content",
      });
      const result = await emailRepo.favorite(email[0].id);
      expect(result[0].favorite).toBe(1);
    });

    test("unfavorite should remove favorite status", async () => {
      const email = await emailRepo.create({
        to: "test@example.com",
        subject: "Unfavorite Test",
        body: "Test content",
      });
      await emailRepo.favorite(email[0].id);
      const result = await emailRepo.unfavorite(email[0].id);
      expect(result[0].favorite).toBe(0);
    });

    test("archive and unarchive should work correctly", async () => {
      const email = await emailRepo.create({
        to: "test@example.com",
        subject: "Archive Test",
        body: "Test content",
      });

      const archived = await emailRepo.archive(email[0].id);
      expect(archived[0].archived).toBe(1);

      const unarchived = await emailRepo.unarchive(email[0].id);
      expect(unarchived[0].archived).toBe(0);
    });
  });

  describe("Lead Operations", () => {
    test("create should create new lead", async () => {
      const newLead = {
        name: "Test Lead",
        email: "lead@example.com",
        company: "Test Co",
      };
      const result = await leadRepo.create(newLead);
      expect(result[0]).toHaveProperty("id");
      expect(result[0].name).toBe(newLead.name);
    });

    test("getAll should return all leads", async () => {
      const leads = await leadRepo.getAll();
      expect(Array.isArray(leads)).toBe(true);
    });
  });
});
