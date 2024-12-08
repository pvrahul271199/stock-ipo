"use client"

import { Mail } from "lucide-react"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function NewsletterHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="flex gap-2 items-center text-2xl text-black">
        <Mail className="h-6 w-6" />
        Stay Updated!
      </DialogTitle>
      <DialogDescription className="text-base text-gray-600">
        Get the latest updates, tips, and insights delivered straight to your inbox every week.
      </DialogDescription>
    </DialogHeader>
  )
}