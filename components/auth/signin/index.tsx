"use client";

import * as Yup from 'yup';

import { Button, Input } from '@/components/core';

import Link from 'next/link';
import React from "react";
import UserService from '@/services/user.service';
import toasts from '@/utils/toasts';
import { useAuthContext } from '@/hooks/userContext';
import { useFormik } from 'formik';

const LoginPage = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { login } = useAuthContext();
    const { handleSubmit, ...form } = useFormik({
        initialValues: {
            phone: "",
            pin: "",
        },
        validationSchema: Yup.object().shape({
            phone: Yup.string().length(10).required(),
            pin: Yup.string().length(6).required(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            UserService.login(values.phone, values.pin, (error, user) => {
                setLoading(false);
                if (!error) {
                    login(user);
                    window.location.href = "/dashboard"
                    toasts.success("Login🎉", "Login Successful");
                } else {
                    console.error(error)
                    toasts.error("Login 👺", error);
                }
            });
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
                                id="phone"
                                label="Phone"
                                type="text"
                                required
                                placeholder='eg. 0233445567'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                validation={form}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                id="pin"
                                label="Pin"
                                type="text"
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