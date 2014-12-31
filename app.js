var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var fs = require('fs');
var url = require('url');
var markdown = require('marked');

var routes = require('./routes/index');
var users = require('./routes/users');

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
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//special thanks to https://github.com/JamesHight/express-markdown
app.use(function(req, res, next) {
    var dir = __dirname + '/markdown';
    dir = path.resolve(dir);

    var file = req.url.toString(),
        fileLower = file.toLowerCase();

    if (fileLower.slice(-3) !== '.md' && fileLower.slice(-9) !== '.markdown')
        return next();

    file = dir + '/' + url.parse(file).pathname;
    file = path.resolve(file);

    // make sure the final path is in our defined directory
    if (file.substr(0, dir.length) !== dir)
        return res.send(400);

    fs.exists(file, function(exists) {
        if (!exists)
            return next();

        fs.readFile(file, 'utf8', function(err, data) {
            var context = {};
            if(err)
                return next(err);

            data = markdown(data);

            context['markdown'] = data;
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


module.exports = app;
