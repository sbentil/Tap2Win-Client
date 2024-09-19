"use client";

import Button from '@/components/core/button';
import { Columns } from './columns';
import { DebitCredits } from './__data';
import { ICreditDebit } from '@/interfaces/creditdebit';
import Search from "@/components/core/search-input"
import { TableComponent } from '@/components/table';
import ViewModal from '../view';
import { useState } from 'react';

const SearchRender = () => {
  return (
    <div className=" items-center ">
      <Search
        placeholder="Search by Transaction ID"
        label="Search"
        id="search"
        values={DebitCredits}
      />
    </div>
  );
}

const Actions = () => {
  return (
    <div className="flex items-center gap-4">
      {
        <Button variant="primary" className="gap-2  text-[#fff]">
          Initiate Recon
        </Button>
      }
    </div>
  );
};

export default function ReconDebit() {
  const [viewItem, setViewItem] = useState<boolean>(false)
  const [selected, setSelected] = useState<ICreditDebit | null>(null)
  const [metadata, setMetadata] = useState({
    page: 1, totalCount: 50, isFetching: false
  })
  const onSelect = (item: any) => {
    setSelected(item)
    setViewItem(true)
  };
  const paginationHandler = (action: 'first' | 'last' | 'next' | 'prev') => {
    const totalPages = Math.ceil(metadata.totalCount / 10);

    switch (action) {
      case 'first':
        setMetadata({
          ...metadata,
          page: 1
        });
        break;

      case 'last':
        setMetadata({
          ...metadata,
          page: totalPages
        });
        break;

      case 'next':
        if (metadata.page < totalPages) {
          setMetadata({
            ...metadata,
            page: metadata.page + 1
          });
        }
        break;

      case 'prev':
        if (metadata.page > 1) {
          setMetadata({
            ...metadata,
            page: metadata.page - 1
          });
        }
        break;

      default:
        break;
    }
  };
  return (
    <>
      <TableComponent
        data={DebitCredits}
        showFooter
        columns={Columns}
        onRowClick={onSelect}
        tableContainerClasses={"h-full w-full"}
        filterRender={<Actions />}
        searchRender={<SearchRender />}
        metadata={metadata}
        onFirst={() => paginationHandler("first")}
        onPrev={() => paginationHandler("prev")}
        onNext={() => paginationHandler("next")}
        onLast={() => paginationHandler("last")}
      />
      {
        selected && <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      }
    </>
  )
}