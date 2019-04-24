# Notes

#### Install:
- With Docker
```
docker-compose build
docker-compose up
```
- Without Docker
```
**** Make sure you have mongodb installed and running ****

npm install

**** Modify line 6 src/database/index.js ****
    "mongodb://mongo:27017/bandersguru",
to  "mongodb://localhost/BandersGuru",

npm run build
npm start
```

#### Implementation notes:
- Changed some minor data formatting in scenarios.json to make the object have a title key and value of BandersGuru and also the initial node had a line key that I changed to story for more consistency with the the other nodes (although I think I could have handled that by doing an || operator in the code, and adding both keys to the schema. Both these changes were done to make parsing and data entry into the db easier.
- I modified some of the request and response payloads to match what I thought would be relevant to the app's state as it progressed.
- There's definitely a lot of places where I can handle errors a bit better. One example is a bug I ran into when implementing docker-compose was that it wasn't hitting the db properly because I had not changed the connection code to reflect the mongo docker image. The app wasn't giving me any proper error messages or clues as to the reason for this.
- File structure can be a bit more modular, but I decided it's a small enough app with few routes so I kept things simple.
- Testing coverage could be better. Seems something broke as I was going along as well, as some of them are failing right now (I realize this isn't how proper TDD should have been).
- Automatic scenarios seeding of mongodb could be better handled, possibly with a separate docker container or in a separate file.

#### Features to add:
- Ask for name at start of the game, to use for text where #name# is.
- Clean up a couple of console.logs used for debugging.
- Add background music, as well as some basic sound effects.
- Separate branch for installing without docker.

# browserRPG

We ask of you to please write this test in Javascript, using `NodeJS@10.14.2`.

## TODO

If you have watched Bandersnatch on Netflix, this might be familiar. 
The goal of this techical test is to code a *'book where you are the hero'*. Don't worry, we won't be testing your writting skills ;).

In this repository, you are provided a `scenarios.json` file that describes the scenario of this game.

Using a database is a bonus task, you can work with memory only, it's OK.

## Mandatory tasks

#### Step 0:

Clone this project and initialize your `package.json` with npm.

#### Step 1: 

Bootstrap a basic NodeJS HTTP Server using *any* NodeJS web framework and listen on the `8080` port in a `server.js` file.

#### Step 2: 

Using a router, add these routes to the server:

- `GET` `/scenarios` where the scenarios are the top level key in `scenarios.json`

```
{
  "scenarios": [
    "BandersGuru"
  ]
}
```
- `POST`  `/game` which allows to start a game given a scenario name as JSON and returns the ID of a game.

```
{
  "id": "ec6a7bd0-4f45-11e9-9f9d-2dcc58927dae",
  "scenario": "BandersGuru",
  "currentStep": "initial"
}
```
- `GET` `/game/:id` which allows one to get a game by ID.
```
{
  "id": "derp",
  "scenario": "BandersGuru",
  "currentStep": "initial",
  "choices": [
    {
      "line": "Enter the office"
    },
    {
      "line": "Run away in the opposite direction"
    }
  ]
}
```
- `POST` `/game/:id` which allows one to choose one of the possible answer to a question and returns the following one, given the index of the selected answer. (ie: `initial` -> select `choice @index 1`  ->`node#1` and so on..)


*Payload*
``` 
{
    "choiceIndex": 0
}
```

*Response*
```
{
  "id": "derp",
  "scenario": "BandersGuru",
  "currentStep": "1",
  "choices": [
    {
      "line": "Start doing the backpack-kid dance to impress them."
    },
    {
      "line": "Tell them that Android is clearly better than Apple and that whoever would argue the contrary is completely insane."
    },
    {
      "line": "Say \" Hi! I'm #name#."
    }
  ]
}
```

At this point your game should be playable by *cURL*.

(see `boom` on npm)

## Bonus steps: 

Those are for more experienced software engineers. It really is OK to not do them if you're a junior *:)*

#### Easy

DONE - Use babel to transpile to use modern features (`import/export`...)
DONE - Add tests with a test framework (`jasmine`, `mocha`, `jest`...)
DONE - Linter + prettier (`eslint` + `prettier`) using the `Standard` convention

#### Medium:

DONE - Create a basic UI for the game. No React/no Vue. Vanilla like a boss.
DONE - Plug-in a database such as `Mongo` or `Postgre` instead of putting everything in memory.

#### Hard:

DONE - Use an ORM (`sequelize`...)

#### God:

DONE (except no live-reload) - Run everything on docker-compose with live-reload. Now that's a real dev workflow!
- ES6+ is too easy. Do everything in Reason.
DONE - Do your own scenario *:)*
