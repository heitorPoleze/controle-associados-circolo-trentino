import { Router } from "express";
import { EnderecoService } from "../services/EnderecoServices";

const router = Router();
const enderecoService = new EnderecoService();

router.get("/enderecos/:id", async (req, res) => {
    try{
        const endereco = await enderecoService.getEndereco(req.params.id);
        res.status(200).json(endereco);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.post("/enderecos", async (req, res) => {
    try{
        const endereco = await enderecoService.criarEndereco(req.body);
        res.status(201).json(endereco);
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.put("/enderecos/:id", async (req, res) => {
    try{
        const endereco = await enderecoService.updateEndereco(req.params.id, req.body);
        res.status(200).json(endereco);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.delete("/enderecos/:id", async (req, res) => {
    try{
        const endereco = await enderecoService.deleteEndereco(req.params.id);
        res.status(200).json(endereco);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;