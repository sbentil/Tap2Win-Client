"use client";

import React, { useState } from "react";

import { Button } from "@/components/core";
import Modal from "@/components/modal";
import NoRecordsFound from "@/components/empty";
import Table from "../../../../../components/tables/admin/events";
import UserForm from "@/components/forms/users";
import useEvents from "@/hooks/useEvents";

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for handling pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch events using the useEvents hook
  const { data, isLoading, error, refetch } = useEvents({ page, limit });

  const events = data?.data || [];
  const totalCount = data?.meta.totalCount || 0;

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
    const totalPages = Math.ceil(totalCount / limit);

    switch (action) {
      case "first":
        setPage(1);
        break;
      case "last":
        setPage(totalPages);
        break;
      case "next":
        if (page < totalPages) {
          setPage(page + 1);
        }
        break;
      case "prev":
        if (page > 1) {
          setPage(page - 1);
        }
        break;
    }
  };

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}
      <pre>{JSON.stringify(error, null, 2)}</pre>
      {/* retry text */}
      <Button onClick={() => refetch()} className="">Retry</Button>
    </div>;
  }

  return (
    <div className="h-[92vh] p-4">
      {events.length === 0 ? (
        <div className="flex h-screen flex-col items-center justify-center p-4">
          <NoRecordsFound entity="Events" onCreate={handleCreateUser} />
        </div>
      ) : (
        <Table
          data={events}
          metadata={{
            page,
            totalCount,
            isFetching: isLoading,pageSize: limit
          }}
          onFirst={() => paginationHandler("first")}
          onPrev={() => paginationHandler("prev")}
          onNext={() => paginationHandler("next")}
          onLast={() => paginationHandler("last")}
          refetch={refetch}
        />
      )}
      {

      }
    </div>
  );
};

export default Events;
