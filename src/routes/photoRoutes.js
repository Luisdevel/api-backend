import { Router } from 'express';
import photoController from '../controllers/PhotoControllers';

const routes = new Router();

routes.post('/', photoController.store);

export default routes;
