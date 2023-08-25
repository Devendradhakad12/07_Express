const express = require("express");
const app = express();
const PORT = 8080;

// standerd middilwere 
app.use(express.urlencoded({extended:true}))// set up POST request rout to get some response
app.use(express.json())

app.get("/register", (req, res) => {
  res.status(200).json(req.query);
});

app.post("/register", (req, res) => {
    let data = req.body
    console.log(data)
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`app is listning on http://localhost:${PORT}`);
});
