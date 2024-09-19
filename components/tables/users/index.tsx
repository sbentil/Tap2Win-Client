"use client";

import { Button } from "@/components/core";
import { Columns } from "./columns";
import { IUsers } from "@/interfaces/users";
import { TableComponent } from "@/components/table";
import ViewModal from "./view";
import { objToStr } from "@/helpers/object";
import toasts from "@/utils/toasts";
import { useState } from "react";
import ActionButton from "@/components/table/action";

interface Props {
  data: IUsers[];
  onCreate: () => void;
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
  onCreate,
}) => {
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUsers | null>(null);

  const [metadata, setMetadata] = useState({
    page: 1,
    totalCount: data.length,
    isFetching: false,
  });

  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };

  const onEdit = (item: any) => {
    console.log(item);
    toasts.info("Edited", objToStr(item));
  };

  const onDeactivate = (item: any) => {
    console.log(item);
    toasts.info("Diactivated", objToStr(item));
  };

  const Actions = () => {
    return (
      <div className="flex items-center gap-4">
        <Button variant="primary" className="gap-2" onClick={onCreate}>
          Create New User
        </Button>
        <Button
          variant="outline"
          className="gap-2 min-w-[200px]"
          type="link"
          href="users/audit-report"
        >
          View Audit Report
        </Button>
      </div>
    );
  };

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
        filterRender={<Actions />}
        actions={[
          {
            element: <ActionButton color="success" label="Edit" />,
            onClick: (rowData: any) => onEdit(rowData),
          },
          {
            element: <ActionButton color="danger" label="Deactivate" />,
            onClick: (rowData: any) => onDeactivate(rowData),
          },
        ]}
        metadata={metadata}
        onFirst={() => paginationHandler("first")}
        onPrev={() => paginationHandler("prev")}
        onNext={() => paginationHandler("next")}
        onLast={() => paginationHandler("last")}
      />
      {selected && (
        <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      )}
    </>
  );
};

export default Table;
