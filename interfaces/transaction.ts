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




export const transactionTemplate = {
    SessionId: 'session_id_placeholder',
    OrderId: 'order_id_placeholder',
    OrderInfo: {
        CustomerMobileNumber: '0000000000',
        CustomerEmail: null,
        CustomerName: 'John Doe',
        Status: 'Pending',
        OrderDate: new Date().toISOString(),
        Currency: 'USD',
        BranchName: 'Main Branch',
        IsRecurring: false,
        RecurringInvoiceId: null,
        Subtotal: 100,
        Payment: {
            PaymentType: 'mobilemoney',
            AmountPaid: 100,
            AmountAfterCharges: 98,
            PaymentDate: new Date().toISOString(),
            PaymentDescription: 'Payment for order',
            IsSuccessful: true,
        },
        Items: [
            {
                ItemId: 'item_id_placeholder',
                Name: 'Sample Item',
                Quantity: 1,
                UnitPrice: 100,
            },
        ],
    },
    event: {
        _id: 'event_id_placeholder',
        name: 'Sample Event',
        description: 'Sample Event Description',
    },
    _id: 'transaction_id_placeholder',
    channel: 'CHECKOUT',
    CheckoutResponse: {
        CheckoutId: 'checkout_id_placeholder',
        SalesInvoiceId: 'sales_invoice_id_placeholder',
        ClientReference: 'client_reference_placeholder',
        Status: 'Pending',
        Amount: 100,
        CustomerPhoneNumber: '0000000000',
        PaymentDetails: {
            MobileMoneyNumber: '0000000000',
            PaymentType: 'mobilemoney',
            Channel: 'mtn-gh',
        },
        Description: 'Checkout payment',
    },
    StatusCheckData: {
        date: new Date().toISOString(),
        status: 'Paid',
        transactionId: 'transaction_id_placeholder',
        externalTransactionId: 'external_transaction_id_placeholder',
        paymentMethod: 'mobilemoney',
        clientReference: 'client_reference_placeholder',
        currencyCode: 'USD',
        amount: 100,
        charges: 2,
        amountAfterCharges: 98,
        isFulfilled: true,
    },
};
