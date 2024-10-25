import { IToken } from "@/interfaces/token";
import { TbColumnObj } from "@/components/table/table";
import { formatDate } from "@/helpers/datetime";

export const Columns: TbColumnObj[] = [
  {
    title: "S/N",
    options: { filter: false, sort: false },
    selector: (row: IToken, i: any) => i + 1,
  },
  {
    title: "Ticket",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => (
        <span className="font-bold text-secondary">{value}</span>
      ),
    },
    selector: (row: IToken) => row.token,
  },
  {
    title: "User Name",
    options: { filter: true, sort: true },
    selector: (row: IToken) => row.name,
  },
  {
    title: "Phone Number",
    options: { filter: true, sort: true },
    selector: (row: IToken) => row.phone ?? <i className="uppercase sm">null</i>,
  },
  {
    title: "Event Name",
    options: { filter: false, sort: false },
    selector: (row: IToken) => row.event?.name || "N/A",
  },
  {
    title: "Created At",
    options: { filter: false, sort: true },
    selector: (row: IToken) => formatDate(row.createdAt),
  }
  // {
  //   title: "Updated At",
  //   options: { filter: false, sort: false },
  //   selector: (row: IToken) => formatDate(row.updatedAt),
  // },
];
