const express = require("express");
const fs = require("fs");
const posts = require("./posts.json");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.post("/comments", ({ body: { postId, name, profile, content } }, res) => {
  const found = posts.find((post) => post.postId === postId);
  const index = posts.indexOf(found);
  found.comments.push({ content, profile, name });
  posts[index] = found;
  fs.writeFileSync("./posts.json", JSON.stringify(posts));
  res.send(JSON.stringify(posts));
});

app.listen(3001);
