"use client"

import { IPO, IPODetails, IPOSizeDetails } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchIPODetails } from "@/lib/api"
import { getIPODetailsCookiesForNSE } from "@/actions/ipodetailsapi"

interface IPODetailsProps {
  ipo: IPO;
}

export function IPODetails({ ipo }: IPODetailsProps) {
  const [nseDetails, setNseDetails] = useState<IPODetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [issueSizeDetails, setIssueSizeDetails] = useState<IPOSizeDetails | null>(null);

  useEffect(() => {
    async function loadNSEDetails() {
      if (ipo.symbol && ipo.series) {
        setIsLoading(true);
        try {
          const details = await getIPODetailsCookiesForNSE(ipo.symbol, ipo.series);
          setNseDetails(details);
          console.log("nseDetails set variable", details);
        } catch (error) {
          console.error('Failed to load NSE details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadNSEDetails();
  }, [ipo.symbol, ipo.series]);

  const extractDetails = (text: any) => {
    const freshIssueMatch = text ? text.match(/Fresh issue upto ([\d,]+)/) : null;
    const offerForSaleMatch = text ? text.match(/Offer for Sale Up to ([\d,]+)/) : null;
    const freshIssue = freshIssueMatch ? parseInt(freshIssueMatch[1].replace(/,/g, '')) : 0;
    const offerForSale = offerForSaleMatch ? parseInt(offerForSaleMatch[1].replace(/,/g, '')) : 0;

    return {
      freshIssue: freshIssue,
      offerForSale: offerForSale,
      totalIssueSize: freshIssue + offerForSale,
      totalIssueAmount: 0
    };
  };

  const extractPrice = (text: any) => {
    const ipoLowerBand = text ? text.match(/Rs. ([\d.]+) to/) : null;
    const ipoUpperBand = text ? text.match(/to Rs. ([\d.]+) per equity share/) : null;
    const lowerBand = ipoLowerBand ? parseFloat(ipoLowerBand[1]) : 0;
    const upperBand = ipoUpperBand ? parseFloat(ipoUpperBand[1]) : 0;

    return {
      lowerBand: lowerBand,
      upperBand: upperBand
    };

  };

  useEffect(() => {
    if (nseDetails?.issueInfo.dataList[4].value) {
      const details = extractDetails(nseDetails.issueInfo.dataList[4].value);
      const price = extractPrice(nseDetails.issueInfo.dataList[6].value);
      details.totalIssueAmount = details.totalIssueSize * (price.upperBand);
      setIssueSizeDetails({
        ...details,
        lowerBand: price.lowerBand,
        upperBand: price.upperBand
      });
    }
  }, [nseDetails]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">{ipo.companyName}</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          {ipo.symbol} • Issue Size: {issueSizeDetails ? issueSizeDetails.totalIssueSize.toLocaleString() : 'N/A'} shares
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="nseDetails">NSE Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Price Range</p>
                    <p className="text-sm text-muted-foreground">{nseDetails?.issueInfo.dataList[6].value}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium">Price Upper</p>
                    <p className="text-sm text-muted-foreground">{issueSizeDetails?.upperBand}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Price Lower Range</p>
                    <p className="text-sm text-muted-foreground">{issueSizeDetails?.lowerBand}</p>
                  </div> */}
                  <div>
                    <p className="text-sm font-medium">Total Issue Size</p>
                    <p className="text-sm text-muted-foreground">Rs {issueSizeDetails?.totalIssueAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Face Value</p>
                    <p className="text-sm text-muted-foreground">{nseDetails?.issueInfo.dataList[7].value}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Minimum Order Quantity</p>
                    <p className="text-sm text-muted-foreground">{nseDetails?.issueInfo.dataList[10].value} </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Minimum Lot Size</p>
                    <p className="text-sm text-muted-foreground">{issueSizeDetails?.upperBand ? (parseFloat(nseDetails?.issueInfo.dataList[10].value.match(/([\d.]+) Equity Shares/)?.[1] || '0') * issueSizeDetails.upperBand).toLocaleString() : 'N/A'} </p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium">Maximum Order</p>
                    <p className="text-sm text-muted-foreground">{nseDetails?.issueInfo.dataList[13].value} lots</p>
                  </div> */}
                  <div>
                    <p className="text-sm font-medium">Fresh Issue</p>
                    <p className="text-sm text-muted-foreground">{issueSizeDetails?.freshIssue.toLocaleString()} Shares ({issueSizeDetails ? ((issueSizeDetails.freshIssue / issueSizeDetails.totalIssueSize) * 100).toFixed(2) : 'N/A'}% of total Issue)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Offer for Sale</p>
                    <p className="text-sm text-muted-foreground"> {issueSizeDetails?.offerForSale.toLocaleString()} Shares ({issueSizeDetails ? ((issueSizeDetails.offerForSale / issueSizeDetails.totalIssueSize) * 100).toFixed(2) : 'N/A'}% of total Issue)</p>
                 
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Issue Opens</p>
                  <p className="text-sm text-muted-foreground">{ipo.issueStartDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Issue Closes</p>
                  <p className="text-sm text-muted-foreground">{ipo.issueEndDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Category-wise Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ipo.subscriptionDetails?.map((detail, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{detail.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {detail.subscription}x subscribed
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(detail.subscription * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Offered: {detail.offered.toLocaleString()}</span>
                      <span>Bids: {detail.bids.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nseDetails">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          ) : nseDetails ? (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>NSE Bid Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Category</th>
                          <th className="text-right p-2">Applications</th>
                          <th className="text-right p-2">Shares Bid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nseDetails.bidDetails.map((detail, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{detail.category}</td>
                            <td className="text-right p-2">{parseInt(detail.noofapplication).toLocaleString()}</td>
                            <td className="text-right p-2">{parseInt(detail.noOfshareBid).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Issue Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nseDetails.issueInfo.dataList.map((item, index) => (
                      item.title && (
                        <div key={index}>
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1" 
                             dangerouslySetInnerHTML={{ __html: item.value }}></p>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No NSE details available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Important Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {ipo.documents?.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    className="flex items-center p-3 rounded-lg border hover:bg-accent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="text-sm">{doc.name}</span>
                    <Download className="h-4 w-4 ml-auto" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}