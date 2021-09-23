import { Router } from 'express';

import SessionController from '../app/controllers/sessionController';
import UserController from '../app/controllers/userController';
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
    this.routes.post('/email/token', this.userController.getTokenForValidationEmail);
    this.routes.post('/email/validation', this.userController.validationEmail);
    this.routes.use(this.tokenValidation.validationEmail);
    this.routes.get('/', this.userController.getUserData);
    this.routes.put('/update', this.userController.updateUser);
    this.routes.post('/send_token_password_reset', this.userController.sendTokenForResetPassword);
    this.routes.put('/reset_password', this.userController.resetPassword);
  }
}

export default new Routes().routes;
