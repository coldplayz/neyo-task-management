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
};

export type UserDoc = HydratedDocument<IUserDoc>;

export interface IServicePlugin {
  getUsers(queryObj: IUserQueryDTO): Promise<UserDoc[]>;
  getUserById(id: string): Promise<UserDoc>;
  createUser(userData: IUserCreateDTO): Promise<UserDoc>;
  editUserById(id: string, updateObj: IUserUpdateDTO): Promise<UserDoc>;
  deleteUserById(id: string): Promise<ReturnType<typeof Model.deleteOne>>;
};
