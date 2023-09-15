const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const getWeatherData = require("./services/weatherService");
const userRouter = require("./routes/UserRouter");
const axios = require("axios");

app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

// create constant user object
const user = {
  email: "laksri.udara@gmail.com",
  location: "matara",
  weather: {},
};

// Call the getWeatherData function and update the user object
getWeatherData(user.location)
  .then((res) => {
    user.weather = res;
    addUser(user);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// create user function

const addUser = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:4200/user/create",
      user
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const id = "65041ba15d8fcac5f594e781";
const updateUserLocation = {
  ...user,
  location: "galle",
};

// update user function
const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.get(`http://localhost:4200/user/find/${id}`);

    const existingUser = response.data;
    existingUser.location = updatedUser.location;

    const weatherData = await getWeatherData(updatedUser.location);
    // console.log(weatherData)

    existingUser.weather = weatherData;
    // console.log(existingUser)

    const updateResponse = await axios.put(
      `http://localhost:4200/user/update/${id}`,
      existingUser
    );
    console.log(updateResponse.data);
  } catch (error) {
    console.log(error.message);
  }
};

updateUser(id, updateUserLocation);

// get users weather data by given date

const getWeatherDataByDate = async (date) => {
  try {
    const response = await axios.get(
      `http://localhost:4200/user/weather/${date}`
    );

    // console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

getWeatherDataByDate("2023-09-14");

// create database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log("connect to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/user", userRouter);
