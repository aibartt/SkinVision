const mongoose = require("mongoose");

const SkinResult = require("./skinSchema");

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  skinResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkinResult",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.pre("remove", async function (next) {
  await SkinResult.deleteMany({ user: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
