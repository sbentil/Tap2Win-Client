"use client"

import Button from "../core/button";
import { IFee } from "@/interfaces/fee";
import Modal from "@/components/modal";
import ModalViewItem from "../modal/view-item";
import { formatDate } from "@/helpers/datetime";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: IFee 
}

export default function ViewFee({ state, onClose, data }: Props) {
    const {profile, country, comment, createdBy, modifiedBy, createdAt, updatedAt} = data;

    return (
        <Modal size='xl' onClose={onClose} title="Fee" isOpen={state} >
            <div className="grid grid-cols-2 gap-4 p-4">
                <ModalViewItem label="Profile" value={profile || "N/A"} />
                <ModalViewItem label="Country" value={country || "N/A"} />
                <ModalViewItem label="Comment" value={comment || "N/A"} />
                <ModalViewItem label="CreatedBy" value={createdBy || "N/A"} />
                <ModalViewItem label="ModifiedBy" value={modifiedBy || "N/A"} />
                <ModalViewItem label="Date Created" value={formatDate(createdAt!) || "N/A"} />
                <ModalViewItem label="Date Modified" value={formatDate(updatedAt!) || "N/A"} />
            </div>

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-'>
                <Button onClick={() => onClose(state)}  variant='outline' className='w-1/2' >
                    Deactivate
                </Button>
                <Button variant='primary' className='w-1/2 space-x-2' >
                    Configure Fee
                </Button>
            </div>
        </Modal>
    );
}