"use client";
import Modal from "@/components/modal";
import { IPayment } from "@/interfaces/payments";
import { Button } from "../core";
import ModalViewItem from "../modal/view-item";
import { formatDate } from "@/helpers/datetime";
import _ from "lodash"

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: IPayment | null;
}

export default function ViewSinglePayment({ state, onClose, data }: Props) {

    return (
        <Modal size='xl' onClose={onClose} title="Payments" isOpen={state} >
            <div className="grid grid-cols-2 gap-4 p-4">
                <ModalViewItem label="Batch ID" value={data?.batchId || "N/A"} />
                <ModalViewItem label="status" value={_.startCase(data?.status) || "N/A"} />
                <ModalViewItem label="Number of Transactions" value={data?.transactionsNumber?.toString() || "N/A"} />
                <ModalViewItem label="Total Amount" value={data?.totalAmount || "N/A"} />
                <ModalViewItem label="created by" value={data?.createdBy || "N/A"} />
                <ModalViewItem label="approved or rejected by" value={data?.approvedBy || data?.rejectedBy || "N/A"} />
                <ModalViewItem label="date created" value={formatDate(data?.createdAt || "N/A")} />
                <ModalViewItem label="date modified" value={formatDate(data?.updatedAt || "N/A")} />

            </div>

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-'>
                <Button onClick={() => onClose(state)} variant='outline' className='w-1/2' >
                    Cancel
                </Button>
                <Button variant='primary' className='w-1/2 space-x-2 flex items-center gap-4' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                    Download
                </Button>
            </div>
        </Modal>
    );
}