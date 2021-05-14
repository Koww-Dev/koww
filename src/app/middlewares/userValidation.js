import User from '../models/User';

class EmailValidation {
  userModel = User;

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
  */
  validationMidddleware = (request, response) => {
    const { authorization } = request.headers;
    console.log(authorization);
    response.status();
  }
}

export default EmailValidation;
