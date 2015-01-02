var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //req.flash('success', { msg: 'Flashing message here.'});
  res.render('index', { title: 'Standard Automata', posts: req.app.pages.getAllBlogPosts(), pageLinks: req.app.pages.getAllPageLinks()});
});



module.exports = router;
