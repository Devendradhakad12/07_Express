import express from "express";

const app = express();
const PORT = 7700;

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`<h1>Nothing searched</h1>`);
  } else {
    res.status(200).json({ q });
  }
});

app.get("/searchanything", (req, res) => {
  const q = req.query;
  res.status(200).json({ q });
});

app.get("/:username", (req, res) => {
  const username = req.params.username.toUpperCase();
  res.status(200).json({ username });
});
app.get("*", (req, res) => {
  res.status(404).send("this path does not exist");
});

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
