"use client"

import Button from '@/components/core/button'
import { ITransactionStatement } from '@/interfaces'
import Modal from '@/components/modal'
import React from 'react'
import { TableIcon } from '@/components/table/icons'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: ITransactionStatement
}

const TransactionStatementItem: React.FC<Props> = ({ state, onClose, data }) => {
  const {
    partnerName,
    transactionId,
    fee,
    totalCredit,
    numberOfCredits,
    totalDebit,
    numberOfDebits,
    openingBalance,
    closingBalance,
    date,
  } = data;

  return (
    <Modal
      isOpen={state}
      onClose={() => onClose(false)}
      title='Transaction Statement'
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
            <h4 className='text-primary'>Partner Name</h4>
            <p className='text-text font-thin text-sm'>{partnerName}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{transactionId}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Fee</h4>
            <p className='text-text font-thin text-sm'>{fee.toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Total Credit</h4>
            <p className='text-text font-thin text-sm'>{totalCredit.toFixed(2)}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Number of Credits</h4>
            <p className='text-text font-thin text-sm'>{numberOfCredits}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Total Debit</h4>
            <p className='text-text font-thin text-sm'>{totalDebit.toFixed(2)}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Number of Debits</h4>
            <p className='text-text font-thin text-sm'>{numberOfDebits}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Opening Balance</h4>
            <p className='text-text font-thin text-sm'>{openingBalance.toFixed(2)}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Closing Balance</h4>
            <p className='text-text font-thin text-sm'>{closingBalance.toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Date</h4>
            <p className='text-text font-thin text-sm'>{formatDate(date)}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TransactionStatementItem;
