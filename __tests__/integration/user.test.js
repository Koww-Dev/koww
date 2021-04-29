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

  it('should not create user in platform with e-mail valid.', async (done) => {
    const response = await request(application)
      .post('/create_kow_user')
      .send({
        email: faker.internet.email(),
        name: faker.name.findName(),
        userName: faker.internet.userName(),
        password: '12341asdaASDASDADS',
      });

    expect(response.status).toBe(201);
    done();
  });

  it('should not create user in platform with e-mail what already exists.', async (done) => {
    await User.create({
      email: 'kevson@gmail.com',
      name: 'Kevson Filipe',
      userName: 'Kevson123',
      hashPassword: 'a18u298128u0',
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
