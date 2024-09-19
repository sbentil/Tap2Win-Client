"use client";

import { AddFeeProfileForm } from '@/components/forms';
import { IFee } from '@/interfaces/fee';
import Modal from '@/components/modal';
import React from 'react';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function AddFeeProfile({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Add Fee to Profile" isOpen={state} >
            <AddFeeProfileForm onClose={onClose} />
        </Modal>
    );
}