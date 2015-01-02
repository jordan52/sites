var fs = require('fs');
var url = require('url');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');
var markdownUtils = require('../util/markdownUtils.js');

exports = module.exports = function (app){
    //crawl the markdown directory and post the results to app.pages
    var pages = {};
    fs.readdir(app.locals.markdownDir, function(err,files){
        var getMetadata = function (filename, callback){
            var meta;
            var content;

            fs.readFile(app.locals.markdownDir + '/' +filename, 'utf8', function (err, data) {
                try {
                    meta = JSON.parse(markdownUtils.getMarkdownHeader(data));
                    content = markdownUtils.getMarkdownContent(data);
                } catch (err){
                    console.log(filename + " has bad header " + err);
                }
                return callback(null, {
                    filename:filename,
                    link: filename.replace(/.md/i, '.html'),
                    metadata: meta,
                    content: content
                });
            });
        };
        async.map(files, getMetadata, function(err, results){
            pages = results;
            // This happens here so we can use the varialbes in jade templates (like, the global header.
            app.locals.pageLinks = _.map(_.filter(pages,function(page) {return page.metadata.type != 'blog';}), function(page) { return {title:page.metadata.shortTitle,link:page.link};});
            app.locals.s
        });
    });

    return {
        getAllPageLinks : function(){
            // app.locals.pageLinks is set when the markdown directory is crawled
            return app.locals.pageLinks;
        },
        getAllBlogPostLinks: function(){
            return _.map(_.sortBy(_.filter(pages,function(page) {return page.metadata.type == 'blog';}), 'metadata.created').reverse(), function(page) { return {title:page.metadata.shortTitle,link:page.link};});
        },
        getAllBlogPosts: function(){
            //return _.filter(pages,function(page) {return page.metadata.type == 'blog';});
            return _.sortBy(_.filter(pages,function(page) {return page.metadata.type == 'blog';}), 'metadata.created').reverse();
        },
        getPageByLink: function (link){
            var match = _.where(pages,{ link:link });

            if(match.length < 1){
                throw new Error('page not found');
            }

            return match[0];
        }
    }
}