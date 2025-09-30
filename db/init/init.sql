CREATE TABLE IF NOT EXISTS urls (
    short_url VARCHAR(10) PRIMARY KEY,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    used_count INT NOT NULL DEFAULT 0
);