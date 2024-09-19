"use client";
import Modal from "@/components/modal";
import { IPendingFundRequests } from "@/interfaces/partners";
import Button from "../core/button";
import ModalViewItem from "../modal/view-item";
import { formatDate } from "@/helpers/datetime";
import { ApproveFundRequestModal } from '../modals';
import { useState } from "react";
import { Attachment } from "../core";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: IPendingFundRequests | null;
}

export default function ViewPendingFundRequestModal({ state, onClose, data }: Props) {

    const [showApprove, setShowApprove] = useState<boolean>(false);
    const [info, setInfo] = useState<any | null>(null);

    function closeShowApprove() {
        setShowApprove(false);
    }
    function openShowApprove() {
        setShowApprove(true);
    }

    return (
        <Modal size='xl' onClose={onClose} title="Summary" isOpen={state} >
            <div className="grid grid-cols-2 gap-4 p-4">
                <ModalViewItem label="username" value={data?.username || "N/A"} />
                <ModalViewItem label="" value={""} />
                <ModalViewItem label="amount" value={data?.amount || "N/A"} />
                <ModalViewItem label="attachment" customValue={(<Attachment file={data?.attachment || ""} />)} />
                
                <ModalViewItem label="created by" value={data?.createdBy || "N/A"} />
                <ModalViewItem label="status" value={data?.status || "N/A"} />

                <ModalViewItem label="date created" value={formatDate(data?.createdAt || "") || "N/A"} />
                <ModalViewItem label="date modified" value={formatDate(data?.updatedAt || "") || "N/A"} />

            </div>

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-'>
                <Button onClick={() => {}} variant='outline' className='w-1/2' >
                    Reject
                </Button>
                <Button variant='primary' onClick={openShowApprove} className='w-1/2 space-x-2' >
                    Approve
                </Button>
            </div>
            {
                showApprove && <ApproveFundRequestModal onPrevClose={onClose} prevState={true} data={data} onClose={closeShowApprove} state={showApprove} />
            }
        </Modal>
    );
}