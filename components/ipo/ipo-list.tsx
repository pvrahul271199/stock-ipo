"use client"

import { cn } from "@/lib/utils"
import { IPO } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarArrowDown, CalendarCheck2Icon, CalendarClock, CalendarCog, CalendarDays, CalendarFold, CalendarHeartIcon, CalendarMinusIcon, CalendarSearch, CalendarX2, LineChart, LucideCalendarRange, TrendingUp, Users } from "lucide-react"

interface IPOListProps {
  ipos: IPO[]
  selectedIPO: IPO | null
  onSelectIPO: (ipo: IPO) => void
}

export function IPOList({ ipos, selectedIPO, onSelectIPO }: IPOListProps) {
  return (
    <div className="space-y-4">
      {ipos.map((ipo) => (
        <Card
          key={ipo.id}
          className={cn(
            "cursor-pointer transition-all hover:bg-accent hover:shadow-md",
            selectedIPO?.id === ipo.id && "border-primary bg-accent/50"
          )}
          onClick={() => onSelectIPO(ipo)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium truncate flex-1">{ipo.companyName}</h3>
              <Badge 
                variant={ipo.status === 'Active' ? "default" : "secondary"}
                className="ml-2 shrink-0"
              >
                {ipo.series}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                <span>{ipo.symbol}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(ipo.issueStartDate).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{ipo.noOfTime} x</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarFold className="h-4 w-4" />
               <span> {new Date(ipo.issueEndDate).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}