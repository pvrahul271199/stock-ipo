export interface IPO {
  symbol: string;
  companyName: string;
  issueStartDate: string;
  issueEndDate: string;
  status: string;
  isBse: string;
  series: string;
  noOfSharesBid: string;
  noOfSharesOffered: string;
  noOfTime: string;
}

export interface UpcomingIPO {
  symbol: string;
  companyName: string;
  issueStartDate: string;
  issueEndDate: string;
  issueSize: string;
  issuePrice: string;
  lotSize: string;
  status: string;
  series: string;
  sr_no: Number;
  priceBand: string;
}

export interface IPODetails {
  companyName: string;
  metaInfo: Record<string, any>;
  bidDetails: BidDetail[];
  issueInfo: IssueInfo;
  activeCat: ActiveCategory;
}

export interface BidDetail {
  srNo: string | null;
  category: string;
  noOfshareBid: string;
  noofapplication: string;
}

export interface IssueInfo {
  symbol: string;
  heading: string;
  dataList: IssueData[];
}

export interface IssueData {
  title: string;
  value: string;
}

export interface ActiveCategory {
  symbol: string | null;
  heading: string | null;
  updateTime: string;
  dataList: ActiveCategoryDetail[];
}

export interface ActiveCategoryDetail {
  srNo: string;
  category: string;
  noOfShareOffered: string;
  noOfSharesBid: string;
  noOfTotalMeant: string;
}

export interface NSEIssueInfo {
  symbol: string;
  heading: string;
  dataList: {
    title: string;
    value: string;
  }[];
}


export interface IPOSizeDetails {
  freshIssue: number;
  offerForSale: number;
  totalIssueSize: number;
  totalIssueAmount: number;
  lowerBand: number;
  upperBand: number;
}

export interface NSEBidDetail {
  srNo: string | null;
  category: string;
  noOfshareBid: string;
  noofapplication: string;
}

export interface BidCategory {
  category: string;
  subCategories?: BidCategory[];
  noOfshareBid: string;
  noofapplication: string;
  srNo: string | null;
}

export interface ProcessedBidData {
  mainCategories: BidCategory[];
  total: {
    noOfshareBid: string;
    noofapplication: string;
  };
}

export interface BidDetailsTableData {
  category: string;
  subCategory?: string;
  applications: number;
  sharesBidFor: number;
}