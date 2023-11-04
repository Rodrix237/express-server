const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "Veuillez entrer le Prénom"],
    },
    lastname: {
      type: String,
      require: [true, "Veuillez entrer le Nom"],
    },
    email: {
      type: String,
      require: [true, "Veuillez entrer l'email"],
    },
    password: {
      type: String,
      require: [true, "Veuillez entrer le mot de passe"],
    },
    profil: {
      type: String,
      default: "User",
    },
    statut: {
      type: String,
      default: "Active",
    },
    phone: {
      type: String,
      default: "699999999",
    },
    image_url: {
      type: String,
      default:
        "https://drive.google.com/file/d/1UpfTVBTumLd8msrw49RH7ktDspK-6Ue-/view?usp=sharing",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
