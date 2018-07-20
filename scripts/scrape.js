// var request = require("request");
// var cheerio = require("cheerio");

// var scrape = function(callback) {

//    var dbArticle = [];

//    request("https://www.huffingtonpost.com/section/travel", function(error, response, html) {

//      var $ = cheerio.load(html);

//      $('.card_content').each(function(i, element) {

//        var result = {};

//        result.title = $(this).children("a").text();
//        result.link = $(this).children("a").attr("href");

//        if (result.title !== "" && result.link !== "") {
//            dbArticle.push(result);
//        }
//      });
//      callback(dbArticle);
//    });
// };

// module.exports = scrape;