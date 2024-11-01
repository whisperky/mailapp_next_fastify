/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("emails").del();
  await knex("emails").insert([
    {
      to: "john.doe@example.com",
      cc: "manager@example.com",
      bcc: "hr@example.com",
      subject: "Project Update Q1",
      body: "Here are the latest updates for Q1 2024...",
      favorite: false,
      archived: false,
      deleted: false,
    },
    {
      to: "team@example.com",
      cc: "director@example.com",
      subject: "Team Meeting",
      body: "Weekly team meeting agenda...",
      favorite: false,
      archived: false,
      deleted: false,
    },
  ]);
};
