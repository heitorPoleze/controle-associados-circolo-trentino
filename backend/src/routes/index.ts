import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

fs.readdirSync(__dirname).filter((file) => 
    file.indexOf('.') !== 0 && file !== 'index.ts' && (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
  ).forEach((file) => {
    const route = require(path.join(__dirname, file)).default;
    router.use(route);
    console.log(`Rotas do arquivo [${file}] carregadas com sucesso.`);
  });

  export default router;