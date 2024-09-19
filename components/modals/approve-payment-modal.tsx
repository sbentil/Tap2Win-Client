"use client";

import Modal from '@/components/modal';
import React from 'react';
import { ApprovePaymentForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: any;
}

export default function ApprovePayment({ state, onClose, data }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Approval" isOpen={state} >
            <ApprovePaymentForm  onClose={onClose} data={data}  />
        </Modal>
    );
}