import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
 
const poolConnection = await mysql.createPool(
  process.env.DB_URL as string
);
 
export const db = drizzle(poolConnection);