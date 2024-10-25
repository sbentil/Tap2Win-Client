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
    // event: {
    //   _id: 'event_id_placeholder',
    //   name: 'Annual Tech Conference',
    //   description: 'A major tech event featuring experts from the industry.',
    // },
    transaction: {
      _id: 'transaction_id_placeholder',
      channel: 'CHECKOUT', // or 'USSD'
      CheckoutResponse: {
        ClientReference: 'client_ref_placeholder',
        Status: 'Completed',
        Amount: 250,
        CustomerPhoneNumber: '1234567890',
      },
      SessionId: 'session_id_placeholder',
      OrderInfo: {
        CustomerMobileNumber: '1234567890',
        CustomerName: 'John Doe',
        Subtotal: 250,
        Payment: {
          PaymentType: 'mobilemoney',
          AmountPaid: 250,
          AmountAfterCharges: 240,
        },
      },
    },
    createdAt: '2024-09-20T18:52:32.960Z',
    updatedAt: '2024-09-20T18:52:32.960Z',
  };
  