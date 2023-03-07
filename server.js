// Import Express library
const express = require("express");

// Create express app
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/guestbook", (req, res) => {
  res.send("Having Guestbook!");
});

app.get("/newmessage", (req, res) => {
  res.send("newMessage is here!");
});

app.get("/ajaxmessage", (req, res) => {
  res.send("ajaxMessage  is here!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
