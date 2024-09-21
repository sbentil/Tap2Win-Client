import Axios from "@/utils/Axios";

class OrganizerService {
    //Actions on Raffle
    static fetchRaffles = async (filters: { page: number; limit: number; event: string }) => {
        try {
            const queryParams = new URLSearchParams({
                page: filters.page.toString(),
                limit: filters.limit.toString(),
                event: filters.event,
            });

            const { data } = await Axios({
                url: `/raffle/raffles?${queryParams.toString()}`,
                method: "GET",
            });

            if (data.success) {
                return {
                    ...data,
                };
            } else {
                throw new Error(data.message);
            }
        } catch (e: any) {
            const message = e?.response?.data?.error || e?.message || "Check console for error";
            throw new Error(message);
        }
    };


    // Get All Events
    static getEvents = async ({ page, limit }: { page: number; limit: number }) => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            const { data } = await Axios({
                url: `/event/self?${queryParams.toString()}`,
                method: "GET",
            });

            if (data.success) {
                return {
                    ...data,
                };
            } else {
                throw new Error(data.message);
            }
        } catch (e: any) {
            const message = e?.response?.data?.error || e?.message || "Check console for error";
            throw new Error(message);
        }
    };


    // Get All Transactions
    static getTransactions = async ({ page, limit, event }: { page: number; limit: number, event:string }) => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                event,
            });

            const { data } = await Axios({
                url: `/transaction/transactions?${queryParams.toString()}`,
                method: "GET",
            });

            if (data.success) {
                return {
                    ...data,
                };
            } else {
                throw new Error(data.message);
            }
        } catch (e: any) {
            const message = e?.response?.data?.error || e?.message || "Check console for error";
            throw new Error(message);
        }
    };
}

export default OrganizerService;
