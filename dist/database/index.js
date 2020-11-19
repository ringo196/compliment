"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Phrase = exports.User = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var connection = _mongoose2.default.connect("mongodb://localhost/complimentbank", {
    useNewUrlParser: true
}, function () {
    return console.log("MONGOOSE CONNECTED!@!@!@! GRRRREEAAAAT SUCCESSSSS!!!!!");
});

var userSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    // notificationSettings: {},
    // activeNotifications: [tagSchema],
    // securityQuestions: [securityQuestionSchema],
    shownPhrases: [{ type: String, unique: true }],
    friends: [{ type: String, unique: true }],
    lastModified: { type: Date }
}, {
    collection: "users"
});

var phraseSchema = new Schema({
    userId: { type: String },
    text: { type: String, required: true },
    notes: { type: String },
    date: { type: Date },
    fromWho: { type: String },
    location: { type: String },
    tags: [{ type: String }], // TODO look into better way to handle this
    lastModified: { type: Date }
}, {
    collection: "phrases"
});

var User = _mongoose2.default.model("User", userSchema);
var Phrase = _mongoose2.default.model("Phrase", phraseSchema);

exports.User = User;
exports.Phrase = Phrase;