"use client";

import Modal from '@/components/modal';
import React from 'react';
import { CreateIpAddressForm } from '@/components/forms';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
}

export default function CreateWhiteListedIp({ state, onClose }: Props) {
    return (
        <Modal size='xl' onClose={onClose} title="Add IP Address" isOpen={state} >
            <CreateIpAddressForm onClose={onClose} />
        </Modal>
    );
}