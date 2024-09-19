"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Select, Input, Button } from '@/components/core';
import toasts from "@/utils/toasts";

type Props = {
    onClose: any;
};

type ConfigurePartnerInput = {
    callback: {
        serviceName: string;
        callbackUrl: string;
    };
    serviceAndFees: {
        service: string;
        feeProfile: string;
    }[];
    ipAddresses: {
        ip: string;
        date: string;
    }[];
};

export default function ConfigurePartnerForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [servicesAndFees, setServicesAndFees] = useState([{ service: "", feeProfile: "" }]);
    const [ipAddresses, setIpAddresses] = useState([{ ip: "", date: "" }]);

    const form = useFormik<ConfigurePartnerInput>({
        initialValues: {
            callback: {
                serviceName: "",
                callbackUrl: "",
            },
            serviceAndFees: [{ service: "", feeProfile: "" }],
            ipAddresses: [{ ip: "", date: "" }],
        },
        validationSchema: Yup.object().shape({
            callback: Yup.object().shape({
                serviceName: Yup.string().required("Service Name is required"),
                callbackUrl: Yup.string().required("Callback URL is required"),
            }),
            serviceAndFees: Yup.array().of(
                Yup.object().shape({
                    service: Yup.string().required("Service is required"),
                    feeProfile: Yup.string().required("Fee Profile is required"),
                })
            ),
            ipAddresses: Yup.array().of(
                Yup.object().shape({
                    ip: Yup.string().required("IP Address is required"),
                    date: Yup.string().required("Date is required"),
                })
            ),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            const isValid = await form.validateForm();
            
            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Create Partner", "Partner Created successfully");
            }, 3000);

            return () => clearTimeout(timer);
        },
    });

    // console.log({errors})


    const addServiceRow = () => {
        setServicesAndFees([...servicesAndFees, { service: "", feeProfile: "" }]);
    };

    const addIpRow = () => {
        setIpAddresses([...ipAddresses, { ip: "", date: "" }]);
    };

    const serviceAndFeesOptions = [
        {
            value: "prepaid",
            label: "Prepaid"
        },
        {
            value: "postpaid",
            label: "Postpaid"
        },
    ];

    return (
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
            <h1 className='text-xl'>Callback</h1>
            <div>
                <Input
                    id="callback.serviceName"
                    label='Service Name'
                    placeholder='Service Name Here'
                    value={form.values.callback.serviceName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                    validation={form}
                />
            </div>
            <div>
                <Input
                    id="callback.callbackUrl"
                    label='Callback URL'
                    placeholder='URL'
                    required
                    value={form.values.callback.callbackUrl}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    validation={form}

                />
            </div>

            <h1 className='text-xl'>Services & Fees</h1>
            {servicesAndFees.map((_, index) => (
                <div key={index} className='w-full grid grid-cols-2 gap-4'>
                    <Select
                        required
                        id={`servicesAndFees.${index}.service`}
                        value={form.values.serviceAndFees[index]?.service || ""}
                        onValueChange={(value) => {
                            form.setFieldValue(`serviceAndFees.${index}.service`, value);
                        }}
                        placeholder='Select Service'
                        options={serviceAndFeesOptions}
                    />

                    <Select
                        id={`servicesAndFees.${index}.feeProfile`}
                        value={form.values.serviceAndFees[index]?.feeProfile || ""}
                        onValueChange={(value) => {
                            form.setFieldValue(`serviceAndFees.${index}.feeProfile`, value);
                        }}
                        placeholder='Select Fee Profile'
                        options={serviceAndFeesOptions}
                    />
                </div>
            ))}
            <button onClick={addServiceRow} type="button" className="text-primary border w-max border-neutral-200 hover:border-primary px-2 py-1 text-sm rounded">
                + Add a Service
            </button>

            <h1 className='text-xl'>IP Address</h1>
            {ipAddresses.map((_, index) => (
                <div key={index} className='w-full grid grid-cols-2 gap-4'>
                    <Input
                        id={`ipAddresses.${index}.ip`}
                        label='IP Address'
                        placeholder='IP Address'
                        value={form.values.ipAddresses[index]?.ip || ""}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        required
                        validation={form}

                    />
                    <Input
                        id={`ipAddresses.${index}.date`}
                        label='Date'
                        placeholder='Date'
                        value={form.values.ipAddresses[index]?.date || ""}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        required
                        validation={form}

                    />
                </div>
            ))}
            <button onClick={addIpRow} type="button" className="text-primary border w-max border-neutral-200 hover:border-primary px-2 py-1 text-sm rounded">
                + Add IP Address
            </button>

            <div className='mx-auto flex items-center gap-4 w-full max-w-[80%]'>
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
