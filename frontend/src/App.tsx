import { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const res = await fetch("/api/shortener/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: originalUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.short_url);
      } else {
        setError(data.error || "Something went wrong");
      }
      setLoading(false);
    } catch (err) {
      setError((err as { message: string })?.message);
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>URL Shortener</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required={true}
        />
        <button type="submit">Shorten</button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        shortUrl && (
          <div>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
