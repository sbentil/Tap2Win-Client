import { InitiateAccountCreditForm } from "@/components/forms";
import Modal from "@/components/modal";
import ModalViewItem from "../modal/view-item";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Button from "../core/button";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: any;
    onPrevClose: (state: boolean) => void
    prevState: boolean
}

export default function ReviewAndConfirm({ state, onClose, data, onPrevClose, prevState }: Props) {
    console.log(data);

    function confirmAccCredit() {
        onClose(state)
        onPrevClose(prevState)
    }
    return (
        <Modal size='xl' onClose={onClose} title="Initiate Account Credit" isOpen={state} >
            <div className="flex flex-col gap-4">
                <h2 className="text-primary text-lg">
                    Confirm Payment details and Proceed
                </h2>

                <ModalViewItem label="amount" value={data?.amount || ""} />
                <ModalViewItem label="uploaded files" customValue={(
                    <div className="flex items-center space-x-4 cursor-pointer" >
                        <div className="p-2 rounded bg-purple-100">
                            <IoDocumentAttachOutline className="text-primary text-2xl" />
                        </div>
                        <div>
                            <p className="font-medium">Attachment</p>
                            <p className="text-text text-sm">File size: 1.5 MB</p>
                        </div>
                    </div>
                )} />

            </div>
            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-[80%]'>
                <Button onClick={() => onClose(state)} variant='outline' className='w-1/2' >
                    Cancel
                </Button>
                <Button variant='primary' onClick={confirmAccCredit} className='w-1/2' >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}