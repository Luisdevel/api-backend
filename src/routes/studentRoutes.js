import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.post('/', studentController.store);
routes.get('/', studentController.index);
routes.get('/:id', loginRequired, studentController.show);
routes.put('/:id', loginRequired, studentController.update);
routes.delete('/:id', loginRequired, studentController.delete);

export default routes;
