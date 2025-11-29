import type { AssociadoData } from "../services/AssociadoServices";
import type { EnderecoData } from "../services/EnderecoServices";
import type { TelefoneData } from "../services/TelefoneServices";

export function validarAssociado(dados: AssociadoData) {
 const errors: any = {};

    if (!dados.nome || dados.nome.length < 1 || dados.nome.length > 100) {
        errors.nome = "Nome inválido. O nome deve ter entre 1 e 100 caracteres.";
    }
    if (dados.cpf.replace(/\D/g, "").length !== 11) {
        errors.cpf = "CPF inválido. O CPF deve ter 11 caracteres.";
    }
    if (dados.dataNascimento.length !== 10) {
        errors.dataNascimento = "Data de nascimento inválida. A data de nascimento deve ter 10 caracteres.";
    }
    if (dados.sexo !== 'M' && dados.sexo !== 'F') {
        errors.sexo = "Sexo inválido. O sexo deve ser M ou F.";
    }
    if (dados.email.length < 1 || dados.email.length > 100) {
        errors.email = "Email inválido. O email deve ter entre 1 e 100 caracteres.";
    }
    if (dados.familia && dados.familia.length > 100) {
        errors.familia = "Familia inválida. A familia deve ter até 100 caracteres.";
    }
    if (dados.localOrigem &&  dados.localOrigem.length > 100) {
        errors.localOrigem = "Local de origem inválido. O local de origem deve ter até 100 caracteres.";
    }
    if (dados.condicao !== "Ativo" && dados.condicao !== "Inativo" && dados.condicao !== "Cancelado") {
        errors.condicao = "Condicao inválida.";
    }

    return errors;
}

export function validarTelefone(formData: TelefoneData) {
  const errors: any = {};

  if (formData.numero.replace(/\D/g, "").length !== 8 && formData.numero.replace(/\D/g, "").length !== 9) {
      errors.telefone = "Telefone inválido. O telefone deve ter 8 ou 9 dígitos.";  
  }
  if(formData.ddd.length !== 2 && formData.ddd.length !== 3) {
      errors.ddd = "DDD inválido. O DDD deve ter 2 ou 3 dígitos.";  
  }

  return errors;
}

export function validarEndereco(data: EnderecoData) {
    const errors: any = {};

    if (data.logradouro.length === 0 || data.logradouro.length > 255) 
        errors.logradouro = "Logradouro inválido (1-255 caracteres).";

    if (data.bairro.length === 0 || data.bairro.length > 100) 
        errors.bairro = "Bairro inválido (1-100 caracteres).";

    if (data.cidade.length === 0 || data.cidade.length > 100) 
        errors.cidade = "Cidade inválida (1-100 caracteres).";

    if (data.uf.length !== 2) 
        errors.uf = "UF inválida (2 dígitos).";
    
    if (data.cep.replace(/\D/g, "").length !== 8) 
        errors.cep = "CEP inválido.";
    
    if (data.pais.length > 50) 
        errors.pais = "País inválido (máximo 50 caracteres).";

    return errors;
}

export function regexManterApenasNumeros(dado: string): string {
  return dado.replace(/\D/g, "")
}

export type ValidationErrors = Record<string, string | null | undefined>;
