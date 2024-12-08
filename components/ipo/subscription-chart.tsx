"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BidCategory, IPODetails } from '@/lib/types'
import { formatNumber, calculateSubscriptionRatio } from '@/lib/utils/bid-utils'
import { useEffect, useState } from 'react'
import { IPO, IPOSizeDetails } from "@/lib/types"
import { getIPODetailsCookiesForNSE } from "@/actions/ipodetailsapi"

interface SubscriptionChartProps {
  data: BidCategory[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
]

export function SubscriptionChart({ ipo }: any) {
  const [nseDetails, setNseDetails] = useState<IPODetails | null>(null);

  useEffect(() => {
    async function loadNSEDetailsForSubscription() {
      if (ipo?.symbol && ipo?.series) {
        try {
          const details = await getIPODetailsCookiesForNSE(ipo.symbol, ipo.series);
          setNseDetails(details);
          console.log("nseDetails set variable for chart", details);
        } catch (error) {
          console.error('Failed to load NSE details for chart:', error);
        }
      }
    }

    loadNSEDetailsForSubscription();
  }, [ipo?.symbol, ipo?.series]);

  const chartData = nseDetails?.bidDetails.map(item => ({
    name: item.category,
    value: parseInt(item.noOfshareBid),
    applications: item.noofapplication,
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const subscriptionRatio = calculateSubscriptionRatio(data.value.toString(), data.offered);
      
      return (
        <div className="subscription-tooltip">
          <p className="font-medium mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Shares Bid:</span>{' '}
              <span className="font-medium">{formatNumber(data.value.toString())}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Applications:</span>{' '}
              <span className="font-medium">{formatNumber(data.applications)}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Subscription:</span>{' '}
              <span className="font-medium">{subscriptionRatio.toFixed(2)}x</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Category-wise Subscription Chart</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 hover:opacity-80"
                    name={entry.name}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="text-sm">{value}</span>}
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
