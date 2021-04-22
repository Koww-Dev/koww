import crypto from 'crypto';

import User from '../../models/User';

class UserController {
  userModel = User;

  /**
   * Creates an instance of Circle.
   *
   * @author: Kevson Filipe
   * @param {import("express").Response} request
   * @param {import("express").Response} response
  */
  createUser = async (request, response) => {
    const {
      email, name, userName, password,
    } = request.body;

    try {
      const isValidUserName = await this.userModel.findOne({ userName });
      const isValidEmail = await this.userModel.findOne({ email });

      if (!email.includes('@') || !email.includes('.com') || email.legth <= 0) {
        return response.json({ message: 'e-mail inválido' });
      }

      if (name.length <= 0) {
        return response.json({ message: 'nome inválido' });
      }

      if (isValidEmail) {
        return response.json({ message: 'Este e-mail já existe' });
      }

      if (isValidUserName) {
        return response.json({ message: 'Este userName já existe' });
      }

      if (password.length <= 7) {
        return response.json({ message: 'A senha deve ter no mínimo 8 caracteres' });
      }

      const hMac = crypto.createHmac('sha256', 'Açai com banana').update(password).digest('hex');

      const idKow = `${crypto.randomBytes(25).toString('hex')}/${userName}/${email}`;

      const data = await this.userModel.create({
        email, name, userName, hashPassword: hMac, idKow,
      });

      this.userModel.db.close();

      return response.json({ message: 'Conta cadastrada com sucesso, ative sua conta através do e-mail', data });
    } catch (error) {
      return response.json({ message: 'Houve um erro ao efetuar o cadastro' });
    }
  }
}

export default UserController;
