import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST_PROD,
      port: Number(process.env.DB_PORT_PROD),
      database: process.env.DB_NAME_PROD,
      user: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      ssl: true
    },
    pool: {
      min: 0,
      max: 5,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config