"use client";

import Modal from '@/components/modal';
import React from 'react';
import { CreatePartnerForm } from "@/components/forms";

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function CreatePartner({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Create Partner" isOpen={state} >
            <CreatePartnerForm onClose={onClose} />
        </Modal>
    );
}