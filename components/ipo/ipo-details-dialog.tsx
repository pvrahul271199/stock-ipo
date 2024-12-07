"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Building2, Users } from "lucide-react"
import { IPO } from "@/lib/types"

interface IPODetailsDialogProps {
  ipo: IPO | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IPODetailsDialog({ ipo, open, onOpenChange }: IPODetailsDialogProps) {
  if (!ipo) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{ipo.companyName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-100px)]">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Issue Period</p>
                      <p className="text-sm text-muted-foreground">
                        {ipo.issueStartDate} to {ipo.issueEndDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Price Range</p>
                      <p className="text-sm text-muted-foreground">{ipo.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Face Value</p>
                      <p className="text-sm text-muted-foreground">{ipo.faceValue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Issue Size</p>
                      <p className="text-sm text-muted-foreground">{ipo.issueSize}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ipo.subscriptionDetails.map((detail, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{detail.category}</span>
                          <span className="text-sm text-muted-foreground">
                            {detail.subscription}x
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${Math.min(detail.subscription * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Lead Managers</h4>
                    <ul className="space-y-2">
                      {ipo.leadManagers.map((manager, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {manager}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Registrar</h4>
                    <p className="text-sm text-muted-foreground">{ipo.registrar}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {ipo.documents.map((doc, index) => (
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}