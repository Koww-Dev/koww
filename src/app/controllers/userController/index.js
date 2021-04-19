import UserModel from '../../models/User';

class UserController {
  userModel = UserModel;

  name = 'jdfjsdkfjn';

  createUser = async (request, response) => {
    await response.send({ name: this.name });
  }
}

export default UserController;
