"use client";

import Modal from '@/components/modal';
import React from 'react';
import { RejectPaymentForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: any;
}

export default function RejectPayment({ state, onClose, data, }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Rejection" isOpen={state} >
            <RejectPaymentForm onClose={onClose} data={data} />
        </Modal>
    );
}