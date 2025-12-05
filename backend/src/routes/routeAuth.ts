import { Router } from "express";
import { AuthService } from "../services/AuthService";

const router = Router();
const authService = new AuthService();

router.post("/login", async (req, res) => {
    const  { login, senha } = req.body;
    try {
        const resultado = await authService.autenticar(login, senha);
        res.status(200).json(resultado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ mensagem: error.message });
        } else {
            res.status(500).json({ mensagem: 'Erro desconhecido ao autenticar.' });
        }
    }
});

export default router;