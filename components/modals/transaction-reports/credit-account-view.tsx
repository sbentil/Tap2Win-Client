"use client"

import Button from '@/components/core/button'
import { ICreatedAccountStatement } from '@/interfaces'
import Modal from '@/components/modal'
import React from 'react'
import { TableIcon } from '@/components/table/icons'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: ICreatedAccountStatement
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  const { amount, status, username, approvedby, createby, openingBalance, closingBalance, createdAt, updatedAt, comment } = data
  return (
    <Modal
      isOpen={state}
      onClose={() => onClose(false)}
      title='Account Statement'
      footer={
        <div className='flex flex-row-reverse items-center gap-4 w-1/2 mx-auto'>
          <Button variant="primary" className='gap-2'>
            <TableIcon icon="download" />
            Download
          </Button>
          <Button variant="outline" className='gap-2'
            onClick={() => onClose(false)}
          >
            {/* <TableIcon icon="filter" /> */}
            Cancel
          </Button>
        </div>
      }
    >
      <div className='flex items-center gap-y-6 flex-col w-full px-4'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Username</h4>
            <p className='text-text font-thin text-sm'>@{username}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Status</h4>
            <p className='text-text font-thin text-sm capitalize'>{status}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Amount</h4>
            <p className='text-text font-thin text-sm'>{amount ?? "N/A"}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Comment</h4>
            <p className='text-text font-thin text-sm'>{comment ?? "N/A"}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Closing Balance</h4>
            <p className='text-text font-thin text-sm'>{closingBalance ?? "N/A"}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Opening Balance</h4>
            <p className='text-text font-thin text-sm'>{openingBalance}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Created By</h4>
            <p className='text-text font-thin text-sm'>{createby}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Approved By</h4>
            <p className='text-text font-thin text-sm'>{approvedby}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Date Created</h4>
            <p className='text-text font-thin text-sm'>{formatDate(createdAt)}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Date Modified</h4>
            <p className='text-text font-thin text-sm'>{formatDate(updatedAt)}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ViewModal