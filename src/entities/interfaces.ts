/**
* User and Task entity interfaces and types.
* - inputs/method args, and plugins must satisfy these interfaces.
*/

// TODO:
// - types are still coupled to the web framework;
//   see about achieving true decoupling.

import { HydratedDocument, Model } from "mongoose";

export type IBaseUserDTO = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export type IUserCreateDTO = Required<IBaseUserDTO>;

export interface IUserQueryDTO extends IBaseUserDTO {
  role?: string;
}

export type IUserUpdateDTO = IUserQueryDTO;

export type IUserDoc = Required<IBaseUserDTO> & {
  role?: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type UserDoc = HydratedDocument<IUserDoc>;

export interface IUserServicePlugin {
  getUsers(queryObj: IUserQueryDTO): Promise<UserDoc[]>;
  getUserById(id: string): Promise<UserDoc>;
  createUser(userData: IUserCreateDTO): Promise<UserDoc>;
  editUserById(id: string, updateObj: IUserUpdateDTO): Promise<UserDoc>;
  deleteUserById(id: string): Promise<ReturnType<typeof Model.deleteOne>>;
};

export type IBaseTaskDTO = {
  description?: string;
  done?: boolean;
}

export type ITaskCreateDTO = { description: string };

export type ITaskQueryDTO = {
  done?: boolean;
}

export type ITaskUpdateDTO = {
  description?: string;
  done?: boolean;
};

export type ITaskDoc = {
  description: string;
  done?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TaskDoc = HydratedDocument<ITaskDoc>;

export interface ITaskServicePlugin {
  getTasks(queryObj: ITaskQueryDTO): Promise<TaskDoc[]>;
  getTaskById(id: string): Promise<TaskDoc>;
  createTask(taskData: ITaskCreateDTO): Promise<TaskDoc>;
  editTaskById(id: string, updateObj: ITaskUpdateDTO): Promise<TaskDoc>;
  deleteTaskById(id: string): Promise<ReturnType<typeof Model.deleteOne>>;
};
