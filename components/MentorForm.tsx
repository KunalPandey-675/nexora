"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { createMentor } from "@/lib/actions/mentor.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
  "other",
];
const formSchema = z.object({
  name: z.string().min(2, { message: "Mentor name is required." }).max(50),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.coerce.number().min(1, { message: "Duration must be at least 1 minute." })
})
type FormValues = z.infer<typeof formSchema>
const MentorForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 20,
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      const mentor = await createMentor(data);
      if(mentor){
        toast.success("Mentor created successfully! Redirecting...")
        setTimeout(() => {
          router.push(`/mentor/${mentor.id}`)
        }, 1000)
      } else {
        toast.error("Failed to create mentor. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mentor name</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="e.g., Jane Doe"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject area</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}

                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select a subject (e.g., Mathematics)" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem value={subject} key={subject} className="capitalize">{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic / Learning goal</FormLabel>
              <FormControl>
                <Textarea
                  className="input"
                  placeholder="Describe the topic or goal (e.g., 'Solve quadratic equations'). If 'Other', please specify the subject."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue
                      placeholder="Select the voice"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      Male
                    </SelectItem>
                    <SelectItem value="female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teaching Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue
                      placeholder="Select the style"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">
                      Formal
                    </SelectItem>
                    <SelectItem value="casual">
                      Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="input"
                  placeholder="e.g., 20"
                  min={1}
                  step={1}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer bg-cta text-white hover:bg-cta/90 rounded-xl shadow-[0_2px_8px_rgba(26,26,46,0.1)] hover:shadow-[0_4px_12px_rgba(26,26,46,0.15)] transition-all duration-300 font-medium" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating mentor...
            </>
          ) : (
            "Create Mentor"
          )}
        </Button>
      </form>
    </Form>
  )
}

export default MentorForm
