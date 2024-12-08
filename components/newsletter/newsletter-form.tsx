"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type FormValues = z.infer<typeof formSchema>

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>
}

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data.email)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  className="h-11 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-11 text-base font-medium bg-black hover:bg-gray-800 text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </form>
    </Form>
  )
}