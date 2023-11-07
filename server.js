require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const salt = 10;
const mongoose = require("mongoose");
const User = require("./models/user");

var cors = require("cors");
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//End-points

/*Root*/
app.get("/", (req, res) => {
  res.send("Hello Node addict");
});

/*Find All Users*/
app.get("/user/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/*Find Specific User*/
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/*Update Specific User*/
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({
        message: `Impossible de trouve un utilisateur avec pour ID : ${id}`,
      });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/*Add New User*/
app.post("/user/add", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `Email ${email} existe déjà.`,
      });
    }

    // Hashage du mot de passe si l'email est unique
    const hashedPassword = await bcrypt.hash(
      req.body.password.toString(),
      salt
    );
    req.body.password = hashedPassword;
    // Creation de l'utilisateur si l'email est unique
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictPopulate", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  })
  .catch(() => {
    console.log(Error);
  });
