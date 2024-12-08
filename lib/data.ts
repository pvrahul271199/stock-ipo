import { IPO, UpcomingIPO } from './types';

export const sampleUpcomingIPOs: UpcomingIPO[] = [
    {
      symbol: 'PURPLEUTED',
      companyName: 'Purple United Sales Limited',
      issueStartDate: '11-Dec-2024',
      issueEndDate: '13-Dec-2024',
      issueSize: '2604000',
      issuePrice: 'Rs.121 to Rs.126',
      lotSize: '1000',
      priceBand: 'Rs.121 to Rs.126',
      series: 'SME',
      status: 'Forthcoming',
      sr_no: 1
    },
    {
      symbol: 'DHANLAXMI',
      companyName: 'Dhanlaxmi Crop Science Limited',
      issueStartDate: '09-Dec-2024',
      issueEndDate: '11-Dec-2024',
      issueSize: '3170000',
      issuePrice: 'Rs.52 to Rs.55',
      lotSize: '2000',
      priceBand: 'Rs.52 to Rs.55',
      series: 'SME',
      status: 'Forthcoming',
      sr_no: 2
    }
]

export const sampleIPOs: IPO[] = [
  {
    id: '1',
    companyName: 'Emerald Tyre Manufacturers Limited',
    securityType: 'Equity Shares',
    issueStartDate: '2024-04-15',
    issueEndDate: '2024-04-18',
    status: 'Active',
    priceRange: '₹475 - ₹500',
    faceValue: '₹10',
    issueSize: '₹2,500 Cr',
    bidLot: 30,
    maximumOrder: 14,
    symbol: 'ETML',
    series: 'SME',
    subscriptionDetails: [
      {
        category: 'QIB',
        offered: 12500000,
        bids: 15000000,
        subscription: 1.2
      },
      {
        category: 'NII',
        offered: 3750000,
        bids: 5625000,
        subscription: 1.5
      },
      {
        category: 'Retail',
        offered: 8750000,
        bids: 13125000,
        subscription: 1.5
      }
    ],
    bidDetails: [
      {
        category: 'Qualified Institutional Buyers(QIBs)',
        applications: 4,
        sharesBidFor: 511200
      },
      {
        category: 'Non Institutional Investors',
        applications: 6472,
        sharesBidFor: 31302000
      },
      {
        category: 'Retail Individual Investors(RIIs)',
        applications: 96057,
        sharesBidFor: 115268400
      }
    ],
    leadManagers: [
      'Axis Capital Limited',
      'ICICI Securities Limited'
    ],
    registrar: 'Link Intime India Pvt Ltd',
    documents: [
      {
        name: 'Red Herring Prospectus',
        url: '#'
      },
      {
        name: 'Sample Forms',
        url: '#'
      }
    ]
  },
  {
    id: '2',
    companyName: 'TechVista Solutions Limited',
    securityType: 'Equity Shares',
    issueStartDate: '2024-03-01',
    issueEndDate: '2024-03-05',
    status: 'Active',
    priceRange: '₹350 - ₹375',
    faceValue: '₹10',
    issueSize: '₹1,800 Cr',
    bidLot: 40,
    maximumOrder: 13,
    symbol: 'TECHVISTA',
    series: 'EQ',
    subscriptionDetails: [
      {
        category: 'QIB',
        offered: 9000000,
        bids: 12600000,
        subscription: 1.4
      },
      {
        category: 'NII',
        offered: 2700000,
        bids: 4320000,
        subscription: 1.6
      },
      {
        category: 'Retail',
        offered: 6300000,
        bids: 9450000,
        subscription: 1.5
      }
    ],
    bidDetails: [
      {
        category: 'Qualified Institutional Buyers(QIBs)',
        applications: 6,
        sharesBidFor: 720000
      },
      {
        category: 'Non Institutional Investors',
        applications: 5280,
        sharesBidFor: 25344000
      },
      {
        category: 'Retail Individual Investors(RIIs)',
        applications: 82450,
        sharesBidFor: 98940000
      }
    ],
    leadManagers: [
      'Kotak Investment Banking',
      'Morgan Stanley India'
    ],
    registrar: 'KFin Technologies Limited',
    documents: [
      {
        name: 'Red Herring Prospectus',
        url: '#'
      },
      {
        name: 'Sample Forms',
        url: '#'
      }
    ]
  },
  // Past IPOs
  {
    id: '3',
    companyName: 'InnovateX Technologies',
    securityType: 'Equity Shares',
    issueStartDate: '2024-01-15',
    issueEndDate: '2024-01-18',
    status: 'Past',
    priceRange: '₹280 - ₹295',
    faceValue: '₹10',
    issueSize: '₹1,200 Cr',
    bidLot: 50,
    maximumOrder: 15,
    symbol: 'INNOVATEX',
    series: 'EQ',
    subscriptionDetails: [
      {
        category: 'QIB',
        offered: 6000000,
        bids: 9600000,
        subscription: 1.6
      },
      {
        category: 'NII',
        offered: 1800000,
        bids: 3240000,
        subscription: 1.8
      },
      {
        category: 'Retail',
        offered: 4200000,
        bids: 7140000,
        subscription: 1.7
      }
    ],
    bidDetails: [
      {
        category: 'Qualified Institutional Buyers(QIBs)',
        applications: 8,
        sharesBidFor: 960000
      },
      {
        category: 'Non Institutional Investors',
        applications: 4200,
        sharesBidFor: 20160000
      },
      {
        category: 'Retail Individual Investors(RIIs)',
        applications: 75000,
        sharesBidFor: 90000000
      }
    ],
    leadManagers: [
      'Goldman Sachs India',
      'JP Morgan India'
    ],
    registrar: 'KFin Technologies Limited',
    documents: [
      {
        name: 'Red Herring Prospectus',
        url: '#'
      },
      {
        name: 'Sample Forms',
        url: '#'
      }
    ]
  },
  {
    id: '4',
    companyName: 'GreenEnergy Solutions',
    securityType: 'Equity Shares',
    issueStartDate: '2024-02-01',
    issueEndDate: '2024-02-03',
    status: 'Past',
    priceRange: '₹425 - ₹450',
    faceValue: '₹10',
    issueSize: '₹2,800 Cr',
    bidLot: 35,
    maximumOrder: 12,
    symbol: 'GREENENERGY',
    series: 'EQ',
    subscriptionDetails: [
      {
        category: 'QIB',
        offered: 14000000,
        bids: 19600000,
        subscription: 1.4
      },
      {
        category: 'NII',
        offered: 4200000,
        bids: 6720000,
        subscription: 1.6
      },
      {
        category: 'Retail',
        offered: 9800000,
        bids: 15680000,
        subscription: 1.6
      }
    ],
    bidDetails: [
      {
        category: 'Qualified Institutional Buyers(QIBs)',
        applications: 12,
        sharesBidFor: 1440000
      },
      {
        category: 'Non Institutional Investors',
        applications: 6300,
        sharesBidFor: 30240000
      },
      {
        category: 'Retail Individual Investors(RIIs)',
        applications: 98000,
        sharesBidFor: 117600000
      }
    ],
    leadManagers: [
      'SBI Capital Markets',
      'Axis Capital Limited'
    ],
    registrar: 'Link Intime India Pvt Ltd',
    documents: [
      {
        name: 'Red Herring Prospectus',
        url: '#'
      },
      {
        name: 'Sample Forms',
        url: '#'
      }
    ]
  }
];