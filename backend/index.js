const express = require("express");
const fs = require("fs");
const posts = require("./posts.json");
const cors = require("cors");
const app = express();
app.use(cors());
app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.listen(3001);
