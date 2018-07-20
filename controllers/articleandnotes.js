// var Note = require("../models/Note");
// var Article = require("../models/Article");
var db = require("../models");
var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// SCRAPING 

// A GET route for scraping the  website
// A GET route for scraping the  website
router.get("/scrape", (req, res) => {
    console.log("scrape ran")
    // First, we grab the body of the html with request
    request("https://www.huffingtonpost.com/section/travel", (error, response, body) => { //html
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(body);
            let count = 0;

            // Grab Article 
            $(".card_content").each(function(i, element) {
                let count = i;
                var result = {};
            
                // Add the text and href for each link + summary and bylines 

                result.title = $(element)
                    .children(".card_details")
                    .children(".card_headlines")
                    .children(".card_headline")
                    .children(".card_link")
                    .children(".card_headline_text")
                    .text().trim();

                result.summary = $(element)
                    .children(".card__details")
                    .children(".card__headlines")
                    .children(".card__description")
                    .text().trim();

                result.image = $(element)
                    .children("a").children(".card__image").children("img")
                    .attr("src")

                result.link = $(element)
                    .children(".card__details")
                    .children(".card__headlines")
                    .children(".card__description")
                    .children("a")
                    .attr("href")

                if(result.title && result.link && result.summary){
                
                    Article.create(result)
                    .then(function(dbArticle){
                        count++;
                        console.log(dbArticle);
                    })
                    
                    .catch(function(err){
                        return res.json(err);
                    });

                }; 
            
            });
            
            res.redirect('/')
        } 

        else if (error || response.statusCode !=200) {
            res.send("Error: Unable to obtain new articles")
        }

    });

});

//////

// module.exports = function(router) {

router.get("/", (req, res) => {
    Article.find({})
        .then(function (dbArticle) {
           
            var retrievedArticles = dbArticle;
            let hbsObject;
            hbsObject = {
                articles: dbArticle
            };
            res.render("index", hbsObject);        
        }).catch(function (err) {
            res.json(err);
        });
});

router.get("/saved", (req, res) => {
    Article.find({isSaved: true}).then(function (retrievedArticles) {
            let hbsObject;
            hbsObject = { articles: retrievedArticles};
            res.render("saved", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });
});

// Route for getting all Articles from the db
router.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});

router.put("/save/:id", function (req, res) {
    Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: true })
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        });;
});

router.put("/remove/:id", function (req, res) {
    Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: false })
        .then(function (data) {
            res.json(data)
        }).catch(function (err) {
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function (req, res) {
    Article.find({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate({
            path: 'note',
            model: 'Note'
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});


// Routes for creating, saving and deleting notes: 

    router.post("/note/:id", function (req, res){
        // create
    
        Note.create(req.body).then(function(dbNote){
            return db.Article.findOneAndUpdate({
                _id: req.paraps.id
            },{
                $push: { note: dbNote._id }
            },{
                new: true
            });
        }).then(function(dbArticle){
            //if article succesfully updated then send back to the "client"
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err);
        });
    });
    
    router.delete("/note/:id", function(req,res){
        // make a note and pass to the req.body 
    
        Note.findByIdAndRemove({ _id: req.params.id }) 
        .then(function(dbNote){
            return db.Article.findOneAndUpdate({
                note: req.params.id
            },{
                $pullAll: [{ note: req.params.id}]
            });
        }).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err);
        });
    });
    
// }


 
module.exports = router;