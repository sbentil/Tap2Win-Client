export const Columns = [
    {
      title: "Date", options: { filter: true, sort: true },
      selector: (row: any) => row.date
    }, 
     {
        title: 'Transaction ID', options: { filter: true, sort: true },
        selector: (row: any) => row.transactionId,
    },
    {
        title: "Partner's Name", options: { filter: true, sort: true },
        selector: (row: any) => row.partnerName,
    },
    {
        title: 'Recipient Account', options: { filter: true, sort: true },
        selector: (row: any) => row.recipientAccount,
    },
    {
        title: 'Recipient Name', options: { filter: true, sort: true },
        selector: (row: any) => row.recipientName,
    },
    {
        title: 'Account', options: { filter: true, sort: true },
        selector: (row: any) => row.account,
    },
    {
        title: 'Channel', options: { filter: true, sort: true },
        selector: (row: any) => row.channel,
    },
    {
        title: 'Ins. Name', options: { filter: true, sort: true },
        selector: (row: any) => row.insuranceName,
    },
]