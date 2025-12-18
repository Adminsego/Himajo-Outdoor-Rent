import mysql from "mysql2/promise";

const {
  DB_HOST = "127.0.0.1",
  DB_PORT = "3306",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "himajo",
} = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
  namedPlaceholders: true,
});

export async function query<T = any>(sql: string, params: Record<string, any> = {}) {
  const [rows] = await pool.query<T & any[]>(sql, params);
  return rows as unknown as T[];
}
