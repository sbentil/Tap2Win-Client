"use client";

import * as Yup from 'yup';

import toasts from "@/utils/toasts";
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Input, Select } from '../core';

type Props = {
    onClose: any;
};

export default function EditServiceAndFeesForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            service1: "Service A",
            service2: "Service B",
            service3: "Service C",
            feeProfile1: "",
            feeProfile2: "",
            feeProfile3: "",
        },
        validationSchema: Yup.object().shape({
            service1: Yup.string().required(),
            service2: Yup.string().required(),
            service3: Yup.string().required(),
            feeProfile1: Yup.string().required(),
            feeProfile2: Yup.string().required(),
            feeProfile3: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);

            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Services and Fees", "Services and Fees edited successfully ");
            }, 3000); // 30000 milliseconds = 30 seconds

            return () => clearTimeout(timer);
        }
    });

    const feeProfileOptions = [
        {
            value: "flat-fee",
            label: "Flat Fee"
        },
    ];

    return (

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col gap-2'>
                    <p className="text-sm text-primary -mb-2">
                        Services
                    </p>
                    <Input id="service1" onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}    />
                    <Input id="service2" onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}   />
                    <Input id="service3" onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}   />

                </div>
                <div className='flex flex-col gap-2'>
                    <p className="text-sm text-primary -mb-2">
                        Fee Profile
                    </p>
                    <Select value={form.values.feeProfile1} options={feeProfileOptions} id="feeProfile1" placeholder='Select' 
                        onValueChange={(value) => {
                            form.setFieldValue("feeProfile1", value);
                        }}
                    />
                    <Select value={form.values.feeProfile2} options={feeProfileOptions} id="feeProfile2" placeholder='Select' 
                        onValueChange={(value) => {
                            form.setFieldValue("feeProfile2", value);
                        }}
                    />
                    <Select value={form.values.feeProfile3} options={feeProfileOptions} id="feeProfile3" placeholder='Select' 
                        onValueChange={(value) => {
                            form.setFieldValue("feeProfile3", value);
                        }}
                    />

                </div>
            </div>
            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-[80%]'>
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