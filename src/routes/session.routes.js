import { Router } from 'express';
import UserController from '../app/controllers/userController';

class Routes {
  constructor() {
    this.routes = Router();

    // this.allRoutesSession();
    const userController = new UserController();
    this.routes.post('/create_kow_user', userController.createUser);
  }
}

export default new Routes().routes;
