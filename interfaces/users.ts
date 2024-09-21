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