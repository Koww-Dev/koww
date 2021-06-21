import { Router } from 'express';
import UserController from '../app/controllers/userController';
import SessionController from '../app/controllers/sessionController';
import EmailValidation from '../app/middlewares/userValidation';

class Routes {
  userController;

  tokenValidation = new EmailValidation();

  sessionController = new SessionController();

  constructor() {
    this.routes = Router();
    this.userController = new UserController();

    this.allRoutesSession();
  }

  allRoutesSession() {
    this.routes.post('/sign', this.sessionController.sign);
    this.routes.post('/sinup', this.userController.createUser);
    this.routes.use(this.tokenValidation.validationMidddleware);
    this.routes.get('/email/token', this.userController.getTokenForValidationEmail);
    this.routes.post('/email/validation', this.userController.validationEmail);
    this.routes.use(this.tokenValidation.validationEmail);
    this.routes.get('/', this.userController.getUserData);
  }
}

export default new Routes().routes;
