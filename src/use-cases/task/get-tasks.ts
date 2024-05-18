/**
* Application-specific business rules.
* - can only depend on the higher-level core business rules (entities)
* - avoid dependencies on outer layers using dependency injection.
* - this is a demo/assessment, so not much by way of business rules.
*/

import TaskEntity from "../../entities/task.entity";

export default function getTask(taskService, queryObj) {
  // Inject dependency into the higher-level entity
  const taskEntity = new TaskEntity(taskService);

  return taskEntity.getTasks(queryObj);
}
