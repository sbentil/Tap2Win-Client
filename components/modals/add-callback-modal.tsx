"use client";

import Modal from '@/components/modal';
import React from 'react';
import { AddCallbackForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function AddCallback({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Add Callback" isOpen={state} >
            <AddCallbackForm onClose={onClose} />
        </Modal>
    );
}