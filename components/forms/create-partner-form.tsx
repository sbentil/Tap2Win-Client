"use client";

import * as Yup from 'yup';

import toasts from "@/utils/toasts";
import { useFormik } from 'formik';
import { useState } from 'react';
import { Input, Select, Button } from '../core';

type Props = {
    onClose: any
}
export default function CreatePartnerForm({ onClose }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            username: "",
            email: "",
            ip: "",
            accountType: "",
            enableServices: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            username: Yup.string().required(),
            ip: Yup.string().required(),
            accountType: Yup.string().required(),
            enableServices: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);

            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success(" Create Partner", "Partner Created successfully ");
            }, 3000); // 30000 milliseconds = 30 seconds

            return () => clearTimeout(timer);
        }
    });

    const accountTypeOptions = [
        {
            value: "prepaid",
            label: "Prepaid"
        }
    ];

    const enableServicesOptions = [
        {
            value: "name-enquiry",
            label: "Name Enquiry"
        },
        {
            value: "transaction-status",
            label: "Transaction Status"
        },
        {
            value: "collections",
            label: "Collections"
        },
        {
            value: "disbursement",
            label: "Disbursement"
        },
        {
            value: "remittance",
            label: "Remittance"
        },
        {
            value: "bulk-payment",
            label: "Bulk Payment"
        },
    ];



    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <Input
                required
                id="username"
                label='Username'
                placeholder='GlobalPaymentsLtd'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />
            <Input
                required
                id="email"
                label='Email'
                type="email"
                placeholder='gpltd@gmail.com'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />
            <Select
                required
                id="accountType"
                label='Account Type'
                placeholder='Select Account Type'
                value={form.values.accountType}
                options={accountTypeOptions}
                onValueChange={(value) => {
                    form.setFieldValue("accountType", value);
                }}
            />
            <Input
                required
                id="ip"
                label='IP'
                placeholder='IP Address'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />
            <Select
                required
                id="enableServices"
                label='Enable Services'
                placeholder='Select Services' 
                options={enableServicesOptions}
                value={form.values.enableServices}
                onValueChange={(value) => {
                    form.setFieldValue("enableServices", value);
                }}
            />

            <div className='mx-auto   flex items-center gap-4 w-full max-w-[80%]'>
                <Button onClick={onClose} variant='outline' className='w-1/2' disabled={loading}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit' className='w-1/2' disabled={loading}>
                    Save
                </Button>
            </div>
        </form>
    );
}