import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { addHours, compareAsc } from 'date-fns';
import Email from '../../../services/email';
import User from '../../models/User';

class UserController {
  userModel = User;

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {string} pass
   */
  #validationPassword = (pass) => {
    const letterUpercase = /[A-Z]/;
    const letterLowcase = /[a-z]/;
    const numeros = /[0-9]/;
    let isPassValid = false;

    let auxMaiuscula = 0;
    let auxMinuscula = 0;
    let auxNumero = 0;

    for (let index = 0; index < pass.length; index += 1) {
      if (letterUpercase.test(pass[index])) {
        auxMaiuscula += 1;
      } else if (letterLowcase.test(pass[index])) {
        auxMinuscula += 1;
      } else if (numeros.test(pass[index])) {
        auxNumero += 1;
      }
    }

    if (auxMaiuscula >= 3) {
      if (auxMinuscula >= 3) {
        if (auxNumero >= 3) {
          isPassValid = true;
        }
      }
    }

    return isPassValid;
  }

  #validationEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
  */
  createUser = async (request, response) => {
    /**
     * @type {{ email: string, name: string, userName: string, password: string }}
    */
    const {
      email, name, userName, password,
    } = request.body;
    try {
      if (email.length <= 0 || !this.#validationEmail(email)) {
        return response.status(401).json({ message: 'e-mail inválido.' });
      }

      if (userName.length <= 0) {
        return response.status(401).json({ message: 'username não pode ser vázio.' });
      }

      const existEmail = await this.userModel.findOne({ email }); // null
      const existUserName = await this.userModel.findOne({ userName });

      if (existEmail) {
        return response.status(401).json({ message: 'Este e-mail já está cadastrado.' });
      }

      if (existUserName) {
        return response.status(401).json({ message: 'Este username já está cadastrado.' });
      }

      if (name.length <= 0) {
        return response.status(401).json({ message: 'nome muito curto.' });
      }

      if (password.length <= 8) {
        return response.status(401).json({ message: 'sua senha deve ter no mínimo 8 caracteres.' });
      }

      if (this.#validationPassword(password) === false) {
        return response.status(401).json({ message: 'Sua senha de ter no mínimo 3 letras maiúscula,  3 minúscula e 3 números' });
      }

      const salt = bcrypt.genSaltSync();
      const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);

      const hashPassword = bcrypt.hashSync(password, salt);

      const tokenEmail = crypto.randomBytes(5).toString('hex');

      const user = await this.userModel.create({
        email,
        name,
        userName,
        hashPassword,
        idKow: id,
        tokens: [{
          name: 'e-mail',
          expire: addHours(new Date(), 1),
          token: tokenEmail,
        }],
      });

      const token = jwt.sign({ data: user.id }, process.env.SECRET_KOW, {
        expiresIn: 86400,
      });

      user.hashPassword = undefined;
      user.tokens = undefined;
      user.isPremiun = undefined;

      await new Email().valitation({ email, name, token: tokenEmail });

      return response.status(201).json({
        message: 'Conta cadastrada com sucesso, ative sua conta através do e-mail',
        user,
        token,
      });
    } catch (error) {
      return response.status(500).json({ message: 'internal server error. we are working to fix it' });
    }
  }

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
  */
  getTokenForValidationEmail = async (request, response) => {
    const idKow = request.userId;
    const user = await this.userModel.findOne({ idKow }).select('+isValid');

    const { isValid } = user;

    if (isValid === true) {
      return response.status(200).json('Seu e-mail já está validado');
    }

    const tokenEmail = crypto.randomBytes(5).toString('hex');

    try {
      await this.userModel.findOneAndUpdate({ idKow }, {
        $push: {
          tokens: {
            name: 'e-mail',
            expire: addHours(new Date(), 1),
            token: tokenEmail,
          },
        },
      });

      await new Email().valitation({ email: user.email, name: user.name, token: tokenEmail });

      return response.status(200).json({ message: 'Emviamos um e-mail com o código de validação' });
    } catch (error) {
      return response.status(500).json({ message: 'Server internal error' });
    }
  }

  validationEmail = async (request, response) => {
    const idKow = request.userId;
    const { tokenEmail } = request.body;

    const user = await this.userModel.findOne({ idKow }).select('+isValid');

    const indextoken = [];
    const data = await Promise.all(
      user.tokens.filter((item) => {
        if (item.token !== tokenEmail) { return false; }
        const { _id } = item;
        return indextoken.push(_id);
      }),
    );

    if (indextoken.length === 0 || data[0].name !== 'e-mail') {
      await this.userModel.findOneAndUpdate({ idKow },
        { $pull: { tokens: { _id: indextoken[0] } } });
      return response.status(401).json({ message: 'Token invalid  dtdthrt' });
    }

    const isValid = compareAsc(data[0].expire, new Date());

    if (isValid !== 1) {
      await this.userModel.findOneAndUpdate({ idKow },
        { $pull: { tokens: { _id: indextoken[0] } } });

      return response.status(401).json({ message: 'Token expire' });
    }

    await this.userModel.findOneAndUpdate({ idKow }, { isValid: true });

    await this.userModel.findOneAndUpdate({ idKow }, { $pull: { tokens: { _id: indextoken[0] } } });

    return response.status(200).json('E-mail foi válidado');
  }

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
  */
  getUserData = async (request, response) => {
    const data = await this.userModel.findOne({ idKow: request.userId });
    response.status(200).json(data);
  }
}

export default UserController;
