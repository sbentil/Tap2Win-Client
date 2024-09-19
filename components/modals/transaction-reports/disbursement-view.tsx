"use client"

import { ITransaction } from '@/interfaces'
import Modal from '@/components/modal'
import React from 'react'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: ITransaction
}

const DisbursementViewItem: React.FC<Props> = ({ state, onClose, data }) => {
  const { amount, channel, closingBalance, dateCompleted, payersName, dateCreated, responseCode, responseDescription, transactionType, dcmTransactionId, fee, instId, instName, openingBalance, partnersName, payersAccount, transactionId } = data
  return (
    <Modal
      isOpen={state}
      onClose={() => onClose(false)}
      title='Disbursement Report'
    >
      <div className='flex items-center gap-y-6 flex-col w-full px-4'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Partner's Name`}</h4>
            <p className='text-text font-thin text-sm'>{partnersName}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{transactionId}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Transaction Type</h4>
            <p className='text-text font-thin text-sm'>{transactionType ?? "N/A"}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Payer's Name`}</h4>
            <p className='text-text font-thin text-sm'>{payersName ?? "N/A"}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Payer's Account`}</h4>
            <p className='text-text font-thin text-sm'>{payersAccount}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Amount`}</h4>
            <p className='text-text font-thin text-sm'>{amount}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Fee</h4>
            <p className='text-text font-thin text-sm'>{fee}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Channel`}</h4>
            <p className='text-text font-thin text-sm'>{channel}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>DCM Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{dcmTransactionId}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Inst. Name`}</h4>
            <p className='text-text font-thin text-sm'>{instName}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Inst. Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{instId}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Opening Balance`}</h4>
            <p className='text-text font-thin text-sm'>{openingBalance}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Closing Balance</h4>
            <p className='text-text font-thin text-sm'>{closingBalance}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Response Code`}</h4>
            <p className='text-text font-thin text-sm'>{responseCode ?? "N/A"}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Response Description</h4>
            <p className='text-text font-thin text-sm'>{responseDescription ?? "N/A"}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DisbursementViewItem