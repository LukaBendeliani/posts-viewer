const express = require("express");
const fs = require("fs");
const posts = require("./posts.json");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const find = (key, values = [], arr, i = 0) => {
  if (i < arr.length) {
    Object.values(arr[i]).forEach((val) => {
      if (typeof val === "object") {
        find(key, values, val, i);
      }
    });

    if (Object.keys(arr[i]).includes(key)) {
      if (!values.includes(arr[i][key])) {
        values.push(arr[i][key]);
      }

      find(key, values, arr, i + 1);
    }
  }
  return values;
};

app.get("/posts", (req, res) => {
  const data = fs.readFileSync("./posts.json", "utf8");
  res.send(JSON.stringify(data));
});

app.get("/users", (req, res) => {
  const users = find("name", [], posts, 0);
  res.send(JSON.stringify(users));
});

app.post("/posts", ({ body }, res) => {
  fs.writeFileSync("./posts.json", JSON.stringify(body));
  res.send(JSON.stringify(body));
});

app.listen(3001);
