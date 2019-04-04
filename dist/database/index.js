"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = exports.Scenario = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var connection = _mongoose2.default.connect("mongodb://localhost/BandersGuru", {
  useNewUrlParser: true
}, function () {
  return console.log("MONGOOSE CONNECTED!@!@!@! GRRRREEAAAAT SUCCESSSSS!!!!!");
});

var choiceSchema = new Schema({
  line: String,
  goto: String,
  reason: String
});

var nodeSchema = new Schema({
  story: String,
  choices: [choiceSchema]
});

var scenarioSchema = new Schema({
  title: String,
  summary: String,
  nodes: {
    type: Map,
    of: nodeSchema
  }
}, { collection: "scenarios" });

var gameSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  scenario: String,
  currentStep: String
}, { collection: "games" });

var Scenario = _mongoose2.default.model("Scenario", scenarioSchema);
var Game = _mongoose2.default.model("Game", gameSchema);

exports.Scenario = Scenario;
exports.Game = Game;