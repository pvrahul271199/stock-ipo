export interface IPO {
  id: string;
  companyName: string;
  securityType: string;
  issueStartDate: string;
  issueEndDate: string;
  status: 'Active' | 'Past';
  priceRange: string;
  faceValue: string;
  issueSize: string;
  bidLot: number;
  noOfTime: number;
  maximumOrder: number;
  symbol?: string;
  series?: string;
  subscriptionDetails: {
    category: string;
    offered: number;
    bids: number;
    subscription: number;
  }[];
  bidDetails: {
    category: string;
    subCategory?: string;
    applications: number;
    sharesBidFor: number;
  }[];
  leadManagers: string[];
  registrar: string;
  documents: {
    name: string;
    url: string;
  }[];
}

export interface NSEBidDetail {
  srNo: string | null;
  category: string;
  noOfshareBid: string;
  noofapplication: string;
}

export interface NSEIssueInfo {
  symbol: string;
  heading: string;
  dataList: {
    title: string;
    value: string;
  }[];
}

export interface IPODetails {
  bidDetails: NSEBidDetail[];
  issueInfo: NSEIssueInfo;
}

export interface IPOSizeDetails {
  freshIssue: number;
  offerForSale: number;
  totalIssueSize: number;
  totalIssueAmount: number;
  lowerBand: number;
  upperBand: number;
}