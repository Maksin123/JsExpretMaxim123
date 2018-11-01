var express = require('express');
var routerLogger = express.Router();

/* GET home page. */
routerLogger.get('*', function(req, res, next) {

    //path

    console.log(`Начало запроса: ${process.hrtime()[0] * 1e9 + process.hrtime()[1]} nanoseconds`);
    console.log({
        url:req.url,
        val:req.params
    })
    req.on('end', () => {
        console.log(`Конец Запроса ${process.hrtime()[0] * 1e9 + process.hrtime()[1]} nanoseconds`);
    })

    next();
    
});

//UTM

module.exports = routerLogger;