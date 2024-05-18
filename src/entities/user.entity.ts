/**
* Core business rules.
* - defines objects that make or save the business money.
* - implemented in such a way that they can function the same
*   if moved to a different application in the same organization.
* - entities - higher level policies - shouldn't know about
*   lower level implementation details/logic;
*   these will be injected to achieve dependency inversion.
*/

class UserEntity {
  constructor(servicePlugin) {
    this.service = servicePlugin;
  }

  createUser(userData) {
    return this.service.createUser(userData);
  };

  getUsers(queryObj) {
    return this.service.getUsers(queryObj);
  }

  getUserById(id) {
    return this.service.getUserById(id);
  }

  editUserById(id, updateObj) {
    return this.service.editUserById(id, updateObj);
  }

  deleteUserById(id) {
    return this.service.deleteUserById(id);
  }
}

export default UserEntity;
