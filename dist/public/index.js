"use strict";

var textInput = document.getElementById("text-input");
var textBox = document.getElementById("text-box");

var app = {
  state: {
    page: "home",
    gameSaveData: null,
    currentGameData: null,
    scenarios: null,
    userName: "Ringo"
  },
  invalid: function invalid() {
    app.appendText("Invalid input, please select one from the given options!");
  },
  appendText: function appendText(str) {
    var parsedStr = str.replace("#name#.", app.state.userName);
    var newText = document.createElement("span");
    newText.innerHTML = parsedStr;
    textBox.appendChild(newText);
  },
  clearText: function clearText() {
    if (textBox.childNodes.length > 14) {
      while (textBox.childNodes.length > 0) {
        textBox.removeChild(textBox.childNodes[0]);
      }
    }
  },
  handleSubmit: function handleSubmit(e) {
    var key = e.key;
    var eVal = e.target.value;
    if (key === "Enter") {
      app.clearText();
      if (app.state.page === "home") {
        if (eVal !== "1" && eVal !== "2") {
          app.invalid();
        } else {
          app.home(e);
        }
      } else if (app.state.page === "pickScenario") {
        app.newGame(e, app.state.scenarios);
      } else if (app.state.page === "play") {
        if (eVal < 1 || eVal > Number(app.state.currentGameData.choices.length)) {
          app.invalid();
        } else {
          app.playGame(e);
        }
      } else if (app.state.page === "load") {
        app.getGameData(e.target.value).then(function () {
          return app.displayChoices();
        }).catch(function (err) {
          app.appendText("Please input valid game id");
          throw err;
        });
      }
      e.target.value = "";
    }
  },
  home: function home(e) {
    if (e.target.value === "1") {
      fetch("http://localhost:8080/scenarios").then(function (res) {
        return res.json();
      }).then(function (myJson) {
        app.appendText("Which Scenario do you want to play?");
        for (var i = 0; i < myJson.length; i++) {
          var scenarioTitle = "&emsp; " + (i + 1) + ". " + myJson[i].title + " - " + myJson[i].summary;
          app.appendText(scenarioTitle);
        }
        app.state.scenarios = myJson;
        app.state.page = "pickScenario";
      });
    } else if (e.target.value === "2") {
      app.state.page = "load";
      app.appendText("Please enter your game Id");
    }
  },
  newGame: function newGame(e, data) {
    if (!(e.target.value < 1 || e.target.value > app.state.scenarios.length)) {
      var newScenario = JSON.stringify({
        scenario: data[e.target.value - 1].title
      });
      fetch("http://localhost:8080/game", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: newScenario
      }).then(function (res) {
        return res.json();
      }).then(function (newGameData) {
        app.state.gameSaveData = newGameData;
        app.appendText("Your gameId is - " + newGameData._id + " - Rememeber this to load game in the future!");
        app.getGameData(app.state.gameSaveData._id).then(function () {
          app.displayChoices();
        });
      });
    } else {
      app.invalid();
    }
  },
  displayChoices: function displayChoices() {
    var storyText = app.state.currentGameData.story;
    app.appendText(storyText);

    for (var i = 0; i < app.state.currentGameData.choices.length; i++) {
      var choiceText = "&emsp; " + (i + 1) + ". " + app.state.currentGameData.choices[i].line;
      app.appendText(choiceText);
    }
    app.state.page = "play";
  },

  playGame: function playGame(e) {
    var goto = app.state.currentGameData.choices[e.target.value - 1].goto;

    if (goto === "success" || goto === "failure") {
      var gameOverText = goto + "!!! " + app.state.currentGameData.choices[e.target.value - 1].reason;

      app.appendText(" ");
      app.appendText(gameOverText);
      app.appendText(" ");
      app.appendText("Press 1 for a new game, or 2 to load a saved game");

      app.state.page = "home";
    } else {
      var choiceData = JSON.stringify({
        scenario: app.state.currentGameData.scenario,
        currentStep: app.state.currentGameData.currentStep,
        choiceIndex: e.target.value - 1
      });

      fetch("http://localhost:8080/game/" + app.state.currentGameData.id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: choiceData
      }).then(function (res) {
        return res.json();
      }).then(function (newGameStep) {
        var choiceIdx = JSON.parse(choiceData).choiceIndex;
        var progressText = app.state.currentGameData.choices[choiceIdx].reason;
        app.appendText(progressText);
        app.state.currentGameData = newGameStep;
        app.displayChoices();
      });
    }
  },

  getGameData: function getGameData(gameId) {
    return fetch("http://localhost:8080/game/" + gameId).then(function (res) {
      return res.json();
    }).then(function (currentGameData) {
      app.state.currentGameData = currentGameData;
      return currentGameData;
    });
  }
};

textInput.addEventListener("keydown", app.handleSubmit);