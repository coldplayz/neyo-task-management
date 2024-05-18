/**
* Core business rules.
* - defines objects that make or save the business money.
* - implemented in such a way that they can function the same
*   if moved to a different application in the same organization.
* - entities - higher level policies - shouldn't know about
*   lower level implementation details/logic;
*   these will be injected to achieve dependency inversion.
*/

class TaskEntity {
  constructor(servicePlugin) {
    this.service = servicePlugin;
  }

  createTask(taskData) {
    return this.service.createTask(taskData);
  };

  getTasks(queryObj) {
    return this.service.getTasks(queryObj);
  }

  getTaskById(id) {
    return this.service.getTaskById(id);
  }

  editTaskById(id, updateObj) {
    return this.service.editTaskById(id, updateObj);
  }

  deleteTaskById(id) {
    return this.service.deleteTaskById(id);
  }
}

export default TaskEntity;
