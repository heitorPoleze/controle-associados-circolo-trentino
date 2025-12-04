import { Router } from "express";
import { TelefoneServices } from "../services/TelefoneServices";

const router = Router();
const telefoneService = new TelefoneServices();

router.get("/telefones/:id", async (req, res) => {
    try{
        const telefone = await telefoneService.getTelefone(req.params.id);
        res.status(200).json(telefone);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.post("/telefones", async (req, res) => {
    try{
        const telefone = await telefoneService.criarTelefone(req.body);
        res.status(201).json(telefone);
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.put("/telefones/:id", async (req, res) => {
    try{
        const telefone = await telefoneService.updateTelefone(req.params.id, req.body);
        res.status(200).json(telefone);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.delete("/telefones/:id", async (req, res) => {
    try{
        const telefone = await telefoneService.deleteTelefone(req.params.id);
        res.status(200).json(telefone);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;