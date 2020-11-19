"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require("./database/index.js");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require("../users.json");

var _users2 = _interopRequireDefault(_users);

var _phrases = require("../phrases.json");

var _phrases2 = _interopRequireDefault(_phrases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8080;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_path2.default.join(__dirname, "./public")));

// post user

// post compliment

// get user

// get random phrase

// get filtered phrases

// app.get("/scenarios", (req, res) => {
//   console.log("GET /scenarios endpoint hit");
//   Scenario.find()
//     .then(results => {
//       let scenariosList = [];
//       results.forEach(element => {
//         let data = { title: element.title, summary: element.summary };
//         scenariosList.push(data);
//       });
//       res.json(scenariosList);
//     })
//     .catch(err => {
//       throw err;
//     });
// });
//
// app.post("/game", (req, res) => {
//   let gameData = {
//     scenario: req.body.scenario,
//     currentStep: "initial"
//   };
//   let game = new Game(gameData);
//
//   game.save().then(game => {
//     console.log("POST /game endpoint hit");
//     res.send(game);
//   });
// });
//
// app.get("/game/:id", (req, res) => {
//   if (mongoose.Types.ObjectId.isValid(req.params.id)) {
//     Game.findById({ _id: req.params.id }).then(game => {
//       Scenario.find({ title: game.scenario })
//         .then(scenario => {
//           let gameSave = {
//             id: game._id,
//             scenario: game.scenario,
//             currentStep: game.currentStep,
//             story: scenario[0].nodes.get(game.currentStep).story,
//             choices: scenario[0].nodes.get(game.currentStep).choices
//           };
//           res.json(gameSave);
//         })
//         .catch(err => {
//           throw err;
//         });
//     });
//   } else {
//     res.status(500).send();
//   }
// });
//
// app.post("/game/:id", (req, res) => {
//   let choiceMade = req.body.choiceIndex;
//
//   Scenario.find({ title: req.body.scenario }).then(scenario => {
//     let choice = scenario[0].nodes.get(req.body.currentStep).choices[
//       choiceMade
//     ];
//     let newStep = {
//       currentStep: choice.goto
//     };
//     Game.updateOne({ _id: req.params.id }, newStep, { new: true }).then(
//       game => {
//         let gameSave = {
//           id: req.params.id,
//           scenario: req.body.scenario,
//           currentStep: newStep.currentStep,
//           story: scenario[0].nodes.get(newStep.currentStep).story,
//           choices: scenario[0].nodes.get(newStep.currentStep).choices
//         };
//         res.json(gameSave);
//       }
//     );
//   });
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(port, function () {
    return console.log("Your server has connected and is listening on port: " + port + "!!");
  });
}

_index.User.collection.drop(function () {
  _index.User.insertMany(_users2.default).then(function () {
    return console.log("USER - inserted data");
  });
});

_index.Phrase.collection.drop(function () {
  _index.Phrase.insertMany(_phrases2.default).then(function () {
    return console.log("PHRASE - inserted data");
  });
});

module.exports = app;