describe('Register User and validation e-mail', () => {
  it('should not create user in platform with e-mail invalid.', async (done) => {
    expect(400).toBe(401);
    done();
  });
});
