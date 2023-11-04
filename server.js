const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();

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
