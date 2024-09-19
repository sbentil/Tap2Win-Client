"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import toasts from "@/utils/toasts";
import { Button, Input } from '../core';


type Props = {
    onClose: any;
    data: any;
};

export default function EditIpAddressForm({ onClose, data }: Props) {
    // console.log(data)
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            ip: "192.158.100.42",

        },
        validationSchema: Yup.object().shape({
            ip: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);

            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Services and Fees", "Services and Fees edited successfully ");
            }, 3000);

            return () => clearTimeout(timer);
        }
    });



    return (

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <Input id="ip" label="IP Address" onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form} />


            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-[80%]'>
                <Button onClick={onClose} type={"button"} variant='outline' className='w-1/2' disabled={loading}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit' className='w-1/2' disabled={loading}>
                    Save
                </Button>
            </div>
        </form>
    );
}