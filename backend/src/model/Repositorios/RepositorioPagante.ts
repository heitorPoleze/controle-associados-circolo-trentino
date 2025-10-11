import { ResultSetHeader, RowDataPacket } from "mysql2";
import { conexao } from "../../config/sql";
import { Pagante } from "../Classes/Associado/Pagante";
//codigo feito antes de implementar session
export class RepositorioPagante {

    async buscarTodosOsAtributosPorId(id: string) {
        const sql = 'SELECT * FROM pagantes WHERE idPagante = ?';
        const [result] = await conexao.query<RowDataPacket[]>(sql, [id]);

        if (result.length === 0) {
            return null;
        } else {
            /*return new Pagante(
                result[0].nome,
                result[0].dataNascimento,
                result[0].sexo,
                result[0],
                result[0].telefone,
                result[0].email
            );*/
        }
    }
}