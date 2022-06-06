import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { RecipeModel } from "./server/schemas/recipe.schema.js";
import { UserModel } from "./server/schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const access_secret = "12345";
const saltRounds = 10;
const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("client"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
mongoose
  .connect("mongodb://localhost:27017/WhatsRecipe")
  .then(() => {
    console.log("connected to DB successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });

app.post("/search", async (req, res) => {
  let payload = req.body.payload;
  let search = await RecipeModel.find({
    foodName: { $regex: new RegExp(payload, "i") },
  }).exec();
  res.send({ payload: search });
});
app.get("/recipes", function (req, res) {
  RecipeModel.find()
    .limit(6)
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-recipe", function (req, res) {
  const { foodName, foodImage, foodIngredients } = req.body;
  const recipe = new RecipeModel({
    foodName,
    foodImage,
    foodIngredients,
  });
  recipe
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.get("/users", function (req, res) {
  UserModel.find({}, "-password")
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.post("/create-user", function (req, res) {
  const { name, email, username, password } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new UserModel({
        name,
        username,
        email,
        password: hash,
      });
      user
        .save()
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.status(501);
          res.json({ errors: err });
        });
    });
  });
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      console.log(user);
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({ user }, access_secret);
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
          });
          res.json({ user });
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      return res.sendStatus(404);
    });
});

app.get("/logout", function (req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.json({ message: "Successfully Logged Out" });
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/client/views/signup.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/client/views/login.html");
});
app.get("/create-recipe", (req, res) => {
  res.sendFile(__dirname + "/client/views/create-recipe.html");
});
app.get("/edit-recipe", (req, res) => {
  res.sendFile(__dirname + "/client/views/edit-recipe.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/client/views/contact.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/views/index.html");
});

app.listen(3002, () => {
  console.log(`Running on ${3002}`);
});
