export interface IPayment {
    batchId: string;
    transactionsNumber: number;
    totalAmount: string;
    createdBy: string;
    approvedBy?: string;
    rejectedBy?: string;
    status: "success" | "failed";
    createdAt?: string;
    updatedAt?: string;
}



export interface INewPayment {
    createdAt: string;
    batchId: string;
    transactionsNumber: number;
    totalAmount: string;
    createdBy: string;
    attachment: any;
    status: "success" | "failed";
    institutionName?: string;
    reciepientAccount?: string
    amount?: string
    fee?: string
    narration?: string
    totalFees?: string;
    updatedAt?: string;
}