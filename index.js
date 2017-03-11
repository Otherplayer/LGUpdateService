
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
    console.log(request.body);
    response.send(cool());
});

//// POST /webhook gets JSON bodies
app.post('/update', jsonParser, function(request, response) {

    var reqParams = request.body.result;
    logger(reqParams);

    // if (reqParams['action']['name'] != 'postalcode.action'){
    //     return {};
    // }
    // var parameters = reqParams.action["parameters"];
    // var zone = parameters["geo-city"];
    // var post = cost[zone];
    // var speech = "您好，" + zone + " 的邮编是 " + post + " 。";
    // if (!post || post == 'undefined'){
    //     speech = '不好意思，未能查询到' + zone + '的邮编。';
    // }
    // logger(speech);
    //
    // var result = {
    //     "speech": speech,
    //     "displayText": speech,
    //     "source": "online-postal-code-query"
    // };
    //
    // if (!request.body) return request.sendStatus(400);
    // response.send(result);

});



function logger(val) {
    console.log(val);
}

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
