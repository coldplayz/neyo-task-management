/**
* Formats use-case input and output.
* - ensures input data is in the form the
*   application-specific business rules/logic want it.
* - will pass dependencies to be injected to use cases,
*   thus knowing about and depending on their import.
*/

import {Request, Response, NextFunction} from "express";

import * as userService from "../data-access/services/user.service";
import userUC from "../use-cases/user";

// TODO:
// - see about decoupling controller from data service; perhaps
//   moving dependency injection to the main entry point - index.ts
// - data validation
// - data formatting

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const queryProps = ['id', 'firstName', 'lastName', 'email'];
  const queryObj = {};

  queryProps.forEach((prop) => {
    if (req.query[prop]) queryObj[prop] = req.query[prop];
  });

  try {
    const users = await userUC.getUsers(userService, queryObj);
    res.json({users});
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await userUC.getUserById(userService, id);
    res.json({user});
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const bodyProps = ['password', 'firstName', 'lastName', 'email'];
  const userData = {};

  bodyProps.forEach((prop) => {
    if (req.body[prop]) userData[prop] = req.body[prop];
  });

  try {
    const newUser = await userUC.createUser(userService, userData);
    res.json({newUser});
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function editUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const updateData = {};

  const bodyProps = ['password', 'firstName', 'lastName', 'email'];
  bodyProps.forEach((prop) => {
    if (req.body[prop]) updateData[prop] = req.body[prop];
  });

  try {
    const editedUser = await userUC.editUserById(userService, id, updateData);
    res.json({editedUser});
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}

export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const result = await userUC.deleteUserById(userService, id);
    res.json({ success: true, result });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err });
  }
}
