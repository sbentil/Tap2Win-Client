import { IEventInput } from "@/interfaces/event";
import { IUser } from "@/interfaces/users";
import { TbColumnObj } from "@/components/table/table";
import { formatDate } from "@/helpers/datetime";

export const Columns: TbColumnObj[] = [
  {
    title: "Event Name",
    options: { filter: true, sort: true },
    selector: (row: IEventInput) => row.name,
  },
  {
    title: "Description",
    options: { filter: false, sort: true },
    selector: (row: IEventInput) => row.description ?? <i className="uppercase sm">null</i>,
  },
  {
    title: "Start Date",
    options: { filter: true, sort: true },
    selector: (row: IEventInput) => formatDate(row.startDate),
  },
  {
    title: "End Date",
    options: { filter: true, sort: true },
    selector: (row: IEventInput) => formatDate(row.endDate),
  },
  {
    title: "Organizer",
    options: { filter: true, sort: true },
    selector: (row: { organizer: IUser }) => row.organizer?.name || "N/A",
  },
  // {
  //   title: "Organizer Phone",
  //   options: { filter: true, sort: true },
  //   selector: (row: { organizer: IUser }) => row.organizer?.phone ?? <i className="uppercase sm">null</i>,
  // },
];
