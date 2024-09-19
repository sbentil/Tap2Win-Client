"use client";

import { Button, DatePicker } from "@/components/core";

import { IAuditReport } from "@/interfaces/users";
import { TableComponent } from "@/components/table";
import { TableIcon } from "@/components/table/icons";
import ViewModal from "./view";
import { auditReportColumns } from "./columns";
import { auditReports } from "./__data";
import { useState } from "react";

export default function Table() {
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<IAuditReport | null>(null);

   const [metadata, setMetadata] = useState({
     page: 1,
     totalCount: auditReports.length,
     isFetching: false,
   });


  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };

  const Actions = () => {
    return (
      <div className="flex gap-x-8 items-center">
        <div className="flex items-center gap-x-2">
          <DatePicker
            id="startDate"
            value="2023-05-15"
            min="1900-01-01"
            max="2023-12-31"
          />
        </div>

        <div className="">
            <Button
              variant="outline"
              className="gap-2 border-[#03204c] text-[#03204c]"
            >
              <TableIcon icon="download" />
              Download
            </Button>
        </div>
      </div>
    );
  };


   const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
     const totalPages = Math.ceil(metadata.totalCount / 10);

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
        data={auditReports}
        showFooter
        columns={auditReportColumns}
        onRowClick={onSelect}
        tableContainerClasses={"h-full w-full"}
        filterRender={<Actions />}
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
}
