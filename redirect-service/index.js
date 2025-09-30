import express from "express";
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/:short_url", async (req, res) => {
  const { short_url } = req.params;
  try {
    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_url=$1",
      [short_url]
    );
    if (result.rows.length === 0) return res.status(404).send("URL not found");
    res.redirect(302, result.rows[0].original_url);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Redirect service running on port ${process.env.PORT || 5001}`);
});
