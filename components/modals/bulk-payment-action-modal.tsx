"use client";

import Modal from '@/components/modal';
import React from 'react';
import { BulkPaymentActionForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    action: "approve" | "reject";
}

export default function ApprovePayment({ state, onClose, action }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title={`${action} All Payments`} isOpen={state} >
            <BulkPaymentActionForm  onClose={onClose} action={action}  />
        </Modal>
    );
}