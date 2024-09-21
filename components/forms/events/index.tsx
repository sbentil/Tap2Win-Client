import * as Yup from 'yup';

import { Button, Input } from '@/components/core';
import { IEvent, IEventInput } from '@/interfaces/event';

import CustomTextarea from '@/components/core/custom-textarea';
import React from 'react';
import { useFormik } from 'formik';

interface Props {
  data?: IEvent | null;
  onCancel: any;
}

const EventForm: React.FC<Props> = ({ data, onCancel }) => {
  const [event, setEvent] = React.useState<IEventInput>({
    name: data?.name ?? "",
    description: data?.description || "",
    startDate: new Date(data?.startDate || "") || new Date(),
    endDate: new Date(data?.endDate || "") || new Date(),
  });

  const { handleSubmit, ...form } = useFormik({
    initialValues: event,
    validationSchema: Yup.object({
      name: Yup.string().required("Event name is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required").min(
        Yup.ref('startDate'), "End date cannot be before start date"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full p-2">
        <Input
          id="name"
          label="Event Name"
          type="text"
          placeholder="Event Name"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />
        <CustomTextarea
          id="description"
          label="Description"
          placeholder="Event Description"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />
        <Input
          id="startDate"
          label="Start Date"
          type="date"
          placeholder="Start Date"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />
        <Input
          id="endDate"
          label="End Date"
          type="date"
          placeholder="End Date"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />
      </div>

      <div className="flex gap-10 p-5 w-full items-center justify-center">
        <Button onClick={onCancel} variant="outline" text="Cancel" type='button' />
        <Button variant="primary" text={data ? "Save" : "Add Event"} type="submit" className="min-w-[150px]" />
      </div>
    </form>
  );
}

export default EventForm;
