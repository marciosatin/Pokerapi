var express = require("express"),
    http = require("http"),
    poker = require("./poker.js"),
    app = express();

app.use(express.static(__dirname + "/client"));

//Efetua o parse dos objetos de entrada
app.use(express.urlencoded());

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// set up our routes
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});

// set up the root route
app.get("/", function (req, res) {
    res.send("This is the root route!");
});

app.post("/hand", function (req, res) {
    // res.send("This is the hand route!");
    console.log(req.body.hand);
    var result = poker.getHand(req.body.hand);
    res.json(result);
});
