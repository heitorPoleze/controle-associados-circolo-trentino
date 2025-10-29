
import { Router } from "express";
import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { conexao } from "../config/sql";
import { Endereco } from "../model/Classes/Endereco";

const router = Router();
const repEndereco = new RepositorioEndereco(conexao);


export default router;
    