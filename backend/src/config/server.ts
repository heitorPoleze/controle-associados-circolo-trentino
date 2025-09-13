import express from "express";
import path from "path";
// @ts-ignore
import consign from "consign";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

consign().include("src/routes").then("src/config/sql.ts").into(app);    