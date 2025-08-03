const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ← правильно написано express.json()

const dataDir = path.join(__dirname, "data");

// GET /questions
app.get("/questions", (req, res) => {
  const file = path.join(dataDir, "questions.json");
  const data = fs.readFileSync(file, "utf-8");
  res.json(JSON.parse(data));
});

// POST /questions
app.post("/questions", (req, res) => {
  const file = path.join(dataDir, "questions.json");
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
