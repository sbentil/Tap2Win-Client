"use client";

import Button from '@/components/core/button';
import { ITransaction } from '@/interfaces/transaction';
import Modal from '@/components/modal';
import React from 'react';
import { formatDate } from '@/helpers/datetime';

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: ITransaction;
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="Transaction Details" size='xl'>
      <div className="flex flex-col w-full px-4 gap-y-6">
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start col-span-3">
            <h4 className="text-primary">OrderId</h4>
            <p className="text-text font-bold text-lg">{data.OrderId}</p>
          </div>

        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">User Name</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.CustomerName}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Phone Number</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.CustomerMobileNumber}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Email</h4>
            <p className="text-text text-lg">{data.OrderInfo.CustomerEmail || "N/A"}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Event Name</h4>
            <p className="text-text font-thin text-sm">{data.event.name}</p>
          </div>
          <div className="flex flex-col items-start col-span-2">
            <h4 className="text-primary">Event Description</h4>
            <p className="text-text font-thin text-sm">{data.event.description}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Order Date</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.OrderInfo.OrderDate)}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Order Status</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.Status}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Currency</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.Currency}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Branch Name</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.BranchName}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Amount</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.Subtotal}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Payment Status</h4>
            <p className="text-text font-thin text-sm">{data.OrderInfo.Payment.IsSuccessful ? 'Successful' : 'Failed'}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Created At</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.createdAt)}</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Updated At</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.updatedAt)}</p>
          </div>
        </div>

        <div className="flex gap-10 mt-4">
          <Button variant="outline" text="Close" className="min-w-[120px]" onClick={() => onClose(false)} />
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
