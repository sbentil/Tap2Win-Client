import {
    Firstline,
    Home,
    Icon,
    Moneys,
    Python,
    Setting2,
    User
} from "iconsax-react";

import { IRoles } from "@/models/user.model";

export interface INavItem {
    name: string;
    path: string;
    Icon?: Icon;
}

export const getRoutes = (role: IRoles): INavItem[] => {
    const defaults = [
        {
            name: "Dashboard",
            path: "/",
            Icon: Home,
        },
    ];
    switch (role) {
        case IRoles.ADMIN:
            return [
                ...defaults,
                {
                    name: "Users",
                    path: "/users",
                    Icon: User,
                },
                {
                    name: "Events",
                    path: "/events",
                    Icon: Firstline,
                },
                {
                    name: "Transactions",
                    path: "/transactions",
                    Icon: Moneys,
                },
                {
                    name: "Tokens",
                    path: "/tokens",
                    Icon: Python,
                },

                {
                    name: "Settings",
                    path: "/settings",
                    Icon: Setting2,
                },
            ];
        case IRoles.ORGANIZER:
            return [
                ...defaults
            ]
        // Add cases for other roles as needed
        default:
            return [...defaults]
    }
};
