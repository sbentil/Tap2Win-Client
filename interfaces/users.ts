import { IPagination } from "."

export interface IUser extends IUserInput {
  createdAt: string,
  _id: string,
  updatedAt: string,
}


export interface IUserInput {
  name: string,
  email: string
  role: "admin" | "organizer"
  status: "active" | "inactive",
  phone: string
}


export interface IUserPagination extends IPagination {
  role?: "admin" | "organizer"
}


export const userTemplate: IUser = {
  _id: 'user_id_placeholder',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'organizer', // Can be 'admin' or 'organizer'
  status: 'active',  // Can be 'active' or 'inactive'
  phone: '1234567890',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
