export interface IUsers extends IUserInput {
  createdat: string,
  id: string,
  updatedat: string,
}


export interface IUserInput {
  firstName: string,
  lastName: string,
  otherNames: string,
  email: string
  userRole: string,
  status?: "active" | "inactive",
  userType: string,
}

export interface IAuditReport {
  date: string,
  activity: string,
  activity_by: string,
  details: string,
}