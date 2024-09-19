"use client";

import { ICreditDebit } from "@/interfaces/creditdebit";
import Modal from "@/components/modal";
import React from "react";
import Button from "@/components/core/button";

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: ICreditDebit;
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  const {
    date,
    transactionId,
    partnerName,
    recipientAccount,
    recipientName,
    account,
    channel,
    insuranceName,
    ResponseCode,
    ResponseDescription,
    dateCreated,
  } = data;

  return (
    <Modal
      isOpen={state}
      onClose={() => onClose(false)}
      title="Remittance Transactions"
      footer={
        <div className="flex justify-end">
          <Button
            variant="outline"
            className=" text-primary px-4 py-2 rounded mr-2"
          >
            Reject
          </Button>
          <Button variant="primary" className=" text-white px-4 py-2 rounded">
            Initial Recon
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Transaction ID</h4>
            <p className="text-text font-thin text-sm">{transactionId}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Date</h4>
            <p className="text-text font-thin text-sm">{date}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">{`Partner's Name`}</h4>
            <p className="text-text font-thin text-sm">{partnerName}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Recipient Name</h4>
            <p className="text-text font-thin text-sm">{recipientName}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Recipient Account</h4>
            <p className="text-text font-thin text-sm">{recipientAccount}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Account</h4>
            <p className="text-text font-thin text-sm">{account}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Channel</h4>
            <p className="text-text font-thin text-sm">{channel}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Insurance Name</h4>
            <p className="text-text font-thin text-sm">{insuranceName}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Response Code</h4>
            <p className="text-text font-thin text-sm">{ResponseCode}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Response Description</h4>
            <p className="text-text font-thin text-sm">{ResponseDescription}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Date Created</h4>
            <p className="text-text font-thin text-sm">{dateCreated}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
