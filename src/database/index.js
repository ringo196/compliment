import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connection = mongoose.connect(
    "mongodb://localhost/complimentbank",
    {
        useNewUrlParser: true
    },
    () => console.log("MONGOOSE CONNECTED!@!@!@! GRRRREEAAAAT SUCCESSSSS!!!!!")
)

const userSchema = new Schema(
    {
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
    },
    {
        collection: "users"
    }
)

const phraseSchema = new Schema(
    {
        userId: { type: String },
        text: { type: String, required: true },
        notes: { type: String },
        date: { type: Date },
        fromWho: { type: String },
        location: { type: String },
        tags: [{ type: String }], // TODO look into better way to handle this
        lastModified: { type: Date }
    },
    {
        collection: "phrases"
    }
)

const User = mongoose.model("User", userSchema)
const Phrase = mongoose.model("Phrase", phraseSchema)

export { User, Phrase };
