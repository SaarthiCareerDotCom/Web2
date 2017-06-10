
var request= require('request');
var express = require('express');
var path = require('path');
var app = express();
var x="";
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/try.html'));
});
app.get('/payment_redirect',function(req,res){

  res.sendFile(path.join(__dirname,'/redirect.html'));
});
app.get('/payment',function(req,res){


var headers = { 'X-Api-Key': 'aa8ff19fddf6cabc8d923b7d401ba7b6', 'X-Auth-Token': '7e40194c2a81ddcd85fdf57382342991'};
var payload = {
  purpose: 'FIFA 16',
  amount: '1001',
  phone: '9916804203',
  buyer_name: 'godzilla',
  redirect_url: 'http://localhost:3000/payment_redirect',
  send_email: true,
  webhook: 'http://www.example.com/webhook/',
  send_sms: true,
  email: 'anuragbabel11@gmail.com',
  allow_repeated_payments: false};



request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){

    console.log(body);
    var data = JSON.parse(body);

    console.log(error);

  console.log( data ) ;
//console.log(data["payment_request"]["longurl"]);
 x = data["payment_request"]["longurl"];
//request.get(x,function(err,res,body){
//  console.log(body);
res.redirect(x);
});


});


app.listen(3000);
