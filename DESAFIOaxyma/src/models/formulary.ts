import { dbQuery, dbQueryFirst } from "../services/db"

export type Formulary = {
    id: number,
    name: string,
    created_at: number,
    items: string
}

// função para inserir informações na tabela
const insertFormulary = async (formulary: Formulary) => {
    await dbQuery(`INSERT INTO product (name, created_at) VALUES(?, ?)`, [formulary.name, formulary.created_at])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'formulary'`);
    return getFormulary(retorno[0].Id);
}

//listar informações da tabela
const listFormulary = async () => {
    const retorno = await dbQuery(`SELECT * FROM formulary`);
    return retorno as Formulary[];
}

//pegando informações da tabela 
const getFormulary = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM formulary WHERE id = ?`, [id]);
    return retorno as Formulary | undefined;
}

//função para deletar informações
const deleteFormulary = async (id: number) => {
    await dbQueryFirst(`DELETE FROM formulary WHERE id = ?`, [id]);
}


export const formularyModel = {
    insertFormulary,
    listFormulary,
    getFormulary,
    deleteFormulary
}