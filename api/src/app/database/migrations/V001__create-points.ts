import Knex from 'knex';

const TABLE = 'point';

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists(TABLE, (table) => {
    table.bigIncrements('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE);
}
