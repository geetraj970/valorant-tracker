import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = '20357f39-1e1b-4e1c-af3a-dec6f269a91c'; // Put your Tracker API key in environment variable

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/rank", async (req, res) => {
  try {
    const response = await fetch(
      "https://public-api.tracker.gg/v2/valorant/standard/profile/ap/Reflex%23fav",
      {
        headers: {
          "TRN-Api-Key": API_KEY,
          "Accept": "application/json"
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data from Tracker API" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rank data" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
