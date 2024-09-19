export interface IAllReconciliations {
    transactionId: string,
    transactionType: string,
    createdBy: string,
    reconAction: string,
    status: string,
    dateCreated: string,
    dateModified: string
}

export interface IReconciliationRequests {
    transactionId: string,
    transactionType: string,
    initiatedBy: string,
    attachments: string,
    finalStatus: string,
    dateCreated: string
}