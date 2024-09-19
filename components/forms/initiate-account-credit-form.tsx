"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import toasts from "@/utils/toasts";
import { ReviewAndConfirmAccCreditModal } from '../modals';
import { Button, Input, FileUploader } from '../core';


type Props = {
    onClose: any;
};

export default function InitiateAccountCreditForm({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [showReview, setShowReview]= useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);

    function closeShowReview() {
        setShowReview(false)
    }

    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            amount: "",

        },
        validationSchema: Yup.object().shape({
            amount: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setData(values)
            setShowReview(true)
            console.log(values);

            const timer = setTimeout(() => {
                setLoading(false);
                toasts.success("Services and Fees", "Services and Fees edited successfully ");
            }, 3000);
            // onClose()


            return () => clearTimeout(timer);
        }
    });

    const handleFileNames = (fileNames: string[]) => {
        console.log("Uploaded files:", fileNames);
    };

    return (

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <Input id="amount" label='Amount' placeholder='GHC1450' onChange={form.handleChange}
                onBlur={form.handleBlur}
                validation={form} />

            <div className='flex flex-col gap-2 w-full'>
            <p className='text-sm font-medium'>Upload your files here</p>
                <FileUploader maxFiles={3} handleUploadedFiles={handleFileNames} />
            </div>
            <p className='text-sm'>Ensure mandatory fields are filled and correct file types are uploaded.</p>


            <div className='mx-auto pt-8  flex items-center gap-4 w-full max-w-[80%]'>
                <Button onClick={onClose} type={"button"} variant='outline' className='w-1/2' disabled={loading}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit' className='w-1/2' disabled={loading}>
                    Save
                </Button>
            </div>

            {
                showReview && <ReviewAndConfirmAccCreditModal onPrevClose={onClose} prevState={true} data={data} onClose={closeShowReview} state={showReview} />
            }
        </form>
    );
}