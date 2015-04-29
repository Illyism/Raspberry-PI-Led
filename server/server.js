var config = require("./config");

var Leds = require("./leds");
var restify = require("restify");
var server = restify.createServer();


server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    origins: ['http://localhost', 'http://localhost:3000']
}));

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});


// API

server.get("/led", function(req, res, next) {
  res.send(Leds);
  next();
})

server.get("/led/automatic", function(req, res, next) {
  res.send({"automatic": Leds.automatic})
  next();
})

server.get("/led/automatic/:bool", function(req, res, next) {
  var b = req.params.bool == "true";
  Leds.setAutomatic(b);
  res.send({"automatic": Leds.automatic})
  next();
})


server.post("/led/commit", function(req, res, next) {
  res.send(Leds.commit());
  next();
})

server.get("/led/:id", function(req, res, next) {
  res.send(Leds.get(req.params.id));
  next();
})

server.get("/led/:id/:prop", function(req, res, next) {
  var json = {};
  json[req.params.prop] = Leds.get(req.params.id)[req.params.prop];
  res.send(json);
  next();
})


server.post("/led/:id/color/:hex", function(req, res, next) {
  var led = Leds.get(req.params.id);
  led.setHexColor(req.params.hex);
  res.send(led);
  next();
})


server.post("/led/:id/color", function(req, res, next) {
  Leds.get(req.params.id).setRGBColor(req.params);
  next();
})



// Listen

server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});