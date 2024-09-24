"use client";

import { IRoles } from "@/models/user.model";
import { removeCookie } from "typescript-cookie";
import { useAuthContext } from "@/hooks/userContext";

interface RoleProps {
    admin: React.ReactNode;
    organizer: React.ReactNode;
}

const RoleGuard: React.FC<RoleProps> = ({
    admin,
    organizer
}) => {
    const { user } = useAuthContext();

    if (!user) {
        window.location.href = "/signin"
        return <p>No User</p>;
    }


    switch (user.role) {
        case IRoles.ADMIN:
            return admin;
        case IRoles.ORGANIZER:
            return organizer;
        default:
            removeCookie("access_token")
            removeCookie("refresh_token")
            window.location.href = "/signin"
            return <p>Role not recognized</p>;
    }
}

export default RoleGuard;
