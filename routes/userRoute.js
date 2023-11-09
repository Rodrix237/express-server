const express = require("express");
const User = require("../models/user");
const router = express.Router();

/*Find All Users*/
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/*Find Specific User*/
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Hashage du mot de passe si l'email est unique
    let hashedPassword = "";
    if (req.body.password !== undefined) {
      hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);
      req.body.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({
        message: `Impossible de trouve un utilisateur avec pour ID : ${id}`,
      });
    }
    const updatedUser = await User.findById(id);
    hashedPassword = "";
    res.status(200).json(updatedUser);
  } catch (error) {
    hashedPassword = "";
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/*Add New User*/
router.post("/add", async (req, res) => {
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

/*Sign in*/
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const isAuthenticated = await verifyCredentials(email, password);

    if (isAuthenticated) {
      res.status(200).json({ message: "Authorised" });
    } else {
      res.status(401).json({ message: "Not authorised" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fonction Login
async function verifyCredentials(email, password) {
  // Verification de l'existance de l'utilisateur
  const user = await User.findOne({ email });

  // Renvoyer false si utilisateur pas existant
  if (!user) {
    return false;
  }

  // Hasher le mot de passe entré par l'utilisateur et le comparer avec le mot de passe hashé présent dans la base de données
  const isMatch = bcrypt.compareSync(password, user.password);

  // Renvoyer true s'il y'a matching
  if (isMatch) {
    return true;
  }

  // Renvoyer false s'il y'a pas matching
  return false;
}

module.exports = router;
