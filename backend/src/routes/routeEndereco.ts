
import { Router } from "express";
//import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { conexao } from "../config/sql";
import { Endereco } from "../model/Classes/Endereco";

const router = Router();
//const repositorioEndereco = new RepositorioEndereco(conexao);
/*
router.post("/enderecos", async (req, res) => {
    try{
        const { logradouro, bairro, cidade, uf, cep, pais } = req.body;
        const endereco = new Endereco(logradouro, bairro, cidade, uf, cep, pais);

        const enderecoCriado = await repositorioEndereco.criar(endereco);

        res.status(201).json(enderecoCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

router.get("/enderecos", async (req, res) => {
    try{
        const enderecos = await repositorioEndereco.buscarTodos();
        res.status(200).json(enderecos);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
})

router.get("/enderecos/:id", async (req, res) => {
    try{
        const id = req.params.id; // req.params ou req.body?
        const endereco = await repositorioEndereco.buscarTodosOsAtributosPorId(id);
        res.status(200).json(endereco);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
})
*/
export default router;
