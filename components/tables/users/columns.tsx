import { IUser } from "@/interfaces/users";
import { TbColumnObj } from "@/components/table/table";
import { formatDate } from "@/helpers/datetime";

const statusClass = {
  active: "text-secondary",
  inactive: "text-tb-text"
};
export const Columns: TbColumnObj[] = [
  {
    title: "Name",
    options: { filter: true, sort: true },
    selector: (row: IUser) => row.name
  },
  {
    title: "Email",
    options: { filter: true, sort: true },
    selector: (row: IUser) => row.email  ?? <i className="uppercase sm">null</i>,
  },
  {
    title: "Phone",
    options: { filter: true, sort: true },
    selector: (row: IUser) => row.phone,
  },
  {
    title: "Role",
    options: { filter: true, sort: true },
    selector: (row: IUser) => row.role,
  },
  {
    title: "Status", options: {
      filter: false,
      sort: true,
      customBodyRender: (value: "active" | "inactive") => (<span className={`${statusClass[value.toLowerCase() as "active" | "inactive"]} capitalize`}> {value} </span>)
    },
    selector: (row: IUser) => row?.status ?? "active",

  },
  {
    title: "Created At",
    options: { filter: true, sort: true },
    selector: (row: IUser) => formatDate(row.createdAt),
  },
  {
    title: "Updated At",
    options: { filter: true, sort: true },
    selector: (row: IUser) => formatDate(row.updatedAt),
  },
];

