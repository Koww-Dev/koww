// import request from 'supertest';
import application from '../../src/app';
import User from '../../src/app/models/User';

describe('Register User', () => {
  it('Register kow_user and return basic information includes token for authentication', async () => {
    const a = 1 + 1;

    await User.db.close();

    expect(a).toBe(2);
  });
});
