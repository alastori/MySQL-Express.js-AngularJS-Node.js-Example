var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var mysql = require('../models/news.js');

router.get('/news', function (req, res, next) {
  mysql.getAll(function (error, news) {
    if (error) { return next(error); }
    res.json(news);
  });
});

router.post('/comments/:_Id', function (req, res, next) {
  mysql.addComment(req.body, function (error, comment) {
    if (error) { return next(error); }
    res.json(comment);
  });
});

router.post('/addnews', function (req, res, next) {
  mysql.create(req.body, function (error, news) {
    if (error) { return next(error); }
    res.json(news);
  });
});

