import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

class SessionController {
  userModel = User;

  generateToken = (pasrams = {}) => jwt.sign(pasrams, process.env.SECRET_KOW, {
    expiresIn: 86400,
  })

  /**
   * Creates an instance of Circle.
   * @author Kevson Filipe
   * @param {import("express").Request} request
   * @param {import("express").Response} response
  */
  sign = async (request, response) => {
    /**
     * @type {{ email: string, password: string }}
    */
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+hashPassword');

    if (!user) {
      return response.status(401).json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.hashPassword)) {
      return response.status(401).send({ error: 'Invalid password' });
    }

    user.hashPassword = undefined;
    return response.status(200).json({ token: this.generateToken({ id: user.idKow }) });
  }
}

export default SessionController;
