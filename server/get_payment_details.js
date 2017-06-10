var request= require('request');
var express = require('express');
var app = express();
var headers = { 'X-Api-Key': 'aa8ff19fddf6cabc8d923b7d401ba7b6', 'X-Auth-Token': '7e40194c2a81ddcd85fdf57382342991'};
var id = "f3194e6cd4e447c5a277347f623b2a9a";
app.get('/get_details',function(req,res){

request.get('https://test.instamojo.com/api/1.1/payment-requests/'+id, {headers: headers}, function(error, response, body){

    console.log(body);

});

//res.end(""+res);
});
app.listen(3000);
