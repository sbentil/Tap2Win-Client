import { ICheckoutResponse, IOrderInfo } from "./transaction";

import { IEvent } from "./event";
import { IPagination } from ".";

export interface IToken {
    name: string;
    phone: string;
    token: string;
    event: IEvent
    transaction: {
        _id: string
        channel: string
        CheckoutResponse?: ICheckoutResponse
        SessionId?: string
        OrderInfo?: IOrderInfo
    }
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITokensPagination extends IPagination {
    event?: string
}

export const tokenTemplate = {
    _id: 'token_id_placeholder',
    name: 'John Doe',
    phone: '1234567890',
    token: 'TOKEN123456',
    event: {
      _id: 'event_id_placeholder',
      name: 'Annual Tech Conference',
      description: 'A major tech event featuring experts from the industry.',
    },
    transaction: {
      _id: 'transaction_id_placeholder',
      channel: 'CHECKOUT', // or 'USSD'
      CheckoutResponse: {
        CheckoutId: 'checkout_id_placeholder',
        SalesInvoiceId: 'sales_invoice_id_placeholder',
        ClientReference: 'client_ref_placeholder',
        Status: 'Completed',
        Amount: 250,
        CustomerPhoneNumber: '1234567890',
        PaymentDetails: {
          MobileMoneyNumber: '1234567890',
          PaymentType: 'mobilemoney',
          Channel: 'mtn-gh',
        },
        Description: 'Payment for event token.',
      },
      SessionId: 'session_id_placeholder',
      OrderInfo: {
        CustomerMobileNumber: '1234567890',
        CustomerEmail: 'john.doe@example.com',
        CustomerName: 'John Doe',
        Status: 'Completed',
        OrderDate: new Date('2024-12-01T10:00:00Z').toISOString(),
        Currency: 'USD',
        BranchName: 'Main Branch',
        IsRecurring: false,
        RecurringInvoiceId: null,
        Subtotal: 250,
        Payment: {
          PaymentType: 'mobilemoney',
          AmountPaid: 250,
          AmountAfterCharges: 240,
          PaymentDate: new Date().toISOString(),
          PaymentDescription: 'Payment for order',
          IsSuccessful: true,
        },
        Items: [
          {
            ItemId: 'item1_id',
            Name: 'VIP Pass',
            Quantity: 1,
            UnitPrice: 250,
          },
        ],
      },
    }
  };
  