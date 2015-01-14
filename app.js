var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var async = require('async');
var _ = require('lodash');

var pages = require('./pages/pages.js');

var moment = require('moment');
var session = require('express-session');
var flash = require('express-flash');
var stylus = require('stylus');
var markdownUtils = require('./util/markdownUtils.js')

/* ROUTES */
var routes = require('./routes/index');
var users = require('./routes/users');


/* CONFIGURATION */
var config = require('./config');

var app = express();
app.locals.markdownDir = path.resolve(__dirname + '/markdown');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret
    //store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use(function (req, res, next) {
    if ('/robots.txt' == req.url) {
        res.type('text/plain')
        res.send("User-agent: *\nDisallow: /css\nDisallow: /fonts\nDisallow: /js");
    } else {
        next();
    }
});
app.route('/feed/').get(function(req, res, next) {
    res.type('application/rss+xml');
    return res.send(req.app.locals.feed.render('rss-2.0'));
});
app.route('/feed/rss/').get(function(req, res, next) {
    res.type('application/rss+xml');
    return res.send(req.app.locals.feed.render('rss-2.0'));
});
app.route('/feed/atom/').get(function(req, res, next) {
    res.type('application/rss+xml');
    return res.send(req.app.locals.feed.render('atom-1.0'));
});
app.route('/pages').get(function(req, res, next) {
    return res.json(req.app.pages.getAllPageLinks());
});
app.route('/blog/posts').get(function(req, res, next) {
    return res.json(req.app.pages.getAllBlogPostLinks());
});
app.route('/tag/:tag').get(function(req, res, next){
    var tag = req.param('tag');
    req.flash('success', { msg: 'Content Tagged With "' + tag + '"'});
    res.render('index', { posts: req.app.pages.getAllByTag(tag)});
});
app.route('/category/:cat').get(function(req, res, next){
    var cat = req.param('cat');
    req.flash('success', { msg: 'Content in the "' + cat + '" Category'});
    res.render('index', { posts: req.app.pages.getAllByCategory(cat)});
});

//look in app.pages for any matches
app.use(function(req, res, next) {

    try {
        var file = req.url.toString().toLowerCase();
    } catch(err){
        return next();
    }
    if (file.slice(-5) !== '.html')
        return next();

    file = file.slice(1);

    try {
        var match = app.pages.getPageByLink(file);
    } catch(err){
        return next();
    }

    match = [match];
    res.render('index', { posts: match});

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//this crawls the markdown folder and sets up the pages module
app.pages = pages(app)

module.exports = app;
