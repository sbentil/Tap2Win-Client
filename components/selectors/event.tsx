import * as Yup from "yup"

import React from 'react'
import { Select } from '../core';
import useEvents from "@/hooks/useEvents";
import { useFormik } from 'formik';

interface Props {
    setSelected: (s: string) => void
}
const EventSelector: React.FC<Props> = ({ setSelected }) => {
    const { data, isLoading, error, refetch } = useEvents({ page: 1, limit: 20 });
    const events = data?.data || [];
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            event: ""
        },
        validationSchema: Yup.object({
            event: Yup.string().required(),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className="flex items-center gap-4">
            <Select
                value={form.values.event}
                id="status"
                placeholder="Select Event"
                options={
                    events.map(event => ({
                        label: event.name,
                        value: event._id
                    }))
                }

                onValueChange={(value) => {
                    form.setFieldValue("event", value);
                    setSelected(value)
                }}
            />
        </div>
    )
}

export default EventSelector