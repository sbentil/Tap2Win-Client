
export interface IPartner {
  username: string;
  id: string;
  email: string;
  accountType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


export interface IWhiteListedIps {
  ip: string;
  createdAt: string;
  updatedAt: string;
}

export interface IServiceAndFees {
  serviceName: string;
  feeProfile: string;
}

export interface IConfiguredCallbacks {
  activityName: string;
  eventType: string;
  callbackUrl: string;
  status: string;
  lastTriggered: string;
}

export interface ICreditHistory {
  date: string;
  description: string;
  amount: string;
  type: string;
  openingBalance: string;
  closingBalance: string;
}


export interface IFundRequests {
  username: string;
  amount: string;
  status: string
  comment: string
  createdBy: string
  approvedBy: string
  openingBalance: string
  closingBalance: string
  createdAt?: string
  updatedAt?: string
}

export interface IPendingFundRequests {
  username: string;
  amount: string;
  status: string;
  attachment: string
  createdBy?: string
  createdAt: string;
  updatedAt: string;
}



