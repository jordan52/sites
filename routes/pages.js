var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var markdownUtils = require('../util/markdownUtils.js')

var config = require('../config')

router.get('/', function(req, res) {

    //return res.json(_.map(req.app.pages, function(page) { return {title:page.metadata.title,link:page.link}; }));
   // return res.json(req.app.pages);
});


module.exports = router;