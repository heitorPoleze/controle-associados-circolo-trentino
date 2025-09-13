import { app } from "../config/server";

app.get("/associados", (req, res) => res.render("associados/associados"));
app.get("/associados/adicionar", (req, res) => res.render("associados/adicionar"));
app.post("/associados/AddValidacao", (req, res) => res.render("associados/adicionar"));