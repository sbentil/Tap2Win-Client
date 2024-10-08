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
}

export default GeneralService;