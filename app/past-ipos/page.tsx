"use client"

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Building2, LineChart, Menu, Users, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { IPOList } from '@/components/ipo/ipo-list'
import { IPODetails } from '@/components/ipo/ipo-details'
import { SubscriptionChart } from '@/components/ipo/subscription-chart'
import { BidDetailsTable } from '@/components/ipo/bid-details-table'
import { sampleIPOs } from '@/lib/data'
import { IPO } from '@/lib/types'
import { getCookiesForNSE } from '@/actions/nseapi'
import { Navbar } from '@/components/layout/navbar'
import { getCookiesForUpcomingIPOSNSE } from '@/actions/upcomingipos'
import { getCookiesForPastIPOSNSE } from '@/actions/pastipos'

export default function Home() {
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(sampleIPOs[0])
  const [activeIpo, setActiveIpo] = useState<any>([])
  const [activeTab, setActiveTab] = useState('active')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [displayedIPOs, setDisplayedIPOs] = useState(sampleIPOs.filter(ipo => ipo.status === 'Active'))

  useEffect(() => {
    async function fetchIpo() {
      try {
        const response = await getCookiesForPastIPOSNSE();
        console.log("response from NSE past ipo", response);
        setActiveIpo(response)
        setDisplayedIPOs(response)
        setSelectedIPO(response[0])
      } catch (error) {
        console.log("fetching failed", error)
      }
    }
    fetchIpo()
  }, [])

  // const totalSubscription = displayedIPOs.reduce((acc, ipo) => 
  //   acc + ipo.subscriptionDetails.reduce((sum, detail) => sum + detail.subscription, 0) / ipo.subscriptionDetails.length, 
  //   0
  // )

  const averageSubscription = 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <Navbar />
      <div className="flex">
        {/* Mobile Sidebar Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Left Sidebar - Desktop */}
        <div className="hidden md:flex w-80 border-r bg-card/50 backdrop-blur-sm p-6 flex-shrink-0 min-h-[calc(100vh-3.5rem)]">
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            displayedIPOs={displayedIPOs}
            selectedIPO={selectedIPO}
            setSelectedIPO={setSelectedIPO}
          />
        </div>

        {/* Left Sidebar - Mobile */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-80 p-6">
            <SheetHeader className="mb-8">
              <SheetTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                IPO Dashboard
              </SheetTitle>
            </SheetHeader>
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              displayedIPOs={displayedIPOs}
              selectedIPO={selectedIPO}
              setSelectedIPO={(ipo) => {
                setSelectedIPO(ipo)
                setSidebarOpen(false)
              }}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {activeTab === 'active' ? 'Active IPOs' : 'Past IPOs'}
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{displayedIPOs?.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Subscription</CardTitle>
                  <LineChart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {averageSubscription.toFixed(2)}x
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14.2K</div>
                </CardContent>
              </Card>
            </div>

            {/* IPO Details with Charts */}
            {selectedIPO && (
              <div className="space-y-6">
                <IPODetails ipo={selectedIPO} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarContent({
  activeTab,
  setActiveTab,
  displayedIPOs,
  selectedIPO,
  setSelectedIPO,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
  displayedIPOs: IPO[]
  selectedIPO: IPO | null
  setSelectedIPO: Dispatch<SetStateAction<IPO | null>>
}) {
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center gap-2 mb-8">
        <Building2 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">IPO Dashboard</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active IPOs</TabsTrigger>
          <TabsTrigger value="past">Past IPOs</TabsTrigger>
        </TabsList>
      </Tabs>

      <IPOList 
        ipos={displayedIPOs}
        selectedIPO={selectedIPO}
        onSelectIPO={setSelectedIPO}
      />
    </div>
  )
}