"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BidDetailsTableProps {
  bidDetails: {
    category: string
    subCategory?: string
    applications: number
    sharesBidFor: number
  }[]
}

export function BidDetailsTable({ bidDetails }: BidDetailsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Bid Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Applications</TableHead>
                  <TableHead className="text-right">Shares Bid For</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bidDetails?.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {detail.subCategory ? (
                        <span className="ml-4 text-muted-foreground">
                          {detail.subCategory}
                        </span>
                      ) : (
                        detail.category
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {detail.applications.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {detail.sharesBidFor.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}