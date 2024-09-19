export interface ITransaction {
    transactionId: string,
    partnersName: string,
    payersAccount: string,
    amount: number,
    fee: number,
    channel: string,
    instName: string,
    instId: string,
    openingBalance: number,
    dateCompleted: string,
    dateCreated: string,
    closingBalance: number,
    dcmTransactionId: string,
    transactionType: string,
    payersName: string,
    responseDescription: string,
    responseCode: string
}

export interface ICreatedAccountStatement {
    username: string;
    amount: number;
    createby: string;
    approvedby: string;
    openingBalance: number;
    closingBalance: number;
    status: "active" | "inactive";
    comment: string;
    updatedAt: string; // ISO date string
    createdAt: string; // ISO date string
  }
  

  export interface IRemittanceTransaction {
    transactionId: string;
    partnerName: string;
    recipientAccount: string;
    recipientName: string;
    amount: number;
    fee: number;
    currency: string;
    remittedAmount: number;
    channel: string;
    dcmTransactionId: string;
    senderName: string;
    institutionName: string;
    institutionTransactionId: string;
    responseCode: string;
    responseDescription: string;
  }
  


  export interface ITransactionStatement {
    partnerName: string;
    transactionId: string;
    fee: number;
    totalCredit: number;
    numberOfCredits: number;
    totalDebit: number;
    numberOfDebits: number;
    openingBalance: number;
    closingBalance: number;
    date: Date | string;
  }
