import { Router } from "express";
import { conexao } from "../config/sql";
import { Telefone } from "../model/Classes/Telefone";
import { RepositorioTelefone as RepositorioTelefone } from "../model/Repositorios/RepositorioTelefone";

const router = Router();
const repositorioTelefone = new RepositorioTelefone(conexao);

router.post("/telefones", async (req, res) => {
    try {
        const { ddd, numero } = req.body;
        const telefone = new Telefone(ddd, numero);

        const telefoneCriado = await repositorioTelefone.criar(telefone);
        
        res.status(201).json(telefoneCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/telefones", async (req, res) => {
    try{
        const telefones = await repositorioTelefone.buscarTodos();
        res.status(200).json(telefones);
    } catch (error) {
        if (error instanceof Error) {
        res.status(500).json({ mensagem: error.message });
        }
    }
});

export default router;