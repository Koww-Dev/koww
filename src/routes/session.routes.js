import { Router } from 'express';
import UserController from '../app/controllers/userController';

class Routes {
  userController;

  constructor() {
    this.routes = Router();
    this.userController = new UserController();

    this.allRoutesSession();
  }

  allRoutesSession() {
    this.routes.post('/create_kow_user', this.userController.createUser);
  }
}

export default new Routes().routes;
