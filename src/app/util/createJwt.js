import jwt from 'jsonwebtoken';

class Util {
  createTokenJwt = (id) => {
    const token = jwt.sign({ data: id }, process.env.SECRET_KOW, {
      expiresIn: 86400,
    });

    return token;
  }
}

export default Util;
