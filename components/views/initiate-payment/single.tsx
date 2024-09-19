"use client"
import { fakerCompanies, Option } from "./data"
import { Select, Input, Button, FileUploader } from '@/components/core';
import toasts from "@/utils/toasts";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import ViewFile from "@/components/core/view-file";
import { useRouter } from "next/navigation";

type InitiateSinglePaymentInput = {
    institutionName: string
    accountNumber: string
    amount: string
    attachment: string
}

export default function InitiateSinglePayment() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [viewType, setViewType] = useState("upload");
    const [reviewValues, setReviewValues] = useState <InitiateSinglePaymentInput | null>(null)

    const form = useFormik<InitiateSinglePaymentInput>({
        initialValues: {
            accountNumber: "",
            amount: "",
            attachment: "",
            institutionName: ""
        }, 
        validationSchema: Yup.object().shape({
            accountNumber: Yup.string().required("IP Address is required"),
            amount: Yup.string().required("IP Address is required"),
            attachment: Yup.string().required("IP Address is required"),
            institutionName: Yup.string().required("IP Address is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            setReviewValues(values)
            setViewType("review")
            const timer = setTimeout(() => {
                setLoading(false);
                // toasts.success("Create Partner", "Partner Created successfully");
            }, 3000);

            return () => clearTimeout(timer);
        },
    })

    const handleFileNames = useCallback((fileNames: string[]) => {
        console.log(fileNames);
        form.setFieldValue(`attachment`, fileNames[0])
    }, []);

    function handleProcessPayment() {
        router.push("/payments");
    }
    return (
        <section className=" w-full mx-auto max-w-[50%]">
            {
                viewType === "upload" && <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
                    <Select
                        required
                        label="Institution Name"
                        id={`institutionName`}
                        value={form.values.institutionName}
                        onValueChange={(value) => {
                            form.setFieldValue(`institutionName`, value);
                        }}
                        placeholder='Select Institution'
                        options={fakerCompanies}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="accountNumber"
                            label='Account Number'
                            placeholder=''
                            value={form.values.accountNumber}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                            validation={form}
                        />
                        <Input
                            id="amount"
                            label='Amount'
                            placeholder=''
                            value={form.values.amount}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            required
                            validation={form}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-sm font-medium">
                            Upload your files here
                        </p>
                        <FileUploader handleUploadedFiles={handleFileNames} />
                        <p className="text-sm">
                            Ensure madatory field are filled and correct file types are uploaded
                        </p>
                    </div>
                    <Button className="mx-auto px-8" type="submit" >
                        Submit
                    </Button>
                </form>
            }

            {
                viewType === "review" && (
                    <div className="flex flex-col w-full gap-8">
                        <p className="text-primary text-center text-xl">
                            Review and Process
                        </p>

                        <p className="text-secondary text-lg">
                            Confirm Payment details and Proceed
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0 w-[20%] ">
                                    Payment Type:
                                </p>
                                <div className="w-full bg-neutral-200 f p-2 rounded">
                                    Single Payment
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0 w-[20%] ">
                                    Institution Name:
                                </p>
                                <div className="w-full bg-neutral-200 f p-2 rounded">
                                    {reviewValues?.institutionName}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0 w-[20%] ">
                                    Account Number:
                                </p>
                                <div className="w-full bg-neutral-200 f p-2 rounded">
                                    {reviewValues?.accountNumber}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0 w-[20%]">
                                    Amount:
                                </p>
                                <div className="w-full bg-neutral-200 f p-2 rounded">
                                    {
                                        reviewValues?.amount
                                    }
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0 w-[20%]">
                                    Uploaded Files:
                                </p>
                                <div className="w-full bg-neutral-200 flex flex-col gap-1  p-2 rounded">
                                  
                                    <ViewFile file={reviewValues?.attachment || ""}  />

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <Button variant="outline" className="w-full">
                                            Cancel
                                        </Button>
                                        <Button className="w-full" onClick={handleProcessPayment} >
                                            Process
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }

        </section>
    )
}