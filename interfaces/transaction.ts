import { IEvent } from "./event";
import { IPagination } from ".";

export interface IOrderItem {
    ItemId: string;
    Name: string;
    Quantity: number;
    UnitPrice: number;
}

export interface IPayment {
    PaymentType: string;
    AmountPaid: number;
    AmountAfterCharges: number;
    PaymentDate: string; // ISO 8601 format
    PaymentDescription: string;
    IsSuccessful: boolean;
}

export interface IOrderInfo {
    CustomerMobileNumber: string;
    CustomerEmail: string | null;
    CustomerName: string;
    Status: string;
    OrderDate: string; // ISO 8601 format
    Currency: string;
    BranchName: string;
    IsRecurring: boolean;
    RecurringInvoiceId: string | null;
    Subtotal: number;
    Payment: IPayment;
    Items: IOrderItem[];
}

export interface ITransaction {
    SessionId: string;
    OrderId: string;
    OrderInfo: IOrderInfo;
    event: IEvent
    _id: string
    createdAt: Date,
    updatedAt: Date
}


export interface ITokensPagination extends IPagination {
    event?: string
}