"use client";

import Modal from '@/components/modal';
import React from 'react';
import { ConfigurePartnerForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function ConfigurePartner({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Configure Partner" isOpen={state} >
            <ConfigurePartnerForm onClose={onClose} />
        </Modal>
    );
}