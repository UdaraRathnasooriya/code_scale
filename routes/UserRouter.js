const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUserById,
  updateUserById,
  allWeatherData,
} = require("../controllers/UserController");

// create new user
userRouter.post("/create", createUser);

// update user
userRouter.get("/find/:id", getUserById);
userRouter.put("/update/:id", updateUserById);

// get all users weather data
userRouter.get("/weather/:date",allWeatherData)

module.exports = userRouter;
