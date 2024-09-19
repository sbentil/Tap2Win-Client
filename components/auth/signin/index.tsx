"use client";

import * as Yup from 'yup';

import { Button, Input } from '@/components/core';
import React, { FC } from "react";

import { IRoles } from '@/models/user.model';
import Link from 'next/link';
import { setCookie } from 'typescript-cookie';
import { setLocalUser } from '@/hooks/useSessionData';
import { useAuthContext } from '@/hooks/userContext';
import { useFormik } from 'formik';

const LoginPage = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { login } = useAuthContext();
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).max(12).required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            // setLocalUser({
            //     role: process.env.NEXT_PUBLIC_USER_ROLE as IRoles,
            //     _id: process.env.NEXT_PUBLIC_USER_ID!,
            //     email: values.email,
            //     name: process.env.NEXT_PUBLIC_USER_NAME!,
            //     phone: process.env.NEXT_PUBLIC_USER_PHONE!,
            // });
            const user = {
                role: process.env.NEXT_PUBLIC_USER_ROLE as IRoles,
                _id: process.env.NEXT_PUBLIC_USER_ID!,
                email: values.email,
                name: process.env.NEXT_PUBLIC_USER_NAME!,
                phone: process.env.NEXT_PUBLIC_USER_PHONE!,
            }
            login(user)
            setCookie("access_token", values.password);
        },
    });

    return (
        <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-left">
                <h2 className="text-xl font-extrabold text-text">Login.</h2>
                <p className="mt-2 text-sm text-text">
                    Enter your account details below.
                </p>
            </div>

            <div className="mt-8">

                <div className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Input
                                id="email"
                                label="Email"
                                type="email"
                                required
                                placeholder='eg. user@yopmail.com'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                validation={form}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                required
                                placeholder='e.g.  ..............'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                validation={form}
                            />
                        </div>
                        <div className="flex flex-col text-left text-sm text-gray-600 space-y-2">
                            <Link href="/forgot-password" className="text-secondary hover:text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full "
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;