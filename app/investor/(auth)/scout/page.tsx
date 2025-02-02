"use client"
import { useSearch } from "@/lib/context/search-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { BarChart2 } from "lucide-react"
import { InsightsDialog } from "@/components/dialogs/insights-dialog"

const scouttatus = {
  planning: [
    {
      title: "Green Energy Initiative",
      postedby: "John Doe",
      status: "Planning",
    },
    {
      title: "Healthcare Tech Fund",
      postedby: "Sarah Johnson",
      status: "Planning",
    },
  ],
  scheduled: [
    {
      title: "AI Ventures",
      postedby: "John Doe",
      status: "Scheduled",
    },
  ],
  open: [
    {
      title: "Tech Startup Fund",
      postedby: "John Doe",
      status: "Open",
    },
    {
      title: "Real Estate Growth",
      postedby: "John Doe",
      status: "Open",
    },
  ],
  closed: [
    {
      title: "Fintech Innovation",
      postedby: "John Doe",
      status: "Closed",
    },
  ],
}

export default function scoutPage() {
  const { searchQuery, filterValue } = useSearch()
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [studioOpen, setStudioOpen] = useState(false)

  // Filter scout based on search query and filter value
  const filteredscout = Object.entries(scouttatus).reduce((acc, [key, scout]) => {
    const filtered = scout.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.postedby.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterValue === 'all' || program.status.toLowerCase() === filterValue.toLowerCase()
      return matchesSearch && matchesFilter
    })
    return { ...acc, [key]: filtered }
  }, {} as typeof scouttatus)

  return (
    <div className="space-y-6 max-w-7xl container mx-auto">
      <div className="flex items-center justify-end gap-2">
        <Link href="/studio/details">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white h-9"
          >
            New Scout
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setInsightsOpen(true)}
          className="h-9 border-border hover:bg-muted"
        >
          <BarChart2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {Object.entries(filteredscout).map(([status, scout]) => (
          <div
            key={status}
            className="bg-[#0e0e0e] rounded-lg p-4 min-h-[calc(100vh-12rem)] border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold capitalize text-foreground">{status}</h2>
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  {scout.length}
                </Badge>
              </div>
            </div>

            <div className="space-y-5">
              {scout.map((program) => (
                <Link
                  key={program.title}
                  href={`/investor/scout/${program.title.toLowerCase().replace(/ /g, '-')}`}
                >
                  <div className="p-4 m-2 rounded-[0.3rem] hover:border-blue-500 hover:border   bg-[#1f1f1f] transition-colors">
                    <h3 className="font-medium text-sm text-foreground">{program.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program.postedby}</p>
                  </div>
                </Link>
              ))}

              {scout.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground bg-background/5 rounded-[0.3rem] border border-border">
                  No scout in {status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <InsightsDialog
        open={insightsOpen}
        onOpenChange={setInsightsOpen}
      />
    </div>
  )
} 
