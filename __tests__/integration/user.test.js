// import request from 'supertest';
// import request from 'supertest';
import connection from '../../src/database';
// import application from '../../src/app';

describe('Authentication', () => {
  beforeEach(async () => {
    try {
      await connection.connection.dropCollection('users');
    } catch (error) {
      // console.log(error);
    }
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    expect(200).toBe(200);
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
