import request from 'supertest';
import faker from 'faker';
import connection from '../../src/database';
import application from '../../src/app';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    try {
      await connection.connection.dropCollection('users');
    } catch (error) {
      // console.log(error);
    }
  });

  it('should not create user in platform with e-mail invalid.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevsonfilipesantos',
        name: 'Kevson Filipe',
        userName: 'Kevson123',
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with e-mail what already register.', async (done) => {
    await User.create({
      email: 'kevson@gmail.com',
      name: 'Kevson Filipe',
      userName: 'Kevson123',
      hashPassword: 'a18u298128u0',
      idKow: '234123rfdcwq34rfc',
    });

    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: faker.internet.userName(),
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with empty name.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: '',
        userName: faker.internet.userName(),
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with empty username.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: '',
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with username aready register.', async (done) => {
    await User.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      userName: 'Kevson123',
      hashPassword: 'a18u298128u0',
      idKow: '234123rfdcwq34rfc',
    });

    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with passowrd less than 8 characters.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '1243',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with passowrd less than 3 characters uppercase.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '21233Dasdasd',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with passowrd less than 3 characters lowcase.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '23423423ASDASDASD',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should not create user in platform with passowrd less than 3 numeric characters.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '23DFGHFGdfgdfgxdfgASDASDASD',
      });

    expect(response.status).toBe(401);
    done();
  });

  it('should create user in platform with strong password.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: 'kevson@gmail.com',
        name: faker.name.findName(),
        userName: 'Kevson123',
        password: '2312312323DFGHFGdfgdfgxdfgASDASDASD',
      });

    expect(response.status).toBe(201);
    done();
  });

  afterAll(async (done) => {
    try {
      await connection.connection.close();
      done();
    } catch (error) {
      // console.log(error);
      done();
    }
  });
});

// email: faker.internet.email(),
// name: faker.name.findName(),
// userName: faker.internet.userName(),
// password: faker.internet.password(),
