import * as Yup from 'yup';

import { IUserInput, IUsers } from '@/interfaces/users';

import React from 'react'
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import { Input, Select } from '@/components/core';

interface Props {
  data?: IUsers | null;
}


const UserForm: React.FC<Props> = ({ data }) => {
  const [user, setUser] = React.useState<IUserInput>({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    otherNames: data?.otherNames || "",
    email: data?.email || "",
    userType: data?.userType || "",
    userRole: data?.userRole || "",
    status: data?.status || "active",

  })
  const { handleSubmit, ...form } = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      otherNames: Yup.string().optional(),
      email: Yup.string().email().required(),
      userType: Yup.string().required(),
      userRole: Yup.string().required(),
      status: Yup.string().oneOf(["active", "inactive"]).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  /* use effect:
  In implmentation, only the user id is passed to the form component.
  The form component will use the id to fetch the user data from the server
  and populate the form fields with the data.

  if id is not provided, the form will be empty and the user can fill in the details
  **/

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full p-2">
        <div className=" flex justify-between items-center w-full gap-x-4">
          <div className="flex-col w-1/2 ">
            <Input
              id="firstName"
              label="First Name"
              type="text"
              placeholder="First Name"
              required
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              validation={form}
            />
          </div>

          <div className="flex-col w-1/2">
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              required
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              validation={form}
            />
          </div>
        </div>

        <Input
          id="otherNames"
          label="Other Name(s)"
          type="text"
          placeholder="Other Name(s)"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />


        <div className={cn(
          "flex w-full items-center justify-between gap-x-4",
          !data && "flex-col gap-y-8",
        )}>
          <div className={cn('flex-col w-1/2', !data && "w-full")}>
            <Select
              value={form.values.userType}
              id="userType"
              label="User Type"
              placeholder="Select user Type"
              required
              options={[
                { value: "Partner", label: "Partner" },
                { value: "Reporter", label: "Reporter" },
              ]}
              
              onValueChange={(value) => {
                form.setFieldValue("userType", value);
              }}
            />
          </div>
          <div className={cn('flex-col w-1/2', !data && "w-full")}>
            <Input
              id="userRole"
              label="User Role"
              type="text"
              placeholder="Last Name"
              required
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              validation={form}
            />
          </div>
        </div>

        {
          data && <Select
            id="status"
            value={form.values.status}
            label="Status"
            placeholder="Select Status"
            required
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            
            onValueChange={(value) => {
              form.setFieldValue("status", value);
            }}
          />
        }
      </div>
    </form>
  );
}

export default UserForm; 
