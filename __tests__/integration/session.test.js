// import request from 'supertest';
import User from '../../src/app/models/User';

// describe('Register User', () => {
//   it('', () => {

//   });
// });

describe('Authentication', () => {
  it('it should authenticate with valid credentials', async () => {
    const user = await User.create({
      email: 'kevson@gmail.com', userName: 'kevson123', idKow: 'j23b4hb234', password_hash: '19845981235', name: 'Kevson Filipe',
    });

    expect(user.email).toBe('kevson@gmail.com');
  });
});
