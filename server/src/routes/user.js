const express = require("express");
const UserModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "the username is already existed" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  console.log(newUser);
  await newUser.save();

  res.json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "user is not registered" });
  }
  const ispassword = await bcrypt.compare(password, user.password);

  if (!ispassword) {
    return res.json({ message: "your password is wrong please check" });
  }

  const tokens = jwt.sign({ id: user._id }, "secretekey");
  res.json({ token: tokens, userid: user._id });
});

module.exports = router;
