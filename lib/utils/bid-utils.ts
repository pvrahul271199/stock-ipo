import { NSEBidDetail, BidCategory, ProcessedBidData } from '../types';

export function processBidData(bidDetails: NSEBidDetail[]): ProcessedBidData {
  const mainCategories: BidCategory[] = [];
  let total = {
    noOfshareBid: "0",
    noofapplication: "0"
  };

  // Group by main categories
  bidDetails.forEach(bid => {
    if (!bid.srNo) {
      total = {
        noOfshareBid: bid.noOfshareBid,
        noofapplication: bid.noofapplication
      };
      return;
    }

    // Check if it's a main category (single digit srNo)
    if (!bid.srNo.includes('(')) {
      mainCategories.push({
        ...bid,
        subCategories: []
      });
    } else {
      // It's a subcategory
      const mainCategoryIndex = mainCategories.length - 1;
      if (mainCategoryIndex !== -1 && mainCategories[mainCategoryIndex].subCategories) {
        mainCategories[mainCategoryIndex].subCategories?.push(bid);
      }
    }
  });

  return {
    mainCategories: mainCategories.filter(cat => 
      parseInt(cat.noOfshareBid) > 0 || 
      cat.subCategories?.some(sub => parseInt(sub.noOfshareBid) > 0)
    ),
    total
  };
}

export function formatNumber(value: string): string {
  const num = parseInt(value);
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  }
  return num.toLocaleString();
}

export function calculateSubscriptionRatio(bid: string, offered: number): number {
  return offered ? parseInt(bid) / offered : 0;
}