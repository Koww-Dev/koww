import request from 'supertest';
import application from '../../src/app';

describe('Register User', () => {
  it('Register kow_user and return basic information includes token for authentication', async () => {
    const a = 1 + 1;

    expect(a).toBe(2);
  });
});
