"use client";

import BouncingSquaresLoader from "@/components/preloader";
import { useAuthContext } from "@/hooks/userContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

const AuthGuard = ({
    children,
    isPublic,
}: {
    children: React.ReactNode;
    isPublic?: boolean;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, login } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const userToken = getCookie("access_token");
        const currentUser = getCookie("current_user");

        if (!isLoggedIn && !isPublic) {
            if (userToken && currentUser) {
                // UserService.getUserInfo().then((data) => {
                //     login(data);
                //     queryClient.setQueryData(["user"], data);
                //     setShowChildren(true);
                //     setIsLoading(false);
                // }).catch((error) => {
                //     logout();
                //     if (!isPublic) {
                //         router.push("/signin");
                //     }
                //     setIsLoading(false);
                // });
                // Simulate fetching user data from cookies instead of API
                const parsedUser = JSON.parse(currentUser);
                login(parsedUser);
                setIsLoading(false);
            } else {
                // User is not logged in, redirect to the sign-in page
                router.push("/signin");
            }
        } else if (isLoggedIn && isPublic) {
            // User is logged in and trying to access a public page (e.g., sign-in)
            router.push("/");
        } else {
            // User is logged in and accessing a private page
            setIsLoading(false);
        }
    }, [isLoggedIn, router, login, isPublic]);

    if (isLoading) {
        return <BouncingSquaresLoader />;
    }

    return children;
};

export default AuthGuard;
