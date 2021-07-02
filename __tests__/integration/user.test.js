import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { addHours } from 'date-fns';
import faker from 'faker';
import request from 'supertest';
import application from '../../src/app';
import SessionController from '../../src/app/controllers/sessionController';
import User from '../../src/app/models/User';
import connection from '../../src/database';

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

  it('should return token for valitation e-mail', async () => {
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

  it('should send token for validation for e-mail', async () => {
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
    });

    const response = await request(application)
      .get('/email/token')
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

  it('should not send token email when email is already valid', async () => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASD';
    const email = faker.internet.email();

    const salt = bcrypt.genSaltSync();
    const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);
    const hashPassword = bcrypt.hashSync(password, salt);

    await User.create({
      email,
      isValid: true,
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      hashPassword,
      idKow: id,
    });

    const response = await request(application)
      .get('/email/token')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should valid email token valid', async () => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASD';
    const email = faker.internet.email();

    const salt = bcrypt.genSaltSync();
    const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);
    const hashPassword = bcrypt.hashSync(password, salt);
    const tokenEmail = crypto.randomBytes(5).toString('hex');

    await User.create({
      email,
      isValid: true,
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      hashPassword,
      idKow: id,
    });

    const response = await request(application)
      .post('/email/validation')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`)
      .send({ tokenEmail });

    expect(response.status).toBe(200);
  });

  it('should not validity e-mail with token invalid', async () => {
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
        expire: addHours(new Date(), -2),
        token: tokenEmail,
      }],
    });

    const response = await request(application)
      .post('/email/validation')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`)
      .send({ tokenEmail });

    expect(response.status).toBe(401);
  });

  it('should not validity e-mail without token', async () => {
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
    });

    const response = await request(application)
      .post('/email/validation')
      .set('Authorization', `Bearer ${new SessionController().generateToken({ id })}`)
      .send({ tokenEmail });

    expect(response.status).toBe(401);
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
