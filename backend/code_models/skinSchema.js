const mongoose = require("mongoose");

const skinResultSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  skinType: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String],
  },
  treatments: {
    type: [String],
  },
  duration: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

skinResultSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.user;
    delete returnedObject.publicId;
    delete returnedObject.created;
  },
});

// Create a model using the schema
const SkinResult = mongoose.model("SkinResult", skinResultSchema);

module.exports = SkinResult;
