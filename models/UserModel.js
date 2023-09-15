const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    weather: {
      temp: {
        type: Number,
        required: true,
      },
      feels_like: {
        type: Number,
        required: true,
      },
      temp_max: {
        type: Number,
        required: true,
      },
      temp_min: {
        type: Number,
        required: true,
      },
      pressure: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
      speed: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
