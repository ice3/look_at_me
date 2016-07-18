var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var server = require('http').createServer(app);


/////////////////////////////////////////////
// express
/////////////////////////////////////////////

app.use(express.static(__dirname+"/client"));

app.get("/", function(req, res){
  res.sendFile('index.html', { root: __dirname+"/client"});
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


var init = function (dict) {
  /////////////////////////////////////////////
  // Start servicies
  /////////////////////////////////////////////

  app.get("/services/ressources", function(req, res){
    res.json(dict.getNames());
  });

  app.get("/services/ressource", function(req, res){
    if (req.query.name == undefined)
      res.json([]);
    else
      res.json(dict.getData(req.query.name));
  });
}


module.exports = {"app": app, "server": server, "init": init}