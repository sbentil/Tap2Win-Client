"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import toasts from "@/utils/toasts";
import { Input,Button } from '../core';


type Props = {
    onClose: any;
};

export default function AddCallbackForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            serviceName: "",
            callbackUrl: "",

        },
        validationSchema: Yup.object().shape({
            serviceName: Yup.string().required(),
            callbackUrl: Yup.string().required(),
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
                required
                id="serviceName"
                label='Service Name'
                placeholder='Service Name'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
            />
            <Input
                required
                id="callbackUrl"
                label="Callback Url"
                placeholder='Callback Url'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
                {...form}
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