var express = require('express');
var router = express.Router();

const fs = require('fs');
const split2 = require('split2');
const parseCSV = require('../parseCSV');
const through2 = require('through2');


/* GET getList page. */
router.get('/', function(req, res, next) {

  let preResponse = [];
  let index = 0;

  fs.createReadStream('sample.csv')
  .pipe(split2())
  .pipe(parseCSV(through2))
  .pipe(through2.obj((data, enc, cb) => {
    preResponse.push({id:index++,data});
    return cb(null, data);
  }))
  .on('finish', () => {
    res.render('getList', { data: JSON.stringify(preResponse) });
  })


});

module.exports = router;


/*
  .pipe(data => {through2.obj((data, enc, cb) => {
    console.log(data);
    cb(null,data);
  })})


*/