import { formatDate } from "@/helpers/datetime";

export const auditReportColumns = [
  {
    title: "Date",
    options: { filter: true, sort: true },
    selector: (row: any) => formatDate(row.date, true),
  },
  {
    title: "Activity",
    options: { filter: true, sort: true },
    selector: (row: any) => row.activity,
  },
  {
    title: "Activity By",
    options: { filter: true, sort: true },
    selector: (row: any) => row.activity_by,
  },
  {
    title: "Details",
    options: { filter: true, sort: true },
    selector: (row: any) => row.details,
  },
];
