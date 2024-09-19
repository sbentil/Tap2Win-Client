"use client"

import { IRemittanceTransaction } from '@/interfaces'
import Modal from '@/components/modal'
import React from 'react'
import { formatDate } from '@/helpers/datetime'

interface Props {
  state: boolean,
  onClose: (state: boolean) => void,
  data: IRemittanceTransaction
}

const RemittanceViewItem: React.FC<Props> = ({ state, onClose, data }) => {
  const {
    transactionId,
    partnerName,
    recipientAccount,
    recipientName,
    amount,
    fee,
    currency,
    remittedAmount,
    channel,
    dcmTransactionId,
    senderName,
    institutionName,
    institutionTransactionId,
    responseCode,
    responseDescription,
  } = data;

  return (
    <Modal
      isOpen={state}
      onClose={() => onClose(false)}
      title='Remittance Report'
    >
      <div className='flex items-center gap-y-6 flex-col w-full px-4'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{transactionId}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>{`Partner's Name`}</h4>
            <p className='text-text font-thin text-sm'>{partnerName}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Recipient Account</h4>
            <p className='text-text font-thin text-sm'>{recipientAccount}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Recipient Name</h4>
            <p className='text-text font-thin text-sm'>{recipientName}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Amount</h4>
            <p className='text-text font-thin text-sm'>{amount ?? "N/A"}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Fee</h4>
            <p className='text-text font-thin text-sm'>{fee ?? "N/A"}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Currency</h4>
            <p className='text-text font-thin text-sm'>{currency}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Remitted Amount</h4>
            <p className='text-text font-thin text-sm'>{remittedAmount ?? "N/A"}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Channel</h4>
            <p className='text-text font-thin text-sm'>{channel}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>DCM Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{dcmTransactionId}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Sender Name</h4>
            <p className='text-text font-thin text-sm'>{senderName}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Institution Name</h4>
            <p className='text-text font-thin text-sm'>{institutionName}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Institution Transaction ID</h4>
            <p className='text-text font-thin text-sm'>{institutionTransactionId}</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Response Code</h4>
            <p className='text-text font-thin text-sm'>{responseCode}</p>
          </div>
          <div className='flex flex-col items-start w-1/2'>
            <h4 className='text-primary'>Response Description</h4>
            <p className='text-text font-thin text-sm'>{responseDescription}</p>
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default RemittanceViewItem
