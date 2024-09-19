"use client";

import Modal from '@/components/modal';
import React from 'react';
import { ApproveFundRequestForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: any;
    onPrevClose: (state: boolean) => void;
    prevState: boolean;
}

export default function ApproveFundRequest({ state, onClose, data, onPrevClose, prevState }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Approve Fund Request" isOpen={state} >
            <ApproveFundRequestForm onClose={onClose} data={data} onPrevClose={onPrevClose} prevState={prevState} />
        </Modal>
    );
}