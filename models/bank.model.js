const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  acountId: {
    type: Number,
    required: true,
  },
});

const user = mongoose.model("user", usersSchema);

module.exports = {
  user,
};
