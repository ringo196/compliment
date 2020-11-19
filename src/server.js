import express from "express"
import path from "path"
import bodyParser from "body-parser"
import { User, Phrase } from "./database/index.js"
import mongoose from "mongoose";
import userData from "../users.json"
import phraseData from "../phrases.json"


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));

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
  app.listen(port, () =>
    console.log(`Your server has connected and is listening on port: ${port}!!`)
  );
}

User.collection.drop(() => {
  User.insertMany(userData)
    .then(() => console.log("USER - inserted data"));
});

Phrase.collection.drop(() => {
  Phrase.insertMany(phraseData)
      .then(() => console.log("PHRASE - inserted data"));
});

module.exports = app;
