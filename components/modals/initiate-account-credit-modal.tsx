import { InitiateAccountCreditForm } from "@/components/forms";
import Modal from "@/components/modal";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function InitiateAccountCredit({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Initiate Account Credit" isOpen={state} >
            <InitiateAccountCreditForm onClose={onClose} />
        </Modal>
    );
}