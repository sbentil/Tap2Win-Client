"use client"

import Button from '@/components/core/button'
import { IUser } from '@/interfaces/users'
import Modal from '@/components/modal'
import React from 'react'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: IUser
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  const { name, email, role, phone, createdAt, updatedAt, status } = data
  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="User Details">
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Full Name</h4>
            <p className="text-text font-thin text-sm">{
              [name].filter(Boolean).join(" ")
            }</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Email</h4>
            <p className="text-text font-thin text-sm">{email}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Status</h4>
            <p className="text-text font-thin text-sm capitalize">{status}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Role</h4>
            <p className="text-text font-thin text-sm">{role}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Phone</h4>
            <p className="text-text font-thin text-sm">{phone}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Created at</h4>
            <p className="text-text font-thin text-sm">{formatDate(createdAt)}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Updated at</h4>
            <p className="text-text font-thin text-sm">{formatDate(updatedAt)}</p>
          </div>
        </div>
        <div className="flex gap-10">
          <Button variant="outline" text={
            status == "active" ? "Deactivate" : "Activate"
          } className='min-w-[120px]' />
          <Button variant="primary" text="Edit" className='min-w-[120px]' />
        </div>
      </div>
    </Modal>
  );
}

export default ViewModal