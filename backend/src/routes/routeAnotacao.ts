import { Router } from "express";
import { AnotacaoService } from "../services/AnotacaoServices";

const router = Router();
const anotacaoService = new AnotacaoService();

router.post("/anotacoes", async (req, res) => {
    try{
        const anotacao = await anotacaoService.criarAnotacao(req.body);
        res.status(201).json(anotacao);
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;