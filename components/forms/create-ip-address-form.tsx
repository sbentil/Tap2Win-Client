"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import toasts from "@/utils/toasts";
import { getCurrentDateTime } from '@/helpers/datetime';
import { Input, Button } from '../core';


type Props = {
    onClose: any;
};

export default function CreateIpAddressForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            ip: "",
            date: getCurrentDateTime(),
            
        },
        validationSchema: Yup.object().shape({
            ip: Yup.string().required(),
            date: Yup.string().required(),
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
            <Input
                id="ip"
                placeholder='Service A'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />
            <Input
                id="date"
                value={form.values.date}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />

            
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