const request = require("supertest");
const chai = require("chai");
const app = require("../dist/server.js");
const expect = chai.expect;
const server = app.listen();

describe("GET /scenarios", function() {
  it("Should return a list of scenarios with length 2", function(done) {
    request(server)
      .get("/scenarios")
      .then(res => {
        expect(res.body.length).to.equal(2);
      })
      .finally(done);
  });

  it("Should return an array", function(done) {
    request(server)
      .get("/scenarios")
      .then(res => {
        expect(res.body).to.be.an.instanceof(Array);
      })
      .finally(done);
  });

  it("Should the first scenario in the list should have title BandersGuru", function(done) {
    request(server)
      .get("/scenarios")
      .then(res => {
        expect(res.body[0].title).to.equal("BandersGuru");
      })
      .finally(done);
  });
});

describe("POST /game", function() {
  it("Should have the currentStep of a new game be set to initial", function(done) {
    request(server)
      .post("/game")
      .then(res => {
        expect(res.body.currentStep).to.equal("initial");
      })
      .finally(done);
  });
});
