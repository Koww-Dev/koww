import faker from 'faker';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import request from 'supertest';
import { addHours } from 'date-fns';
import connection from '../../src/database';
import application from '../../src/app';
import SessionController from '../../src/app/controllers/sessionController';
import User from '../../src/app/models/User';

describe('Authentication', () => {
  beforeEach(async () => {
    try {
      await connection.connection.dropCollection('users');
    } catch (error) {
      // console.log(error);
    }
  });

  it('should not be able to access private routes with unverified email', async (done) => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASD';
    const email = faker.internet.email();

    const salt = bcrypt.genSaltSync();
    const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);
    const hashPassword = bcrypt.hashSync(password, salt);

    await User.create({
      email,
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      hashPassword,
      idKow: id,
    });

    const response = await request(application)
      .get('/')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`);

    expect(response.status).toBe(401);
    done();
  });

  it('should return jwt token when authenticated', async () => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASD';
    const email = faker.internet.email();

    const salt = bcrypt.genSaltSync();
    const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);
    const hashPassword = bcrypt.hashSync(password, salt);
    const tokenEmail = crypto.randomBytes(5).toString('hex');

    await User.create({
      email,
      isValid: false,
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      hashPassword,
      idKow: id,
      tokens: [{
        name: 'e-mail',
        expire: addHours(new Date(), 1),
        token: tokenEmail,
      }],
    });

    const response = await request(application)
      .post('/email/validation')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`)
      .send({ tokenEmail });

    expect(response.status).toBe(200);
  });

  afterAll(async (done) => {
    try {
      await connection.connection.close(true);
      done();
    } catch (error) {
      // console.log(error);
      done();
    }
  });
});
