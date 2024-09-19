import { IUser } from "@/models/user.model";

export const fetchLocalUser = (callback: (user: IUser) => void) => {
    let userInfo = null;
    if (typeof window !== "undefined") {
        userInfo =
            sessionStorage.getItem("loggedin_user") !== "undefined"
                ? sessionStorage.getItem("loggedin_user")
                : sessionStorage.clear();
    }
    callback(JSON.parse(userInfo as string));
};


export const setLocalUser = (user: IUser) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("loggedin_user", JSON.stringify(user));
    }
}


export const removeLocalUser = () => {
    if (typeof window !== "undefined") {
        sessionStorage.clear();
    }
}
