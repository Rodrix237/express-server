const express = require("express");
const User = require("../models/user");
const {
  getAllUsers,
  getSpecificUser,
  updateSpecificUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

/*Find All Users*/
router.get("/all", getAllUsers);

/*Find Specific User*/
router.get("/:id", getSpecificUser);

/*Update Specific User*/
router.put("/:id", updateSpecificUser);

/*Add New User*/
router.post("/add", registerUser);

/*Sign in*/
router.post("/login", loginUser);

module.exports = router;
