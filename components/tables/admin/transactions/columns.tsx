import { ITransaction } from "@/interfaces/transaction";
import { TbColumnObj } from "@/components/table/table";
import { formatDate } from "@/helpers/datetime";

export const Columns: TbColumnObj[] = [
  {
    title: "OrderId",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value: string) => (
        <span className="font-bold text-secondary">{value}</span>
      ),
    },
    selector: (row: ITransaction) => row.OrderId,
  },
  {
    title: "Customer Name",
    options: { filter: false, sort: true },
    selector: (row: ITransaction) => row.OrderInfo.CustomerName,
  },
  {
    title: "Phone Number",
    options: { filter: true, sort: true },
    selector: (row: ITransaction) => row.OrderInfo.CustomerMobileNumber ?? <i className="uppercase sm">null</i>,
  },
  {
    title: "Event Name",
    options: { filter: true, sort: true },
    selector: (row: ITransaction) => row.event?.name || "N/A",
  },
  {
    title: "Created At",
    options: { filter: false, sort: true },
    selector: (row: ITransaction) => formatDate(row.createdAt),
  }
];
