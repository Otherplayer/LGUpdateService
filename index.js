
var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');


var app = express();
var jsonParser = bodyParser.json();// create application/json parser https://github.com/expressjs/body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });// create application/x-www-form-urlencoded parser

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Authorization, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.get('/login',function (request,response) {
    response.send(cool());
});

//// POST gets JSON bodies
app.post('/update', jsonParser, function(request, response) {

    var reqParams = request.body;
    logger(reqParams);

    if (!reqParams || !reqParams['v']) return request.sendStatus(400);

    if (reqParams['v'] != 'v1.0'){
        response.send({'shouldupdate':1,'immediate':0,'url':'https://www.baidu.com'});
    }else{
        response.send({'shouldupdate':0,'url':''});
    }


});



function logger(val) {
    console.log(val);
}

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

