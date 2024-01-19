const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const recipesRouter = require("./routes/recipes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://balamurugan:bala2000@recipescluster.wdxys9s.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, function () {
  console.log("server is started");
});
