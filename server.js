const express = require("express");
const mongoose = require("mongoose");
const app = express();

//End-points
app.get("/", (req, res) => {
  res.send("Hello Node addict");
});

app.get("/user", (req, res) => {
  res.send("Hello and welcome User");
});

mongoose
  .connect(
    "mongodb+srv://rodrigue:Somtofioko237@cluster0.u1g7hb1.mongodb.net/express-server?retryWrites=true&w=majority"
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
