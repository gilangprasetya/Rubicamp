var express = require('express');
var router = express.Router();

module.exports = function(db){

  //manggil JQuery index
router.get('/', function(req, res, next) {
  res.render('index');
});

//manggil Vanilla index
router.get('/vanilla', function(req, res, next) {
  res.render('vanilla');
});

return router;
}