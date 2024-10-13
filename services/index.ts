import { formatPhoneNumber } from './../helpers/string';
import Axios from "@/utils/Axios";
import { IServerCallback } from "./user.service";

interface IPurchaseInput {
    tokens_count: number;
    phone: string;
    name: string;
}

export interface ICheckoutResponse {
    checkoutUrl: string,
    checkoutId: string,
    clientReference: "D9104-1728425686215",
    message: "",
    checkoutDirectUrl: string

}

class GeneralService {
    constructor() {
        console.log('GeneralService @work');
    }

    static async purchaseToken(input: IPurchaseInput, callback: IServerCallback) {
        try {
            const { data } = await Axios({
                method: "POST",
                url: "payments/checkout",
                data: input
            })

            if (data.success) {
                callback(null, data.data.data);
            } else {
                callback(data.message);
            }

        } catch (e: any) {
            console.log(`FETCH "payments/checkout" error`, e);
            const message =
                e?.response?.data?.error || e?.message || "Check console for error";
            callback(message)

        }
    }

    static async myTokens(phone: string, callback: IServerCallback) {
        try {
            const formatted = formatPhoneNumber(phone);
            const { data } = await Axios({
                method: "GET",
                url: `public/my-tokens/${formatted}`
            })

            if (data.success) {
                if (data.data.length <= 0) {
                    callback("No tokens found")
                } else {
                    callback(null, data.data);
                }
            } else {
                callback(data.message);
            }

        } catch (e: any) {
            console.log(`FETCH "user/tokens" error`, e);
            const message =
                e?.response?.data?.error || e?.message || "Check console for error";
            callback(message)

        }
    }

    static async verifyToken(phone: string, token: string, callback: IServerCallback) {
        try {
            const { data } = await Axios({
                method: "POST",
                url: `public/verify-token`,
                data: { phone, token }
            })

            if (data.success) {
                callback(null, data.data);
            } else {
                callback(data.message);
            }

        } catch (e: any) {
            console.log(`FETCH "user/verify-token" error`, e);
            const message =
                e?.response?.data?.error || e?.message || "Check console for error";
            callback(message)

        }
    }
}

export default GeneralService;