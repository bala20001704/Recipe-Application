const express = require("express");
const router = express.Router();
const RecipesModel = require("../models/Recipes.js");
const UserModel = require("../models/User.js");

router.get("/", async function (req, res) {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  try {
    const response = new RecipesModel(req.body);
    await response.save();
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

router.put("/", async function (req, res) {
  try {
    if (!req.body.userid) {
      return res.json({ message: "user should login before save the recipes" });
    }
    const recipe = await RecipesModel.findById(req.body.recipeid);
    const user = await UserModel.findById(req.body.userid);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/ids/:userid", async function (req, res) {
  try {
    if (req.params.userid === "null") {
      return res.json({
        message: "Saved recipes button visible in black colors",
      });
    }
    const user = await UserModel.findById(req.params.userid);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/:userid", async function (req, res) {
  try {
    if (req.params.userid === "null") {
      return res.json({
        message: "Without Login user Can't see the saved recipes ",
      });
    }
    const user = await UserModel.findById(req.params.userid);
    const savedrecipe = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedrecipe });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
