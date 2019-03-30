import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import db from "../dist/database/index.js";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let scenarios;
let id = 0;
let games = {};
let currentGame;
let currentChoices;
let currentGameData;

app.get("/scenarios", (req, res) => {
  fs.readFile("scenarios.json", "utf8", (err, data) => {
    if (err) throw err;
    scenarios = JSON.parse(data);
    res.send(scenarios);
  });
});

app.post("/game", (req, res) => {
  let newId = id;
  id++;

  let game = {
    id: newId,
    scenario: req.body.scenario,
    currentStep: "initial"
  };

  games[newId] = game;

  console.log("Number of games: ", Object.keys(games).length);
});

app.get("/game/:id", (req, res) => {
  currentGame = games[req.params.id];
  currentChoices =
    scenarios[currentGame.scenario].nodes[currentGame.currentStep].choices;

  let gameData = {
    id: req.params.id,
    scenario: currentGame.scenario,
    currentStep: currentGame.currentStep,
    choices: currentChoices
  };

  currentGameData = gameData;

  res.send(gameData);
});

app.post("/game/:id", (req, res) => {
  // console.log('idk what this', scenarios[currentGame.scenario].nodes[currentChoices[req.body.choiceIndex].goto])
  let choiceMade = req.body.choiceIndex;

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
    // go back to first screen to load/start a new game might be better as a button on this screen
    res.send();

  }

  // res.send(currentChoices)
});

app.listen(port, () =>
  console.log(`Your server has connected and is listening on port: ${port}!!`)
);


















