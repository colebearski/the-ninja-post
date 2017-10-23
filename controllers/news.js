// Dependancies
var router = express.Router();
var express = require("express");
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// MongoDB Models
var Articles = require("../models/articles");
var Comments = require("../models/comments");

// Website to be scraped
var url = "https://www.washingtonpost.com/business/technology/?utm_term=.1aab7eeb2b7e";

// Test Route to Verify Scraping Model works
router.get("/test", function(req, res) {
	// body of the html with request
	request(url, function(error, response, html) {
		// load into Cheerio and save it to $ for a shorthand selector
		var $ = cheerio.load(html);
			var result = [];
			// Story Headline
			$(".story-headline").each(function(i, element) {

				// May need to be adjusted for the page

				var title = $(element).find("a").find("img").attr("title");
				var storyLink = $(element).find("a").attr("href");
				var imgLink = $(element).find("a").find("img").attr("src");
				var summary = $(element).find(".story-description").text();

				// May need to trim the fat

				result.push({
					Title: title,
					Story: storyLink,
					Link: imgLink,
					Summary: summary
				});
			});
			console.log(result);
			res.send(result);
	});
});