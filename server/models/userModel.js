const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    super: { type: Boolean, default: false },
    profilPic: {
      type: String,
      default: "",
    },
    bio: { type: String, default: "Please add a bio..." },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to set the profile picture URL if it's not already set
userSchema.pre("save", function (next) {
  // If profilPic hasn't been set, generate the default URL
  if (!this.profilPic) {
    this.profilPic = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${this.username}`;
  }
  next();
});

userSchema.statics.signup = async function (email, username, password) {
  // validation
  if (!email || !username || !password) {
    throw Error("Veuillez remplir tout les informations !");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email !");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough !");
  }

  const existsMail = await this.findOne({ email });
  const existsUsername = await this.findOne({ username });
  if (existsMail) {
    throw Error("Email already in use");
  }
  if (existsUsername) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Veuillez remplir tout les informations !");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Mot de passe ou mail incorrecte !");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Mot de passe ou mail incorrecte !");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
