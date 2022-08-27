import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("allergy", (table) => {
    table.increments("allergy_id");
    table.string("name").notNullable();
    table.string("symptoms").notNullable();
    table.integer("severity");
    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("user_table_id").notNullable();
    table
      .foreign("user_table_id")
      .references("user_id")
      .inTable("user_account")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("allergy");
}
