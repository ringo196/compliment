import mongoose from "mongoose";
import data from "../../scenarios.json"
const Schema = mongoose.Schema;

const connection = mongoose.connect(
  "mongodb://mongo:27117/BandersGuru",
  {
    useNewUrlParser: true
  },
  () => console.log("MONGOOSE CONNECTED!@!@!@! GRRRREEAAAAT SUCCESSSSS!!!!!")
);

const choiceSchema = new Schema({
  line: String,
  goto: String,
  reason: String
});

const nodeSchema = new Schema({
  story: String,
  choices: [choiceSchema]
});

const scenarioSchema = new Schema(
  {
    title: String,
    summary: String,
    nodes: {
      type: Map,
      of: nodeSchema
    }
  },
  { collection: "scenarios" }
);

const gameSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    scenario: String,
    currentStep: String
  },
  { collection: "games" }
);

const Scenario = mongoose.model("Scenario", scenarioSchema);
const Game = mongoose.model("Game", gameSchema);

Scenario.collection.drop(() => {
  Scenario.insertMany(data);
});


export { Scenario, Game };
