import { ITransaction } from "@/interfaces/transaction";
import { TbColumnObj } from "@/components/table/table";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helpers/datetime";

export const Columns: TbColumnObj[] = [
  {
    title: "OrderId",
    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value: string) => (
      //   <span className={cn("font-bold text-secondary bg-green-500 py-1 px-3")}>{value}</span>
      // ),
    },
    selector: (row: ITransaction) => <span className={cn(
      "font-bold text-secondary bg-green-500 py-1 px-3",
      row.OrderInfo?.Payment?.IsSuccessful
        ? "bg-green-500"
        : "bg-red-500",

      row.StatusCheckData?.TransactionStatus == "Failed" ? "bg-red-500" : "bg-green-500"
    )}>{row.OrderId ?? row.CheckoutResponse?.CheckoutId}</span>
  },
  {
    title: "Channel",
    options: { filter: false, sort: true },
    selector: (row: ITransaction) => row.channel ?? "USSD",
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
