
"use client"

import React, { useState } from 'react'

import Modal from '@/components/modal';
import { TableExample } from '@/components/table';
import { FileUploader, Tabs, DateRangePicker, DatePicker } from '@/components/core';

const tabs = [
    { label: 'All Fund Requests' },
    { label: 'Pending Requests', value: 'pending' },
];
const stringTabs = ["Tab 1", "Tab 2", "Tab 3"];



const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => setIsModalOpen(false)
    const handleFileNames = (fileNames: string[]) => {
        console.log("Uploaded files:", fileNames);
    };

    const handleDateChange = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
        console.log('Selected Start Date:', startDate);
        console.log('Selected End Date:', endDate);
        // You can also perform any additional logic here
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <Tabs tabs={tabs} activeTab={"pending"} />

            <FileUploader maxFiles={3} handleUploadedFiles={handleFileNames} />
            <DatePicker
                id="startDate"
                label="Start Date"
                value="2023-05-15"
                required={true}
                min="1900-01-01"
                max="2023-12-31"
            />

            <DateRangePicker handleDateChange={handleDateChange} />

            <TableExample />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Create Partner"
                size="xl"
                footer={
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                }
            >
                <p>This is the content of the modal.</p>
                <p>This is the content of the modal.</p>
                <p>This is the content of the modal.</p>


            </Modal>
        </main>
    )
}

export default Page