import { IPODetails } from './types';

export const mockIPODetails: Record<string, IPODetails> = {
  "ETML": {
    bidDetails: [
      {
        srNo: "1",
        category: "Qualified Institutional Buyers(QIBs)",
        noOfshareBid: "523200",
        noofapplication: "9"
      },
      {
        srNo: "2",
        category: "Non Institutional Investors",
        noOfshareBid: "97873200",
        noofapplication: "17670"
      },
      {
        srNo: "3",
        category: "Retail Individual Investors(RIIs)",
        noOfshareBid: "283816800",
        noofapplication: "236514"
      }
    ],
    issueInfo: {
      symbol: "ETML",
      heading: "Emerald Tyre Manufacturers Limited",
      dataList: [
        {
          title: "Issue Period",
          value: "05-Dec-2024 to 09-Dec-2024"
        },
        {
          title: "Price Range",
          value: "Rs. 90 to Rs. 95 per equity share"
        }
      ]
    }
  },
  "TECHVISTA": {
    bidDetails: [
      {
        srNo: "1",
        category: "Qualified Institutional Buyers(QIBs)",
        noOfshareBid: "720000",
        noofapplication: "12"
      },
      {
        srNo: "2",
        category: "Non Institutional Investors",
        noOfshareBid: "85344000",
        noofapplication: "7280"
      },
      {
        srNo: "3",
        category: "Retail Individual Investors(RIIs)",
        noOfshareBid: "198940000",
        noofapplication: "92450"
      }
    ],
    issueInfo: {
      symbol: "TECHVISTA",
      heading: "TechVista Solutions Limited",
      dataList: [
        {
          title: "Issue Period",
          value: "12-Dec-2024 to 15-Dec-2024"
        },
        {
          title: "Price Range",
          value: "Rs. 250 to Rs. 275 per equity share"
        }
      ]
    }
  }
};