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
    pageSize: number;
  };
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const Table: React.FC<Props> = ({
  data,
  metadata,
  onFirst,
  onLast,
  onNext,
  onPrev
}) => {
  const { user } = useAuthContext()
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<ITransaction | null>(null);
  const [showexport, setExport] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string>("")

  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };

  const ActionFilters = () => (
    <div className="flex gap-x-4">
      <div className="flex items-center gap-4">
        <Button variant="primary" className="gap-2" onClick={() => setExport(true)}>
          <ExportCircle />
          Export Transactions
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
        onFirst={onFirst}
        onPrev={onPrev}
        onNext={onNext}
        onLast={onLast}
      />
      {viewItem && selected && (
        <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      )}
      {
        showexport && <ExportDataModal state={showexport} onClose={() => setExport(false)} data={data[1]} type="transactions" />
      }
    </>
  );
};

export default Table;
