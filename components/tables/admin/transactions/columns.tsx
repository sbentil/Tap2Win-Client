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
    selector: (row: ITransaction) => row.OrderId ?? row.CheckoutResponse?.CheckoutId
  },
  {
    title: "Channel",
    options: { filter: false, sort: true },
    selector: (row: ITransaction) => row.channel  ?? "USSD",
  },
  {
    title: "Phone Number",
    options: { filter: true, sort: true },
    selector: (row: ITransaction) => row.OrderInfo?.CustomerMobileNumber ?? row.CheckoutResponse?.CustomerPhoneNumber,
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
