import { Router } from "express";
import { AssociadoService } from "../services/AssociadoServices";
import { EnderecoService } from "../services/EnderecoServices";
import { TelefoneServices } from "../services/TelefoneServices";
import { AnotacaoService } from "../services/AnotacaoServices";

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
        const associados = await associadoService.buscarTodos();
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
});

router.put("/associados/:id", async (req, res) => {
    try{
        const associado = await associadoService.updateAssociado(req.params.id, req.body);
        res.status(200).json(associado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.delete("/associados/:id", async (req, res) => {
    try{
        const associado = await associadoService.deleteAssociado(req.params.id);
        res.status(200).json(associado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/associados/:id/enderecos", async (req, res) => {
    const serviceEndereco = new EnderecoService();
    try{
        const enderecos = await serviceEndereco.buscarTodosOsEnderecosDoAssociado(req.params.id);
        res.status(200).json(enderecos);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/associados/:id/telefones", async (req, res) => {
    const serviceTelefone = new TelefoneServices();
    try{
        const telefones = await serviceTelefone.buscarTodosOsTelefonesDoAssociado(req.params.id);
        res.status(200).json(telefones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/associados/:id/anotacoes", async (req, res) => {
    const serviceAnotacao = new AnotacaoService();
    try{
        const anotacoes = await serviceAnotacao.buscarTodasAsAnotacoesDoAssociado(req.params.id);
        res.status(200).json(anotacoes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
})
export default router;