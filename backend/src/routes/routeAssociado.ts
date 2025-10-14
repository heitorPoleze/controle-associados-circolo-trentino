import { Router } from "express";
import { RepositorioAssociado, RepositorioAssociado } from "../model/Repositorios/RepositorioAssociado";
import { conexao } from "../config/sql";
import { RepositorioEndereco } from "../model/Repositorios/RepositorioEndereco";
import { RepositorioTelefone } from "../model/Repositorios/RepositorioTelefone";
import { Telefone } from "../model/Classes/Telefone";
import { Endereco } from "../model/Classes/Endereco";
import { Associado } from "../model/Classes/Associado/Associado";

const router = Router();

router.post("/associados", async (req, res) => {
    try {
        const { ddd, numero } = req.body;
        const telefone = new Telefone(ddd, numero);
        
        const { logradouro, bairro, cidade, uf, cep, pais } = req.body;
        const endereco = new Endereco(logradouro, bairro, cidade, uf, cep, pais);

        const {nome, familia, localOrigem, dataNascimento, sexo, email, cpf, condicao} = req.body;
        const associado = new Associado(nome, dataNascimento, sexo, endereco, telefone, email, cpf, familia, localOrigem, condicao)

        const repAssociado = new RepositorioAssociado(conexao, telefone, endereco);

        const associadoCriado = await repAssociado.criar(associado);

        res.status(201).json(associadoCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 
                mensagem: error.message});
        }
    }
});

export default router;