import { EditServiceAndFeesForm } from "@/components/forms";
import Modal from "@/components/modal";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function EditServiceAndFees({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Edit Service and Fees" isOpen={state} >
            <EditServiceAndFeesForm onClose={onClose} />
        </Modal>
    );
}