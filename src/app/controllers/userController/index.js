// import crypto from 'crypto';
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
      if (!email.includes('@') || !email.includes('.com')) {
        return response.status(401).json({ message: 'e-mail inválido.' });
      }

      const existEmail = await this.userModel.findOne({ email });
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
        return response.status(401).json({ message: 'sua seha deve ter no mínimo 8 caracteres.' });
      }

      if (this.#validationPassword(password) === false) {
        return response.status(401).json({
          message: 'Sua senha de ter no mínimo 3 letras maiúscula,  3 minúscula e 3 números',
        });
      }

      const user = await this.userModel.create({
        email, name, userName, hashPassword: 'a18u2981fgdfghf28u0', idKow: 'a18u2dsfhgdfg98128u0',
      });
      return response.status(201).json({ message: 'Conta cadastrada com sucesso, ative sua conta através do e-mail', user });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'internal server error. we are working to fix it' });
    }
  }
}

export default UserController;
