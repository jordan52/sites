var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var config = require('../config')

/* GET home page. */
router.get('/', function(req, res) {
    var pages = {};
    fs.readdir(path.resolve(__dirname + '/../markdown'), function(err,files){

        pages.pages = files;
    });
    res.json(pages);
});



module.exports = router;