var express = require('express');
var router = express.Router();

const fs = require('fs');
const split2 = require('split2');
const parseCSV = require('../parseCSV');
const through2 = require('through2');

/* GET getListItemById page. */
router.get('/:id', function(req, res, next) {

  let preResponse = 'OutOfRange';

  let index = 0;

  if(Number(req.params.id) == NaN) {
    preResponse = 'NotANumber'
  }

  fs.createReadStream('sample.csv')
  .pipe(split2())
  .pipe(parseCSV(through2))
  .pipe(through2.obj((data, enc, cb) => {
    
      if(index++ == req.params.id)
        preResponse = data;

      return cb(null, data);

  }))
  .on('finish' , () => {
      res.render('getListById', { d: JSON.stringify(preResponse) });
  })

});

router.get('/' , (req, res, next) => {
  res.render('getListById', { d: 'Format: getListItemById/{ID :Number}' });
})

module.exports = router;
