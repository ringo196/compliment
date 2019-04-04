"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require("./database/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8080;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_path2.default.join(__dirname, './public')));

app.get("/scenarios", function (req, res) {
  _index.Scenario.find().then(function (results) {
    var scenariosList = [];
    results.forEach(function (element) {
      var data = { title: element.title, summary: element.summary };
      scenariosList.push(data);
    });
    res.json(scenariosList);
  });
});

app.post("/game", function (req, res) {
  var gameData = {
    scenario: req.body.scenario,
    currentStep: "initial"
  };
  var game = new _index.Game(gameData);

  game.save().then(function (game) {
    res.send(game);
  });
});

app.get("/game/:id", function (req, res) {
  _index.Game.findById({ _id: req.params.id }).then(function (game) {
    _index.Scenario.find({ title: game.scenario }).then(function (scenario) {
      var gameSave = {
        id: game._id,
        scenario: game.scenario,
        currentStep: game.currentStep,
        story: scenario[0].nodes.get(game.currentStep).story,
        choices: scenario[0].nodes.get(game.currentStep).choices
      };
      res.json(gameSave);
    }).catch(function (err) {
      console.log(err);
      res.send(err);
    });
  });
});

app.post("/game/:id", function (req, res) {
  var choiceMade = req.body.choiceIndex;

  _index.Scenario.find({ title: req.body.scenario }).then(function (scenario) {
    var choice = scenario[0].nodes.get(req.body.currentStep).choices[choiceMade];
    var newStep = {
      currentStep: choice.goto
    };
    _index.Game.findOneAndUpdate({ _id: req.params.id }, newStep, { new: false }).then(function (game) {
      var gameSave = {
        id: req.params.id,
        scenario: req.body.scenario,
        currentStep: game.currentStep,
        story: scenario[0].nodes.get(game.currentStep).story,
        choices: scenario[0].nodes.get(game.currentStep).choices
      };
      res.send(gameSave);
    }).catch(function (err) {
      console.log(err);
      res.send(err);
    });
  });
});

app.listen(port, function () {
  return console.log("Your server has connected and is listening on port: " + port + "!!");
});