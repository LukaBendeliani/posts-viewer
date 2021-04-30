const { exec } = require("child_process");

exec("cd ./backend && npm install", (err, stdout, stderr) => {
  if (err) console.log(err);
  console.log(stdout, stderr);
  exec("cd ./backend && node index.js", () => {
    (err, stdout, stderr) => {
      if (err) console.log(err);
      console.log(stdout, stderr);
    };
  });
});

exec("cd ./frontend && yarn", (err, stdout, stderr) => {
  if (err) console.log(err);
  console.log(stdout, stderr);
  exec("cd ./frontend && yarn start", () => (err, stdout, stderr) => {
    if (err) console.log(err);
    console.log(stdout, stderr);
  });
});
