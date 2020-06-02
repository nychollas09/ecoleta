import Knex from 'knex';

const TABLE = 'item';

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists(TABLE, (table) => {
    table.bigIncrements('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE);
}
