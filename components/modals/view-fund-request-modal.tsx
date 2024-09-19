"use client"
import Modal from "@/components/modal";
import { IFundRequests } from "@/interfaces/partners";
import Button from "../core/button";
import ModalViewItem from "../modal/view-item";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: IFundRequests |  null
}

export default function ViewFundRequestModal({ state, onClose, data }: Props) {

    return (
        <Modal size='xl' onClose={onClose} title="Fund Request" isOpen={state} >
            <div className="grid grid-cols-2 gap-4 p-4">
                <ModalViewItem label="username" value={data?.username || "N/A"} />
                <ModalViewItem label="status" value={data?.status || "N/A"} />
                <ModalViewItem label="amount" value={data?.amount || "N/A"} />
                <ModalViewItem label="comment" value={data?.comment || "N/A"} />
                <ModalViewItem label="opening balance" value={data?.openingBalance || "N/A"} />
                <ModalViewItem label="closing balance" value={data?.closingBalance || "N/A"} />
                <ModalViewItem label="created by" value={data?.createdBy || "N/A"} />
                <ModalViewItem label="approved by" value={data?.approvedBy || "N/A"} />
                <ModalViewItem label="date created" value={data?.createdAt || "N/A"} />
                <ModalViewItem label="date modified" value={data?.updatedAt || "N/A"} />

            </div>

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-'>
                <Button onClick={() => onClose(state)}  variant='outline' className='w-1/2' >
                    Cancel
                </Button>
                <Button variant='primary' className='w-1/2 space-x-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                    Download
                </Button>
            </div>
        </Modal>
    );
}