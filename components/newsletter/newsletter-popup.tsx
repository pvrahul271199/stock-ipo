"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NewsletterHeader } from "./newsletter-header"
import { NewsletterForm } from "./newsletter-form"
import { subscribeToNewsletter } from "@/lib/newsletter"

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 2000) // Show popup 2 seconds after component mounts

    return () => clearTimeout(timer)
  }, [])

  async function onSubmit(email: string) {
    try {
    //   await subscribeToNewsletter(email)
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        className: "bg-black text-white border-gray-800",
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white border-gray-200">
        <NewsletterHeader />
        <NewsletterForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}