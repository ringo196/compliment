"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8080;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var scenarios = void 0;
var id = 0;
var games = {};
var currentGame = void 0;
var currentChoices = void 0;
var currentGameData = void 0;

app.get("/scenarios", function (req, res) {
  _fs2.default.readFile("scenarios.json", "utf8", function (err, data) {
    if (err) throw err;
    scenarios = JSON.parse(data);
    res.send(scenarios);
  });
});

app.post("/game", function (req, res) {
  var newId = id;
  id++;

  var game = {
    id: newId,
    scenario: req.body.scenario,
    currentStep: "initial"
  };

  games[newId] = game;

  console.log("Number of games: ", Object.keys(games).length);
});

app.get("/game/:id", function (req, res) {
  currentGame = games[req.params.id];
  currentChoices = scenarios[currentGame.scenario].nodes[currentGame.currentStep].choices;

  var gameData = {
    id: req.params.id,
    scenario: currentGame.scenario,
    currentStep: currentGame.currentStep,
    choices: currentChoices
  };

  currentGameData = gameData;

  res.send(gameData);
});

app.post("/game/:id", function (req, res) {
  // console.log('idk what this', scenarios[currentGame.scenario].nodes[currentChoices[req.body.choiceIndex].goto])
  var choiceMade = req.body.choiceIndex;

  // if scenarios has a node for the choice you just made
  if (scenarios[currentGame.scenario].nodes[currentChoices[choiceMade].goto]) {
    // update current game state, 
    // update game in the database/memory
    // update current choices
    // read reason/progress story
    // read new story

    // its not a node, so it failed 
  } else {
    // read reason you failed
    // go back to first screen to load/start a new game
    res.send();
  }

  // res.send(currentChoices)
});

app.listen(port, function () {
  return console.log("Your server has connected and is listening on port: " + port + "!!");
});