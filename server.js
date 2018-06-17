"use strict";

// Must use express, express-handlebars, mongoose, body-parser, cheerio,
// request/axios
const path         = require("path");
const express      = require("express");
const bodyParser   = require("body-parser");
const logger       = require("morgan");
const mongoose     = require("mongoose");
const axios        = require("axios");
const cheerio      = require("cheerio");
const exphbs       = require("express-handlebars");
// const request   = require("request");  axios substituted for request
const serveStatic  = require("serve-static");

var db = require("./models");

var utilFuncs = require("./public/app.js");

const PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static(path.join(__dirname, "/public")));
app.engine('handlebars', exphbs( { extname: '.handlebars',
                                   defaultLayout : 'main',
                                   layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// N.B.
//     The MacRumors site was chosen for scraping because most major 
//     newspaper sites have implemented a paywall

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/macRumorsArticles");

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging throwing an error or other logic here
});

// A GET route for scraping the MacRumors website
app.get("/scrapearticles", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.macrumors.com/").then(function(response) {

      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      $("div.article").each(function(i, element) {
        var result = {};
        result.title   = $(this).children("h2.title").text();
        result.url     = $(this).children("h2.title").children("a").attr("href");
        result.byline  = $(this).children("div.byline").html();
        result.content = $(this).children("div.content").html();

        // Prevent duplicates by checking for the existence of this
        // title and url
        insertIfNotFound(db, result);
      });

      // If we were able to successfully scrape and save Articles
      // or find duplicates, send a message to the client
      res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
app.get("/getarticles", function(req, res) {
  // Get every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to find Articles, send them back to the client
      // (we have to do some editing on the bylines because they contain
      //  an embeded anchor tag)
      utilFuncs.stripAnchorTags(dbArticle);

      // (we have to create summaries from the articles' content)
//    utilFuncs.createSummaries(dbArticle);  NEEDS DEBUGGING

      // send the edited content to the client
      res.render("index", { papers: dbArticle });
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting a specific article based on ObjectId
app.get("/getarticles/:id", function(req, res) {
  // Using the id passed in the id parameter, find the matching 
  // article in the database.
  db.Article.findOne({ _id: req.params.id })
    // and populate all of the associated comments
    .populate("comments")
    .then(function(dbArticle) {
      // send article back to client upon success
      res.json(dbArticle);
    })
    .catch(function(err) {
      // report any error to the client as well
      res.json(err);
    });
});

// check for the existence of this title and url before inserting
function insertIfNotFound(db, object) {
  db.Article.findOne(
    { title: object.title,
      url:   object.url },
    function (err, doc) {
      if (doc === null) {
        // the article was NOT found -- ok to insert
        // Create a new Article
        db.Article.create(object)
          .then(function(dbArticle) {
            console.log(dbArticle);   // TWH DEBUG
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      } else {
        // this document/article is already in the database
        console.log("Duplicate found:"); // TWH DEBUG
        console.log(object.title);       // TWH DEBUG
        console.log(object.url);         // TWH DEBUG
        console.log("\n");               // TWH DEBUG
      }
    });
}


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
