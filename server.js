const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var baseUrl ="https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2";
  var options ={
    url :  "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2",
    method : "GET",
    qs : {
      from: crypto,
      to : fiat,
      amount: amount
    } 

  };
  request(options, function (error, res, body) {
    var data = JSON.parse(body);
    var price = data.price;
    console.log(price);
    var currentDate = data.display_timestamp;
    res.write("<p>The current data is "+ currentDate + "</p>");
    res.write("<h1>The current price of" + crypto + " is " + price + fiat + "USD </h1>");
    res.send();
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
