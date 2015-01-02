var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //req.flash('success', { msg: 'Flashing message here.'});
  res.render('index', { title: 'Standard Automata', posts: req.app.pages.getAllBlogPosts()});
});



module.exports = router;
