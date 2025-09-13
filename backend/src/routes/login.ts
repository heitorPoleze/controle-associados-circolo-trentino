import { app } from "../config/server";

app.get("/", (req, res) => res.render("login/login"));
app.get("/login", (req, res) => res.render("login/login"));
//ainda fazendo
app.post("/login/autenticar", (req, res) => res.render("login/login"));