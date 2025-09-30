import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://user:pass@db:5432/url_shortener",
});

export default pool;
