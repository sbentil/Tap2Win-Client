"use client";

import { Button, FileUploader } from "@/components/core";
import ViewFile from "@/components/core/view-file";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function InitiateBulkPayment() {
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [viewType, setViewType] = useState("upload");

    const handleFileNames = useCallback((fileNames: string[]) => {
        console.log(fileNames);
        setUploadedFiles(fileNames);
    }, []);

    function handleUploadSubmit() {
        setViewType("review");
    }

    function handleProcessPayment() {
        router.push("/payments");
    }


    return (
        <section className="">
            {
                viewType === "upload" &&
                <div className="flex flex-col max-w-[50%] mx-auto w-full gap-8">
                    <p>
                        Upload your Bulk Payment File. This file should be (csv, excel) supported. <br />
                        Attachment(s) should be in (PNG, JPEG, PDF)
                    </p>

                    <div className="w-full flex flex-col gap-2">
                        <p className="text-sm font-medium">
                            Upload your files here
                        </p>
                        <FileUploader maxFiles={5} handleUploadedFiles={handleFileNames} />
                        <p className="text-sm">
                            Ensure madatory field are filled and correct file types are uploaded
                        </p>
                    </div>

                    <Button className="mx-auto px-8" onClick={handleUploadSubmit}>
                        Submit
                    </Button>
                </div>
            }

            {
                viewType === "review" && (
                    <div className="flex flex-col max-w-[50%] mx-auto w-full gap-8">
                        <p className="text-primary text-center text-xl">
                            Review and Process
                        </p>

                        <p className="text-secondary text-lg">
                            Confirm Payment details and Proceed
                        </p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0">
                                    Payment Type:
                                </p>
                                <div className="w-full bg-neutral-200 f p-2 rounded">
                                    Bulk Payment
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="flex-shrink-0">
                                    Uploaded Files:
                                </p>
                                <div className="w-full bg-neutral-200 flex flex-col gap-1  p-2 rounded">
                                    {
                                        uploadedFiles.map((item, idx) => (
                                            <ViewFile file={item} key={idx} />
                                        ))
                                    }

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
    );
}