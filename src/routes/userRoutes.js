import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.post('/', userController.store);
routes.get('/', loginRequired, userController.index);
routes.get('/:id', loginRequired, userController.show);
routes.put('/', loginRequired, userController.update);
routes.delete('/', loginRequired, userController.delete);

export default routes;
