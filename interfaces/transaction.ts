import { IEvent } from "./event";
import { IPagination } from ".";

export interface IOrderItem {
    ItemId: string;
    Name: string;
    Quantity: number;
    UnitPrice: number;
}


export interface IPaymentDetails {
    MobileMoneyNumber: string;
    PaymentType: string; // e.g., "mobilemoney"
    Channel: string; // e.g., "mtn-gh"
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

export interface ICheckoutResponse {
    CheckoutId: string;
    SalesInvoiceId: string;
    ClientReference: string;
    Status: string;
    Amount: number;
    CustomerPhoneNumber: string;
    PaymentDetails: IPaymentDetails;
    Description: string;
}

// Interface for the Status Check data
export interface IStatusCheckData {
    date: string;
    status: "Paid" | "Unpaid";
    transactionId: string;
    externalTransactionId: string;
    paymentMethod: string; // e.g., "mobilemoney"
    clientReference: string;
    currencyCode: string | null; // Can be null
    amount: number;
    charges: number; // The charges incurred
    amountAfterCharges: number; // The amount after deducting charges
    isFulfilled: boolean | null; // Can be null
}

export interface ITransaction {
    SessionId: string;
    OrderId: string;
    OrderInfo: IOrderInfo;
    event: IEvent
    _id: string
    channel: "USSD" | "CHECKOUT";
    CheckoutResponse?: ICheckoutResponse; // New property for checkout response
    StatusCheckData?: IStatusCheckData; //
    createdAt: Date,
    updatedAt: Date
}


export interface ITokensPagination extends IPagination {
    event?: string
}