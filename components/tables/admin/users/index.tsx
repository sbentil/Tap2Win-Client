"use client";

import ActionButton from "@/components/table/action";
import { Button } from "@/components/core";
import { Columns } from "./columns";
import { CreateUserModal } from "@/components/modals";
import { IUser } from "@/interfaces/users";
import { TableComponent } from "@/components/table";
import ViewModal from "./view";
import { objToStr } from "@/helpers/object";
import toasts from "@/utils/toasts";
import { useState } from "react";

interface Props {
  data: IUser[];
  metadata: {
    page: number;
    totalCount: number;
    isFetching: boolean;
    pageSize: number
  };
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const Table: React.FC<Props> = ({
  data,
}) => {
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUser | null>(null);
  const [create, setCreate] = useState<boolean>(false)
  const [metadata, setMetadata] = useState({
    page: 1,
    totalCount: data.length,
    isFetching: false,
    pageSize: 10
  });

  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };

  const onEdit = (item: any) => {
    setSelected(item);
    setEditItem(true)
  };

  const onDeactivate = (item: any) => {
    console.log(item);
    toasts.info("Diactivated", objToStr(item));
  };

  const Actions = () => {
    return (
      <div className="flex items-center gap-4">
        <Button variant="primary" className="gap-2" onClick={() => setCreate(true)}>
          Create New User
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
            element: <ActionButton label="Update" />,
            onClick: (rowData: any) => onEdit(rowData),
          },
          // {
          //   element: <ActionButton color="danger" label="Deactivate" />,
          //   onClick: (rowData: any) => onDeactivate(rowData),
          // },
        ]}
        metadata={metadata}
        onFirst={() => paginationHandler("first")}
        onPrev={() => paginationHandler("prev")}
        onNext={() => paginationHandler("next")}
        onLast={() => paginationHandler("last")}
      />
      {viewItem && selected && (
        <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      )}
      {editItem && selected && (
        <CreateUserModal isOpen={editItem} onClose={() => setEditItem(false)} data={selected} />
      )}
      {
        create && <CreateUserModal isOpen={create} onClose={() => setCreate(false)} />
      }

    </>
  );
};

export default Table;
