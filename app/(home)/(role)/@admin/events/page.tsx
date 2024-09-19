"use client";

import React, { useState } from "react";

import Button from "@/components/core/button";
import { IUsers } from "@/interfaces/users";
import Modal from "@/components/modal";
import NoRecordsFound from "@/components/empty";
import Table from "../../../../../components/tables/users";
import UserForm from "@/components/forms/users";
import {users as __data} from "../../../../../components/tables/users/__data";

const Users = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [metadata, setMetadata] = useState({
    page: 1,
    totalCount: users.length,
    isFetching: false,
  });


  const handleCreateUser = () => {
    setIsModalOpen(true);
    setUsers(__data)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <div className="h-[92vh] p-4">
      {!!!users.length && (
        <div className="flex h-screen flex-col items-center justify-center p-4">
          <NoRecordsFound entity="Users" onCreate={handleCreateUser} />
        </div>
      )}
      {users && (
        <Table
          onCreate={handleCreateUser}
          data={users}
          metadata={metadata}
          onFirst={() => paginationHandler("first")}
          onPrev={() => paginationHandler("prev")}
          onNext={() => paginationHandler("next")}
          onLast={() => paginationHandler("last")}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create User"
        size="xl"
        footer={
          <div className="flex gap-10 p-5 w-full item-center justify-center">
            <Button variant="outline" text="Create User" type="submit" />
            <Button variant="primary" text="Save" className="min-w-[150px]" />
          </div>
        }
      >
        <UserForm />
      </Modal>
    </div>
  );
};

export default Users;
