/**
* Formats use-case input and output.
* - ensures input data is in the form the
*   application-specific business rules/logic want it.
* - will pass dependencies to be injected to use cases,
*   thus knowing about and depending on their import.
*/

import {Request, Response, NextFunction} from "express";

import * as userService from "../data-access/services/user.service";
import * as taskService from "../data-access/services/task.service";
import userUC from "../use-cases/user";
import taskUC from "../use-cases/task";

// TODO:
// - see about decoupling controller from data service; perhaps
//   moving dependency injection to the main entry point - index.ts
// - data validation
// - data formatting

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  const queryProps = ['done'];
  const queryObj = {};

  queryProps.forEach((prop) => {
    if (req.query[prop]) queryObj[prop] = req.query[prop];
  });

  switch (req.query.done) {
    case 'false':
      queryObj.done = false;
      break;
    case 'true':
      queryObj.done = true;
      break;
  }

  try {
    const tasks = await taskUC.getTasks(
      userService,
      queryObj,
      req.user.id
    );
    res.json({ tasks });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function getTaskById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const task = await taskUC.getTaskById(taskService, id);
    res.json({task});
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  const bodyProps = ['description'];
  const taskData = {};

  bodyProps.forEach((prop) => {
    if (req.body[prop]) taskData[prop] = req.body[prop];
  });

  try {
    const newTask = await taskUC.createTask(
      taskService,
      userService,
      taskData,
      req.user.id
    );
    res.json({newTask});
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function editTaskById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const updateData: { [key: string]: string } = {};

  const bodyProps = ['description', 'done'];
  bodyProps.forEach((prop) => {
    if (req.body[prop]) updateData[prop] = req.body[prop];
  });

  try {
    const editedTask = await taskUC.editTaskById(taskService, id, updateData);
    res.json({editedTask});
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function deleteTaskById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const result = await taskUC.deleteTaskById(
      taskService,
      userService,
      id,
      req.user.id
    );
    res.json({ success: true, result });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}
