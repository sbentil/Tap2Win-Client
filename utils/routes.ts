import {
    Firstline,
    Home,
    Icon,
    Moneys,
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
                    name: "Settings",
                    path: "/settings",
                    Icon: Setting2,
                },
            ];
        // Add cases for other roles as needed
        default:
            return [...defaults]
    }
};
