const User = require("../models/UserModel");

const createUser = async (req, res) => {
  const { email, location, weather } = req.body;

  // Create a new user

  try {
    const user = await User.create({
      email,
      location,
      weather,
    });
    res.status(200).send("user create");
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
};

// update a user's location and then updating relevant weather data

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not Found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, location, weather } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { email, location, weather },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User updated");
  } catch (error) {
    res.status(500).send("Error updating user details");
  }
};

// get all users weather data for given date

const allWeatherData = async (req, res) => {
  try {
    const { date } = req.params;
    const dateObj = new Date(date);

    const startDate = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate()
    );
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $project: {
          formattedCreatedAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt", 
            },
          },
         
        },
      },
    ]);

   

    if (data.length === 0) {
      return res.status(404).send("No data found for the given date.");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
};



module.exports = {
  createUser,
  getUserById,
  updateUserById,
  allWeatherData,
};
