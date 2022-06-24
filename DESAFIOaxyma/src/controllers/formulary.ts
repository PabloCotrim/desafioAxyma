import { Formulary, formularyModel } from './../models/formulary';
import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';


// função para inserir formulario, onde caso não ocorra a inserção das informações, retornará uma mensagem como descrita abaixo
const insertFormulary = (req: Request, res: Response) => {
    {
        const formulary = req.body;
        if (!formulary)
            return badRequest(res, "Informação inválido");

        if (!formulary.name)
            return badRequest(res, 'Informe o nome do item ao formulario');

        if (!validateNumber(formulary.created_at))
            return badRequest(res, 'Informe o numero em timestamp(milessegundos)');
    }

    const formulary = req.body as Formulary;
    return formularyModel.insertFormulary(formulary)
        .then(formulary => {
            res.json(formulary);
        })
        .catch(err => internalServerError(res, err));
}

//função para atualizar usuario... implemento para o desafio
const updateFormulary = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const formulary = req.body;
        if (!formulary)
            return badRequest(res, "Informação inválido");

        if (!formulary.name)
            return badRequest(res, 'Informe o nome para ser inserido no formulario');

        if (!validateNumber(formulary.created_at))
            return badRequest(res, 'Informe o numero em timestamp em milessegundos');

        const formularySaved = await formularyModel.getFormulary(id);
        if(!formularySaved)
            return notFound(res);
    }

    const formulary = req.body as Formulary;
    return formularyModel.insertFormulary(formulary)
        .then(formulary => {
            res.json(formulary)
        })
        .catch(err => internalServerError(res, err));
}


const listFormulary = ({}: Request, res: Response) => {
    formularyModel.listFormulary()
        .then(formulary => {
            res.json(formulary)
        })
        .catch(err => internalServerError(res, err));
}

const getFormulary = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return formularyModel.getFormulary(id)
        .then((formulary) => {
            if(formulary)
                return res.json(formulary);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteFormulary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const formularySaved = await formularyModel.getFormulary(id);
        if(!formularySaved)
            return notFound(res);
    }

    return formularyModel.deleteFormulary(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const formularyController = {
    insertFormulary,
    listFormulary,
    getFormulary,
    deleteFormulary,
    //implementação ao projeto
    updateFormulary
}

