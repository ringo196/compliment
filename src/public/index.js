let textInput = document.getElementById("text-input");
let textBox = document.getElementById("text-box");

let app = {
  state: {
    page: "home",
    gameSaveData: null,
    currentGameData: null,
    scenarios: null,
    userName: "Ringo"
  },
  invalid: () => {
    app.appendText("Invalid input, please select one from the given options!");
  },
  appendText: str => {
    let parsedStr = str.replace("#name#.", app.state.userName);
    let newText = document.createElement("span");
    newText.innerHTML = parsedStr;
    textBox.appendChild(newText);
  },
  clearText: () => {
    if (textBox.childNodes.length > 14) {
      while (textBox.childNodes.length > 0) {
        textBox.removeChild(textBox.childNodes[0]);
      }
    }
  },
  handleSubmit: e => {
    let key = e.key;
    let eVal = e.target.value;
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
        if (
          eVal < 1 ||
          eVal > Number(app.state.currentGameData.choices.length)
        ) {
          app.invalid();
        } else {
          app.playGame(e);
        }
      } else if (app.state.page === "load") {
        app
          .getGameData(e.target.value)
          .then(() => app.displayChoices())
          .catch(err => {
            app.appendText("Please input valid game id");
            throw err;
          });
      }
      e.target.value = "";
    }
  },
  home: e => {
    if (e.target.value === "1") {
      fetch("http://localhost:8080/scenarios")
        .then(function(res) {
          return res.json();
        })
        .then(function(myJson) {
          app.appendText("Which Scenario do you want to play?");
          for (let i = 0; i < myJson.length; i++) {
            let scenarioTitle = `&emsp; ${i + 1}. ${myJson[i].title} - ${
              myJson[i].summary
            }`;
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
  newGame: (e, data) => {
    if (!(e.target.value < 1 || e.target.value > app.state.scenarios.length)) {
      let newScenario = JSON.stringify({
        scenario: data[e.target.value - 1].title
      });
      fetch("http://localhost:8080/game", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: newScenario
      })
        .then(res => res.json())
        .then(newGameData => {
          app.state.gameSaveData = newGameData;
          app.appendText(
            `Your gameId is - ${
              newGameData._id
            } - Rememeber this to load game in the future!`
          );
          app.getGameData(app.state.gameSaveData._id).then(() => {
            app.displayChoices();
          });
        });
    } else {
      app.invalid();
    }
  },
  displayChoices: () => {
    let storyText = app.state.currentGameData.story;
    app.appendText(storyText);

    for (let i = 0; i < app.state.currentGameData.choices.length; i++) {
      let choiceText = `&emsp; ${i + 1}. ${
        app.state.currentGameData.choices[i].line
      }`;
      app.appendText(choiceText);
    }
    app.state.page = "play";
  },

  playGame: e => {
    let goto = app.state.currentGameData.choices[e.target.value - 1].goto;

    if (goto === "success" || goto === "failure") {
      let gameOverText = `${goto}!!! ${
        app.state.currentGameData.choices[e.target.value - 1].reason
      }`;

      app.appendText(" ");
      app.appendText(gameOverText);
      app.appendText(" ");
      app.appendText(`Press 1 for a new game, or 2 to load a saved game`);

      app.state.page = "home";
    } else {
      let choiceData = JSON.stringify({
        scenario: app.state.currentGameData.scenario,
        currentStep: app.state.currentGameData.currentStep,
        choiceIndex: e.target.value - 1
      });

      fetch(`http://localhost:8080/game/${app.state.currentGameData.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: choiceData
      })
        .then(res => {
          return res.json();
        })
        .then(newGameStep => {
          let choiceIdx = JSON.parse(choiceData).choiceIndex;
          let progressText =
            app.state.currentGameData.choices[choiceIdx].reason;
          app.appendText(progressText);
          app.state.currentGameData = newGameStep;
          app.displayChoices();
        });
    }
  },

  getGameData: gameId => {
    return fetch(`http://localhost:8080/game/${gameId}`)
      .then(res => res.json())
      .then(currentGameData => {
        app.state.currentGameData = currentGameData;
        return currentGameData;
      });
  }
};

textInput.addEventListener("keydown", app.handleSubmit);
