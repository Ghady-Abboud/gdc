require("dotenv").config();
/*
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_URL,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default client;

*/
import postgres from "postgres";
const sql = postgres(
  `postgresql://postgres.ibewwoloutrmxnquvvyx:aTGfF1CWJR3gPR06@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
);

export default sql;
