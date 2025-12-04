import { Router } from "express";
import { AnotacaoService } from "../services/AnotacaoServices";

const router = Router();
const anotacaoService = new AnotacaoService();

router.get("/anotacoes/:id", async (req, res) => {
    try{
        const anotacao = await anotacaoService.getAnotacao(req.params.id);
        res.status(200).json(anotacao);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

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

router.put("/anotacoes/:id", async (req, res) => {
    try{
        const anotacao = await anotacaoService.updateAnotacao(req.params.id, req.body);
        res.status(200).json(anotacao);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.delete("/anotacoes/:id", async (req, res) => {
    try{
        const anotacao = await anotacaoService.deleteAnotacao(req.params.id);
        res.status(200).json(anotacao);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;