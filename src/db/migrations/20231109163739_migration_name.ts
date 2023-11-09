import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().notNullable();
      table.string('name').defaultTo('');
      table.string('email');
      table.string('role');
      table.jsonb('location').defaultTo(JSON.stringify({}));
      table.string('wallet_balance').defaultTo('0.00');

      table.timestamps(true, true);
    })
    .createTable('adverts', (table) => {
      table.uuid('id').primary().notNullable();

      table.string('name');
      table.jsonb('address').defaultTo(JSON.stringify({}));
      table.double('price').defaultTo(0);
      table.double('noOfRooms').defaultTo(0);
      table.jsonb('amenities').defaultTo(JSON.stringify([]));
      table.jsonb('media').defaultTo(JSON.stringify([]));
      table.boolean('isClosed').defaultTo(false);
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
    })
    .createTable('bids', (table) => {
      table.uuid('id').primary().notNullable();

      table.double('amount').defaultTo(0);
      table
        .uuid('advert_id')
        .references('id')
        .inTable('adverts')
        .onDelete('CASCADE')
        .notNullable();
      table
        .enum('status', ['PENDING', 'ACCEPTED', 'REJECTED'])
        .defaultTo('PENDING');
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
    })
    .createTable('transactions', (table) => {
      //transactions
      table.uuid('id').unique().primary().notNullable();
      table.string('amount');
      table.enu('transaction_type', ['Deposit', 'Transfer', 'Withdraw', 'Bid']);
      table.enu('transaction_action', ['Credit', 'Debit']);
      table
        .enu('transaction_status', ['Pending', 'Success', 'Failed'])
        .defaultTo('Pending');
      table.string('description');
      table.string('reason');
      table.string('reference');
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema

    .dropTableIfExists('transactions')
    .dropTableIfExists('bids')
    .dropTableIfExists('adverts')
    .dropTableIfExists('users');
}
