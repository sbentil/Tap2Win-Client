"use client"

import Button from '@/components/core/button'
import { IEvent } from '@/interfaces/event'
import Modal from '@/components/modal'
import React from 'react'
import { formatDate } from '@/helpers/datetime'
import { formatMoney } from '@/helpers/string'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: IEvent
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="Event Details" size='xl'>
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Event Name</h4>
            <p className="text-text font-thin text-sm">{data.name}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Channel</h4>
            <p className="text-text font-thin text-sm">{data.channel}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Organizer</h4>
            <p className="text-text font-thin text-sm">
              {data.organizer?.name || "N/A"} <br />
              {data.organizer?.phone || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Description</h4>
            <p className="text-text font-thin text-sm">{data.description}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/3">
            <h4 className="text-primary">Registration</h4>
            <p className="text-text font-thin text-sm">
              GHS{formatMoney(data.price)}
            </p>
          </div>
          <div className="flex flex-col items-start w-1/3">
            <h4 className="text-primary">Tokens Count</h4>
            <p className="text-text font-thin text-sm">{data.tokensCount}</p>
          </div>
          <div className="flex flex-col items-start w-1/3">
            <h4 className="text-primary">Total Amount</h4>
            <p className="text-text font-thin text-sm">{formatMoney(Number(data.price) * Number(data.tokensCount))}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Start Date</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.startDate)}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">End Date</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.endDate)}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Created By</h4>
            <p className="text-text font-thin text-sm">
              {data.createdBy.name} <br />
              {data.createdBy.phone}
            </p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Last Updated By</h4>
            <p className="text-text font-thin text-sm">
              {data.lastUpdatedBy.name} <br />
              {data.lastUpdatedBy.phone}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Created at</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.createdAt)}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Updated at</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.updatedAt)}</p>
          </div>
        </div>
        <div className="flex gap-10">
          <Button variant="outline" text="Close" className='min-w-[120px]' onClick={() => onClose(false)} />
        </div>
      </div>
    </Modal>
  );
}

export default ViewModal;
