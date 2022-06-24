import { Application } from "express";
import Router from 'express';
import { formularyRouter } from "./formulary";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/formulary', formularyRouter);

    app.use('/api/v1', apiRouter);
}


