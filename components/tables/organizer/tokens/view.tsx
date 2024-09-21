"use client"

import Button from '@/components/core/button'
import { IToken } from '@/interfaces/token'
import Modal from '@/components/modal'
import React from 'react'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: IToken
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="Token Details">
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex flex-col items-start">
          <h4 className="text-primary">Token</h4>
          <p className="text-text font-bold text-lg">{data.token}</p> {/* Token emphasized */}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">User Name</h4>
            <p className="text-text font-thin text-sm">{data.name}</p> {/* User Name */}
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Phone Number</h4>
            <p className="text-text font-thin text-sm">{data.phone}</p> {/* User Phone */}
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Event</h4>
            <p className="text-text font-thin text-sm">{data.event.name}</p> {/* Event Name */}
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Created At</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.createdAt)}</p> {/* Created At */}
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Updated At</h4>
            <p className="text-text font-thin text-sm">{formatDate(data.updatedAt)}</p> {/* Updated At */}
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
