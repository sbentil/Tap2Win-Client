import Axios from "@/utils/Axios";
import { IRoles, IUser } from "@/models/user.model";
import { setCookie } from "typescript-cookie";
export interface IServerCallback {
    (error: string | null, data?: any): void;
}

class UserService {
    static getUserInfo = async () => {
        try {
            // const { data } = await Axios.get<IUser>("/user/me");
            return {
                role: process.env.NEXT_PUBLIC_USER_ROLE as IRoles,
                _id: process.env.NEXT_PUBLIC_USER_ID!,
                email: process.env.NEXT_PUBLIC_USER_EMAIL!,
                name: process.env.NEXT_PUBLIC_USER_NAME!,
            }
        } catch (e: any) {
            console.log(`FETCH "user/me" error`, e);
            const message =
                e?.response?.data?.error || e?.message || "Check console for error";
            return message
        }
    }


    static setUsercookie = (token: string) => {
        setCookie("access_token", token);
        // return UserService.getUserInfo();
    }
}

export default UserService;
