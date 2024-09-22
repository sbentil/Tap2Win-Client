"use client";

import { Button } from "@/components/core";
import { Columns } from "./columns";
import EventSelector from "@/components/selectors/event";
import { ExportCircle } from "iconsax-react";
import { ExportDataModal } from "@/components/modals";
import { ITransaction } from "@/interfaces/transaction";
import { TableComponent } from "@/components/table";
import ViewModal from "./view";
import { useAuthContext } from "@/hooks/userContext";
import { useState } from "react";

const transactionFields = [
  ['SessionId', 'OrderId', 'event'],
  ['_id', 'createdAt', 'updatedAt'],
  ['CustomerMobileNumber', 'CustomerEmail', 'CustomerName'],
  ['Status', 'OrderDate', 'Currency'],
  ['BranchName', 'IsRecurring', 'RecurringInvoiceId'],
  ['Subtotal', 'PaymentType', 'AmountPaid'],
  ['AmountAfterCharges', 'PaymentDate', 'PaymentDescription'],
  ['IsSuccessful', 'Items', 'UnitPrice']
];


interface Props {
  data: ITransaction[];
  metadata: {
    page: number;
    totalCount: number;
    isFetching: boolean;
  };
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const Table: React.FC<Props> = ({
  data,
}) => {
  const { user } = useAuthContext()
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<ITransaction | null>(null);
  const [showexport, setExport] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [metadata, setMetadata] = useState({
    page: 1,
    totalCount: data.length,
    isFetching: false,
  });

  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };

  const ActionFilters = () => (
    <div className="flex gap-x-4">
      <div className="flex items-center gap-4">
        <Button variant="primary" className="gap-2" onClick={() => setExport(true)}>
          <ExportCircle />
          Export Tokens
        </Button>
      </div>
      {
        user?.role === "admin" && (
          <EventSelector
            selected={selectedEvent}
            setSelected={setSelectedEvent}
          />
        )
      }
    </div>
  )


  const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
    const totalPages = Math.ceil(metadata.totalCount / 10); // Assuming 10 items per page

    switch (action) {
      case "first":
        setMetadata({ ...metadata, page: 1 });
        break;
      case "last":
        setMetadata({ ...metadata, page: totalPages });
        break;
      case "next":
        if (metadata.page < totalPages) {
          setMetadata({ ...metadata, page: metadata.page + 1 });
        }
        break;
      case "prev":
        if (metadata.page > 1) {
          setMetadata({ ...metadata, page: metadata.page - 1 });
        }
        break;
    }
  };

  return (
    <>
      <TableComponent
        data={data}
        showFooter
        columns={Columns}
        onRowClick={onSelect}
        tableContainerClasses={"h-full w-full"}
        metadata={metadata}
        filterRender={<ActionFilters />}
        onFirst={() => paginationHandler("first")}
        onPrev={() => paginationHandler("prev")}
        onNext={() => paginationHandler("next")}
        onLast={() => paginationHandler("last")}
      />
      {viewItem && selected && (
        <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      )}
      {
        showexport && <ExportDataModal state={showexport} onClose={() => setExport(false)} fields={transactionFields} />
      }
    </>
  );
};

export default Table;
