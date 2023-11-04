const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();

app.use(express.json());

//End-points
app.get("/", (req, res) => {
  res.send("Hello Node addict");
});

app.get("/user/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

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

app.post("/user/add", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictPopulate", false);
mongoose
  .connect(
    "mongodb+srv://rodrigue:somtofiOko27@cluster0.u1g7hb1.mongodb.net/Express-Server?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log(Error);
  });
