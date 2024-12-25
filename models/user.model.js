const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
  },

  age: {
    type: Number,
  },

  hasLion: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", userSchema);
