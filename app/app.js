import express from "express";
import session from "express-session";
import { create as createHandlebars } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { routes as carRoutes } from "./cars/routes.js";
import { routes as authRoutes } from "./auth/routes.js";

const app = express();
const hbs = createHandlebars();
dotenv.config();

await mongoose.connect(
  `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.s66mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./app/views");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "the quick brown fox",
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/cars", carRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

export function start() {
  app.listen(80, () => {
    console.log("Listening at http://localhost");
  });
}
