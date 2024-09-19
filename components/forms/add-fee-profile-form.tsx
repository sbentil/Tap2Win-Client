"use client";

import * as Yup from 'yup';

import { Button, Input } from '../core';

import toasts from "@/utils/toasts";
import { useFormik } from 'formik';
import { useState } from 'react';

type Props = {
    onClose: any;
};

export default function AddFeeProfileForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);


    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            title: "",
            country: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(),
            country: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Fees", "Fees Prfile Added successfully ");
            }, 3000);
            onClose()


            return () => clearTimeout(timer);
        }
    });


    return (

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >

            <Input
                id="title"
                placeholder='Profile Title/Name'
                label="Profile Title/Name"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
                value={form.values.title}
                required
            />
            <Input
                id="country"
                label="Country"
                value={form.values.country}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form}
                placeholder='e.g Ghana'
                required
            />

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