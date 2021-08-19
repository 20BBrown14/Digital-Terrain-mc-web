import { createSingleton } from "./createSingleton";
const pgp = require('pg-promise')();

const POSTGRES_DB_USER = process.env.POSTGRES_DB_USER || '';
const POSTGRES_DB_PASS = process.env.POSTGRES_DB_PASS || '';
const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST || '';
const POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT || 0;
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME || '';

const dbConfig = {
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT,
  database: POSTGRES_DB_NAME,
  user: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASS,
  max: 1,
}


interface IDatabaseScope {
  db: any;
  pgp: any;
}

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>('digital-terrain-db', () => {
    return {
      db: pgp(dbConfig),
      pgp,
    };
  });
};