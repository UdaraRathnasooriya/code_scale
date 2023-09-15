const  axios  = require("axios");

const API_KEY = "ee1c1ccd82e3cf4908a3498f42a876a8";

const getWeatherData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
    try {
      const response = await axios.get(URL);
      const {
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = response.data;
  
      const weatherData = {
        temp,
        feels_like,
        temp_max,
        temp_min,
        pressure,
        humidity,
        speed,
        country,
        name,
      };
      return weatherData;
  
    } catch (error) {
      console.error("Error fetching data:", error.message);
    //   throw error; 
    }
  };


  module.exports = getWeatherData