import { Router } from 'express';
import UserController from '../app/controllers/userController';
import SessionController from '../app/controllers/sessionController';

class Routes {
  userController;

  sessionController = new SessionController();

  constructor() {
    this.routes = Router();
    this.userController = new UserController();

    this.allRoutesSession();
  }

  allRoutesSession() {
    this.routes.post('/sign', this.sessionController.sign);
    this.routes.post('/sinup', this.userController.createUser);
  }
}

export default new Routes().routes;
