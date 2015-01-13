var fs = require('fs');
var url = require('url');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');
var markdownUtils = require('../util/markdownUtils.js');
var Feed = require('feed');

exports = module.exports = function (app){
    //crawl the markdown directory and post the results to app.pages
    var pages = {};
    fs.readdir(app.locals.markdownDir, function(err,files){
        var getMetadata = function (filename, callback){
            var meta;
            var content;

            if (filename.toLowerCase() != filename) {
                throw Error('markdown filenames must not contain uppercase letters: ' + filename);
            }
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
            // This happens here so we can use the variables in jade templates (like, the global header.
            app.locals.pageLinks = _.map(_.filter(pages,function(page) {return page.metadata.type != 'blog';}), function(page) { return {title:page.metadata.shortTitle,link:page.link, categories: page.metadata.categories};});
            app.locals.pageCategories = _.uniq(_.flatten(_.map(app.locals.pageLinks, function(pageLink) { return pageLink.categories; },{})));
            var catPageLinks = {};
            // make a category -> pageLink data structure
            for(i=0; i < app.locals.pageLinks.length;i++){
                if(app.locals.pageLinks[i].categories) {
                    for (j = 0; j < app.locals.pageLinks[i].categories.length; j++) {
                        var cat = app.locals.pageLinks[i].categories[j];
                        if (!catPageLinks[cat]) catPageLinks[cat] = [];
                        catPageLinks[cat][catPageLinks[cat].length] = app.locals.pageLinks[i];
                    }
                } else {
                    var cat = 'uncategorized';
                    if (!catPageLinks[cat]) catPageLinks[cat] = [];
                    catPageLinks[cat][catPageLinks[cat].length] = app.locals.pageLinks[i];
                }
            }
            app.locals.pageLinksByCategory = catPageLinks;

            app.locals.blogPostLinks = _.map(_.sortBy(_.filter(pages,function(page) {return page.metadata.type == 'blog';}), 'metadata.created').reverse(), function(page) { return {title:page.metadata.shortTitle,link:page.link};});

            app.locals.blogPosts = _.sortBy(_.filter(pages,function(page) {return page.metadata.type == 'blog';}), function(page){ return page.metadata.created; }).reverse();

            app.locals.feed = new Feed({
                title:       'Standard Automata',
                description: 'things by a nobody in particular',
                link:        'http://standardautomata.com/',
                image:       'http://standardautomata.com/img/robot.png',
                copyright:   'All rights reserved 2015, Jordan Woerndle',

                author: {
                    name:    'Jordan Woerndle',
                    link:    'https://standardautomata.com/johndoe'
                }
            });
            for(var key in app.locals.blogPosts){
                console.log(app.locals.blogPosts[key].metadata.title);
                console.log(app.locals.blogPosts[key].metadata.summary);
                console.log('http://standardautomata.com/' +app.locals.blogPosts[key].link + '\n\n ');
                app.locals.feed.addItem({
                    title:          app.locals.blogPosts[key].metadata.title,
                    link:           'http://standardautomata.com/' +app.locals.blogPosts[key].link,
                    description:    app.locals.blogPosts[key].metadata.summary,
                    author: [
                        {
                            name:   'Jordan Woerndle',
                            link:   'https://standardautomata.com/'
                        }
                    ],
                    date:           moment(app.locals.blogPosts[key].metadata.created).toDate()
                });
            }
        });
    });

    return {
        getAllPageLinks : function(){
            // app.locals.pageLinks is set when the markdown directory is crawled
            return app.locals.pageLinks;
        },
        getAllBlogPostLinks: function(){
            return app.locals.blogPostLinks;
        },
        getAllBlogPosts: function(){
           return app.locals.blogPosts;
        },
        getPageByLink: function (link){
            var match = _.where(pages,{ link:link });

            if(match.length < 1){
                throw new Error('page not found');
            }

            return match[0];
        },
        getAllByTag : function(tag){
            return _.sortBy(_.filter(pages,function(page) {return _.contains(page.metadata.tags, tag);}), 'metadata.created').reverse()
        },
        getAllByCategory : function(cat){
            return _.sortBy(_.filter(pages,function(page) {return _.contains(page.metadata.categories, cat);}), 'metadata.created').reverse()
        }
    }
}