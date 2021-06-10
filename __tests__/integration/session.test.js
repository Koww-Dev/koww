// import request from 'supertest';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import request from 'supertest';
import connection from '../../src/database';
import application from '../../src/app';
import User from '../../src/app/models/User';

describe('Authentication', () => {
  beforeEach(async () => {
    try {
      await connection.connection.dropCollection('users');
    } catch (error) {
      // console.log(error);
    }
  });

  it('should authenticate with valid credentials.', async (done) => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASDsasd';
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
      .post('/sign')
      .send({
        email,
        password,
      });
    expect(response.status).toBe(200);
    done();
  });

  it('should not authenticate with invalid credential e-mail', async () => {
    const password = '2312312323DFGHFGdfgdfgxdfgASDASDASD';
    const email = faker.internet.email();
    const salt = bcrypt.genSaltSync();
    const id = (crypto.randomBytes(5).toString('hex')) + bcrypt.hashSync(email, salt);
    const hashPassword = bcrypt.hashSync(password, salt);

    await User.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      hashPassword,
      idKow: id,
    });

    const response = await request(application)
      .post('/sign')
      .send({
        email: faker.internet.email(),
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should not authenticate with invalid credential passoword', async () => {
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
      .post('/sign')
      .send({
        email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
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
      .post('/sign')
      .send({
        email,
        password,
      });

    expect(response.body).toHaveProperty('token');
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
