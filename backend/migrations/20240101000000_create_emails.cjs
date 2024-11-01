exports.up = function (knex) {
  return knex.schema.createTable("emails", (table) => {
    table.increments("id").primary();
    table.string("to").notNullable();
    table.string("cc");
    table.string("bcc");
    table.string("subject").notNullable();
    table.text("body");
    table.boolean("favorite").defaultTo(false);
    table.boolean("archived").defaultTo(false);
    table.boolean("deleted").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("emails");
};
