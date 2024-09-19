export interface IAllSettlements {
    batchId: string,
    noTransactions: string,
    totalAmount: string,
    createdBy: string,
    approvedRejectedBy: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface ISettlementRequests {
    batchId: string,
    noTransactions: string,
    insuranceName: string,
    totalAmount: string,
    totalFees: string,
    createdBy: string,
    recipientAccount: string,
    amount: string,
    fee: string,
    narration: string,
    attachments: string,
    finalStatus: string,
    createdAt: string,
    completedAt: string, 
}