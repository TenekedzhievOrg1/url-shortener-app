import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/shorten", async (req, res) => {
  const { original_url } = req.body;
  if (!original_url)
    return res.status(400).json({ error: "original_url is required" });

  const short_url = nanoid(6);
  try {
    await pool.query(
      "INSERT INTO urls (short_url, original_url) VALUES ($1, $2)",
      [short_url, original_url]
    );
    res.json({
      short_url: `${
        process.env.REDIRECT_BASE_URL || "http://localhost:8080"
      }/api/redirect/${short_url}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Shortener service running on port ${process.env.PORT || 5000}`);
});
