"use client"

import Button from '@/components/core/button'
import { IUsers } from '@/interfaces/users'
import Modal from '@/components/modal'
import React from 'react'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: IUsers
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  const { firstName, lastName, otherNames, email, userRole, userType, createdat, updatedat, status } = data
  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="User Details">
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Full Name</h4>
            <p className="text-text font-thin text-sm">{
              [firstName, lastName, otherNames].filter(Boolean).join(" ")
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
            <h4 className="text-primary">User Role</h4>
            <p className="text-text font-thin text-sm">{userRole}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">User Type</h4>
            <p className="text-text font-thin text-sm">{userType}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Created at</h4>
            <p className="text-text font-thin text-sm">{formatDate(createdat)}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Updated at</h4>
            <p className="text-text font-thin text-sm">{formatDate(updatedat)}</p>
          </div>
        </div>
        <div className="flex gap-10">
          <Button variant="outline" text="Deactivate" className='min-w-[120px]' />
          <Button variant="primary" text="Edit" className='min-w-[120px]' />
        </div>
      </div>
    </Modal>
  );
}

export default ViewModal