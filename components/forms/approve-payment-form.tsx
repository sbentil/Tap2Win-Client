"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import toasts from "@/utils/toasts";
import { Textarea, Button } from '../core';


type Props = {
    onClose: any;
    data: any;
};

export default function ApprovePaymentForm({ onClose, data }: Props) {
    const [loading, setLoading] = useState<boolean>(false);


    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            reason: "",
        },
        validationSchema: Yup.object().shape({
            reason: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);

            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Services and Fees", "Services and Fees edited successfully ");
            }, 3000);
            onClose();


            return () => clearTimeout(timer);
        }
    });


    return (

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <h2 className='text-lg'>
                Reason for Approving this fund request?
            </h2>
            <Textarea id="reason" label='Reason' placeholder='GHC1450' value={form.values.reason}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form} />

            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-[80%]'>
                <Button onClick={onClose} type={"button"} variant='outline' className='w-1/2' disabled={loading}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit' className='w-1/2' disabled={loading}>
                    Approve
                </Button>
            </div>

        </form>
    );
}