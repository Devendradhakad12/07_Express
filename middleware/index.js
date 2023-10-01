const express = require("express");

const app = express();

//* middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("I am middleware");
  return next();
});
app.use((req, res, next) => {
  req.responseTime = new Date(Date.now()).toString();
  console.log({
    method: req.method,
    Time: req.responseTime,
    Path: req.path,
    Params: req.params,
    Hostname: req.hostname,
  });
  return next();
});

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") return next();
  res.send("Access Denied!");
};

//* routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Im groot!" });
});
app.get("/random", (req, res) => {
  res.status(200).json({ message: "Im random!" });
});

app.get("/api", checkToken, (req, res) => {
  res.status(200).json({ message: "Im data!" });
});

// 404
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(6060, () => {
  console.log(`http://localhost:6060`);
});
