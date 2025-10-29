import { Router } from "express";
import { conexao } from "../config/sql";
import { Associado } from "../model/Classes/Associado/Associado";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { AssociadoService } from "../services/AssociadoService";

const router = Router();
const associadoService = new AssociadoService();

router.post("/associados", async (req, res) => {
    try{
        const associado = await associadoService.criarAssociadoCompleto(req.body);
        res.status(201).json(associado);
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/associados", async (req, res) => {
    try{
        const repAssociado = new RepositorioAssociado(conexao);
        const associados = await repAssociado.buscarTodos();
        res.status(200).json(associados);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/associados/:id", async (req, res) => {
    try{
        const associado = await associadoService.buscarAssociadoCompletoPorId(req.params.id);
        res.status(200).json(associado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
})

export default router;