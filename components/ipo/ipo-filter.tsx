"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IPOFilterProps {
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function IPOFilter({ onSearchChange, onStatusChange }: IPOFilterProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by company name..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Select onValueChange={onStatusChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All IPOs</SelectItem>
          <SelectItem value="active">Active IPOs</SelectItem>
          <SelectItem value="past">Past IPOs</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}