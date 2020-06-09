import Knex from 'knex';

const TABLE = 'point_item';

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists(TABLE, (table) => {
    table.bigIncrements('id').primary();
    table
      .specificType('point_id', 'bigint unsigned')
      .notNullable()
      .references('id')
      .inTable('point');
    table
      .specificType('item_id', 'bigint unsigned')
      .notNullable()
      .references('id')
      .inTable('item');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE);
}
