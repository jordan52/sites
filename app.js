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

var moment = require('moment');
var session = require('express-session');
var flash = require('express-flash');
var stylus = require('stylus');
var bootstrap = require('bootstrap-styl');
var markdownUtils = require('./util/markdownUtils.js')

/* ROUTES */
var routes = require('./routes/index');
var users = require('./routes/users');
var pages = require('./routes/pages');

/* CONFIGURATION */

var markdownDir = __dirname + '/markdown';
markdownDir = path.resolve(markdownDir);

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret
    //store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));
//set up stylus to use bootstrap-styl
app.use(stylus.middleware({
    dest: path.join(__dirname, 'public'),
    src: path.join(__dirname, 'public'),
    compile: function (str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true)
            .use(bootstrap());
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.route('/pages').get(function(req, res, next) {
    return res.json(
        _.map(_.filter(req.app.pages,function(page) {return page.metadata.type != 'blog';}), function(page) { return {title:page.metadata.title,link:page.link};})
    );
});
app.route('/blog/entries').get(function(req, res, next) {
    return res.json(
        _.map(_.filter(req.app.pages,function(page) {return page.metadata.type == 'blog';}), function(page) { return {title:page.metadata.title,link:page.link};})
    );
});

//look in the markdown folder for any
app.use(function(req, res, next) {

    var file = req.url.toString();
    var file = file.toLowerCase();

    if (file.slice(-5) !== '.html')
        return next();

    file = url.parse(file)
    file = file.pathname.replace(/.html/i, '.md');
    file = markdownDir + file
    file = path.resolve(file);

    // does the file exist?
    if (file.substr(0, markdownDir.length) !== markdownDir)
        return next();

    fs.exists(file, function(exists) {
        if (!exists)
            return next();

        fs.readFile(file, 'utf8', function(err, data) {
            var context = {};
            if(err)
                return next(err);
            context['markdown'] = markdownUtils.getMarkdownContent(data);
            meta = JSON.parse(markdownUtils.getMarkdownHeader(data));
            context['metadata'] = meta.title + moment(meta.created).format('MM/DD/YYYY');
            res.render('site', context);
        });
    });
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


// on startup crawl the markdown directory and post the results to app.pages
fs.readdir(markdownDir, function(err,files){
    var getMetadata = function (filename, callback){
        var meta;
        var content;

        fs.readFile(markdownDir + '/' +filename, 'utf8', function (err, data) {
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
    async.map(files, getMetadata, function(err, results){ app.pages = results});
});


module.exports = app;
