"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import toasts from "@/utils/toasts";
import { getCurrentDateTime } from '@/helpers/datetime';
import { Button, Input } from '../core';


type Props = {
    onClose: any;
    data: any;

};

export default function EditCallbackForm({ onClose, data }: Props) {
    // console.log(data)

    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            activityName: "Payment Success",
            eventType: "Transaction Status",
            status: "Active",
            callbackUrl: "http://partnerpaymentsuccessful.com",
            lastTriggered: getCurrentDateTime(),

        },
        validationSchema: Yup.object().shape({
            activityName: Yup.string().required(),
            eventType: Yup.string().required(),
            callbackUrl: Yup.string().required(),
            status: Yup.string().required(),
            lastTriggered: Yup.string().required(),
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
            <div className="grid grid-cols-2">
                <div>
                    <Input
                        required
                        id="activityName"
                        label="Activity Name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}
                    />
                </div>
                <div>
                    <Input
                        required
                        id="eventType"
                        label="Event Type"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}
                    />
                </div>
                <div className='col-span-2'>
                    <Input required
                        id="callbackUrl"
                        label="URL"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}
                    />
                </div>
                <div>
                    <Input required
                        id="eventType"
                        label="Status"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}
                    />
                </div>
                <div>
                    <Input required
                        id="eventType"
                        label="Last Triggered"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        validation={form}
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