import { IPagination } from ".";
import { IUser } from "./users";

export interface IEventInput {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number
    channel: string
    organizer: string | IUser
}

export interface IEvent extends IEventInput {
    tokensCount: number;
    organizer: IUser;
    createdBy: IUser;
    lastUpdatedBy: IUser;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEventPagination extends IPagination {
    organizer?: string
}