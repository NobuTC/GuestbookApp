// Import Express library
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const port = 3000;
const dataFile = "guestBookData.json";

// CONFIGURE EXPRESS APP
// Create express app
const app = express();
// get JSON data from request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

// GET request on / route
app.get("/", (req, res) => {
  res.render("pages/frontpage");
});

/**
 * "/guestbook" –route will load a JSON-file and parse it on the page as a formatted table
 * (use either Bootstrap or Pure.css to style the table).
 * Sample JSON file is available here; http://pastebin.com/VpbJqSicLinks
 */
app.get("/guestbook", (req, res) => {
  fs.readFile(dataFile, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    res.render("pages/guestBook", { data: parsedData });
  });
});

app.get("/newmessage", (req, res) => {
  res.render("pages/newMessage");
});

//receiving data from form.
app.post("/newmessage", (req, res) => {
  const username = req.body.username;
  const country = req.body.country;
  const message = req.body.message;

  fs.readFile(dataFile, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    // Add new data to the parseData
    parsedData.push({
      username,
      country,
      message,
      id: String(parsedData.length + 1),
    });

    // Write back data to the file
    fs.writeFile(dataFile, JSON.stringify(parsedData), (error) => {
      if (error) {
        console.error(`There is error!`);
      } else {
        console.log(`Data is succesfully saved!`);
        res.redirect("/guestbook");
      }
    });
  });
});

//receiving data from form.
app.post("/ajaxmessage", (req, res) => {
  const username = req.body.username;
  const country = req.body.country;
  const message = req.body.message;

  fs.readFile(dataFile, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    parsedData.push({
      username,
      country,
      message,
      id: String(parsedData.length + 1),
    });

    fs.writeFile(dataFile, JSON.stringify(parsedData), (error) => {
      if (error) {
        console.error(`There is error!`);
      } else {
        console.log(`Data is succesfully saved!`);
        // Return to client only
        const onlyMessages = parsedData.map((data) => {
          return data.message;
        });

        res.json(onlyMessages);
      }
    });
  });
});

app.get("/ajaxmessage", (req, res) => {
  res.render("pages/ajaxMessage");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
