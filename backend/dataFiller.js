const fs = require("fs");
const posts = require("./posts.json");

const names = [
  "Harry",
  "Ross",
  "Bruce",
  "Cook",
  "Carolyn",
  "Morgan",
  "Albert",
  "Walker",
  "Randy",
  "Reed",
  "Larry",
  "Barnes",
  "Lois",
  "Wilson",
  "Jesse",
  "Campbell",
  "Ernest",
  "Rogers",
  "Theresa",
  "Patterson",
];

for (let i = 0; i < 20; i++) {
  const post = {
    userId: i,
    name: names[i],
    title: `post${i}`,
    content:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,",
    comments: [],
    profile: "http://localhost:3001/profile.png",
  };

  posts.push(post);
}

fs.writeFileSync("./posts.json", JSON.stringify(posts));
