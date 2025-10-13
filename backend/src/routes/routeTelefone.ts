import { Router } from "express";
import { conexao } from "../config/sql";
import { Telefone } from "../model/Classes/Telefone";
import { RepostorioTelefone } from "../model/Repositorios/RepositorioTelefone";

const router = Router();
const repostorioTelefone = new RepostorioTelefone(conexao);

router.post("/telefones", (req, res) => {
    const {ddd, numero} = req.body;

    const telefone = new Telefone(ddd, numero);

    try{
        const telefoneCriado = repostorioTelefone.criarTelefone(telefone);
        res.status(201).json(telefoneCriado);
    } catch (error) {
        if (error instanceof Error) {
        res.status(500).json({ mensagem: error.message });
        }
    }

});

router.get("/telefones", (req, res) => {
    try{
        const telefones = repostorioTelefone.buscarTodosOsTelefones();
        res.status(200).json(telefones);
    } catch (error) {
        if (error instanceof Error) {
        res.status(500).json({ mensagem: error.message });
        }
    }
});

export default router;