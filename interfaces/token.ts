import { IEvent } from "./event";
import { IPagination } from ".";

export interface IToken {
    name: string;
    phone: string;
    token: string;
    event: IEvent
    transaction: {
        _id: string,
        channel: string,
        StatusCheckData: any
    }
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITokensPagination extends IPagination {
    event?: string
}