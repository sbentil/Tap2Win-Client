import { IUsers } from "@/interfaces/users";
import { TbColumnObj } from "@/components/table/table";
import { formatDate } from "@/helpers/datetime";

export const Columns: TbColumnObj[] = [
  {
    title: "Name",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => [row.firstName, row.lastName, row.otherNames].filter(Boolean).join(" "),
  },
  {
    title: "Email",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => row.email,
  },
  {
    title: "User Type",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => row.userType,
  },
  {
    title: "User Role",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => row.userRole,
  },
  {
    title: "Created At",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => formatDate(row.createdat),
  },
  {
    title: "Updated At",
    options: { filter: true, sort: true },
    selector: (row: IUsers) => formatDate(row.updatedat),
  },
];

