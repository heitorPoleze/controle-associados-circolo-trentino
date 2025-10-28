import { Router } from "express";
//import { RepositorioAssociado, RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { conexao } from "../config/sql";
import { Associado } from "../model/Classes/Associado/Associado";
import { RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";

const router = Router();

router.post("/associados", async (req, res) => {
    try {
        const {nome, familia, localOrigem, dataNascimento, sexo, email, cpf, condicao} = req.body;
        const associado = new Associado(nome, dataNascimento, sexo, email, cpf, familia, localOrigem, condicao);

        const repAssociado = new RepositorioAssociado(conexao);

        
        const associadoCriado = await repAssociado.criar(associado);

        /*const { ddd, numero } = req.body;
        const telefone = new Telefone(ddd, numero);
        
        const { logradouro, bairro, cidade, uf, cep, pais } = req.body;
        const endereco = new Endereco(logradouro, bairro, cidade, uf, cep, pais);
        */

        res.status(201).json(associadoCriado);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;