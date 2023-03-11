// Import Express library
const express = require("express");

const fs = require("fs");

// Create express app
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/frontpage");
});

/**
 * "/guestbook" –route will load a JSON-file and parse it on the page as a formatted table
 * (use either Bootstrap or Pure.css to style the table).
 * Sample JSON file is available here; http://pastebin.com/VpbJqSicLinks
 */
app.get("/guestbook", (req, res) => {
  fs.readFile("guestBookData.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    res.render("pages/guestBook", { data: parsedData });
  });
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
