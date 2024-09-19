"use client";
import Modal from "@/components/modal";
import { INewPayment } from "@/interfaces/payments";
import { Attachment, Button } from "../core";
import ModalViewItem from "../modal/view-item";
import { formatDate } from "@/helpers/datetime";
import _ from "lodash"

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: INewPayment | null;
}

export default function ViewNewPayment({ state, onClose, data }: Props) {

    return (
        <Modal size='xl' onClose={onClose} title="Payments" isOpen={state} >
            <div className="grid grid-cols-2 gap-4 p-4">
                <ModalViewItem label="Batch ID" value={data?.batchId || "N/A"} />
                <ModalViewItem label="Number of Transactions" value={data?.transactionsNumber?.toString() || "N/A"} />
                <ModalViewItem label="Inst. Name" value={data?.institutionName || "N/A"} />
                <ModalViewItem label="status" value={_.startCase(data?.status) || "N/A"} />
                <ModalViewItem label="Total Amount" value={data?.totalAmount || "N/A"} />
                <ModalViewItem label="Total Fees" value={data?.totalFees || "N/A"} />
                <ModalViewItem label="created by" value={data?.createdBy || "N/A"} />
                <ModalViewItem label="attachment" customValue={(<Attachment file={data?.attachment || ""} />)} />
                <ModalViewItem label="Recipient Account" value={data?.reciepientAccount || "N/A"} />
                <ModalViewItem label="Amount" value={data?.amount || "N/A"} />
                <ModalViewItem label="Fee" value={data?.fee || "N/A"} />
                <ModalViewItem label="Narration" value={data?.narration || "N/A"} />
                <ModalViewItem label="date created" value={formatDate(data?.createdAt || "N/A")} />
                <ModalViewItem label="date completed" value={formatDate(data?.updatedAt || "N/A")} />
            </div>

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-'>
                <Button onClick={() => onClose(state)} variant='outline' className='w-1/2' >
                    Reject
                </Button>
                <Button variant='primary' className='w-1/2 space-x-2 flex items-center gap-4' >
                    Approve
                </Button>
            </div>
        </Modal>
    );
}