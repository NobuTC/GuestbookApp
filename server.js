// Import Express library
const express = require("express");

// Create express app
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/frontpage.html");
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
