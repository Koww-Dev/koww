import jwt from 'jsonwebtoken';
import User from '../models/User';

class EmailValidation {
  userModel = User;

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} response
  */
  validationMidddleware = async (request, response, next) => {
    /** @type {string} */
    const tokenClient = request.headers.authorization;

    if (!tokenClient) {
      return response.status(401).json({ error: 'No token provide' });
    }

    const parts = tokenClient.split(' ');

    if (!parts.length === 2) {
      return response.status(401).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return response.status(401).send({ erro: 'Token malformated' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KOW);

      request.userId = decoded.id;
      return next();
    } catch (error) {
      return response.status(401).json({ message: 'Token invalid' });
    }
  }

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} response
  */
  validationEmail = async (request, response, next) => {
    const idKow = request.userId;

    const { isValid } = await this.userModel.findOne({ idKow }).select('+isValid');

    if (!isValid) {
      return response.status(401).json({ isValidEmail: false });
    }

    return next();
  }
}

export default EmailValidation;
