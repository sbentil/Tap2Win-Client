"use client";

import { EditIpAddressForm } from '@/components/forms';
import { IWhiteListedIps } from '@/interfaces/partners';
import Modal from '@/components/modal';
import React from 'react';

interface Props {
    state: boolean,
    onClose: (state: boolean) => void,
    data: IWhiteListedIps | null;
}

export default function EditWhiteListedIp({ state, onClose, data }: Props) {

    return (
        <Modal size='xl' onClose={onClose} title="Edit IP Address" isOpen={state} >
            {
                data ? <EditIpAddressForm data={data} onClose={onClose} /> : "Loading..."
            }

        </Modal>
    );
}