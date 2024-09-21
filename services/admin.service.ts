import Axios from "@/utils/Axios";
import { IServerCallback } from "./user.service";
import { IUserInput } from "@/interfaces/users";

class AdminService {
    static getUsers = async (filters: { page: number; limit: number; role?: string }) => {
        try {
            // Build the query string
            const queryParams = new URLSearchParams({
                page: filters.page.toString(),
                limit: filters.limit.toString(),
            });

            // Add the 'role' filter if it's provided
            if (filters.role) {
                queryParams.append("role", filters.role);
            }

            // Perform the Axios request with the constructed query string
            const { data } = await Axios({
                url: `/user/users?${queryParams.toString()}`,
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

    // create user
    static createUser = async (input: IUserInput, callback: IServerCallback) => {
        try {
            const { data } = await Axios.post("/user", input);
            if (data.success) {
                callback(null, data.data);
            } else {
                callback(data.message);
            }
        } catch (e: any) {
            console.log(`CREATE "user" error`, e);
            const message = e?.response?.data?.message || e?.message || "Check console for error";
            callback(message);
        }
    };

    static updateUser = async (id: string, input: IUserInput, callback: IServerCallback) => {
        try {
            const { data } = await Axios.put(`/user/update/${id}`, input);
            if (data.success) {
                callback(null, data.data);
            } else {
                callback(data.message);
            }
        } catch (e: any) {
            console.log(`UPDATE "user" error`, e);
            const message = e?.response?.data?.message || e?.message || "Check console for error";
            callback(message);
        }
    }

    //Actions on Raffle
    static fetchRaffles = async (filters: { page: number; limit: number; event?: string }) => {
        try {
            const queryParams = new URLSearchParams({
                page: filters.page.toString(),
                limit: filters.limit.toString(),
            });

            if (filters.event) {
                queryParams.append("event", filters.event);
            }

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
    static getEvents = async ({ page, limit, organizer }: { page: number; limit: number, organizer?:string }) => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (organizer) {
                queryParams.append("organizer", organizer);
            }

            const { data } = await Axios({
                url: `/event/fetch?${queryParams.toString()}`,
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
    static getTransactions = async ({ page, limit, event }: { page: number; limit: number, event?:string }) => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (event) {
                queryParams.append("event", event);
            }

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

export default AdminService;
