import { Router } from 'express';
import { formularyController } from '../controllers/formulary';

const formularyRouter = Router();
formularyRouter.get('/', formularyController.listFormulary);
formularyRouter.get('/history/{id}', formularyController.getFormulary);
formularyRouter.post('/register_checklist', formularyController.insertFormulary);
formularyRouter.delete('/remove', formularyController.deleteFormulary);

export { 
    formularyRouter,
}

