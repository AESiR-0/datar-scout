"use client"

import { scoutDetailsData } from "@/lib/dummy-data/scout-details"
import { useRouter } from "next/navigation"
import { BookmarkButton } from "@/components/bookmark-button"
import { useBookmarks } from "@/lib/context/bookmark-context"
import { daftarsData } from "@/lib/dummy-data/daftars"
import { InvestorProfile } from "@/components/InvestorProfile"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function IncubationPage() {
    const router = useRouter()
    const { showBookmarked, bookmarkedSlugs, toggleBookmark } = useBookmarks()

    const filteredScouts = showBookmarked
        ? scoutDetailsData.filter(scout => bookmarkedSlugs.has(scout.slug))
        : scoutDetailsData

    return (
        <div className="container mx-auto px-5">
            <div className="bg-[#1a1a1a] rounded-[0.35rem] p-6">
                <div className="space-y-4">
                    {filteredScouts.map((scout) => (
                        <div
                            key={scout.slug}
                            className="group border-b border-border last:border-0 last:pb-0"
                        >
                            <div onClick={() => router.push(`/founder/scout/${scout.slug}`)} 
                                className="flex items-center justify-between px-4 py-2 rounded-[0.35rem] transition-all duration-200 hover:bg-muted/40"
                            >
                                <div className="flex-1">
                                    <h3 className="text-medium">{scout.title}</h3>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <div className="flex items-center">
                                            <span className="pr-1">Collaboration: </span>
                                            {scout.collaborators.map((collaborator, index) => (
                                                <span key={collaborator.daftarName} onClick={(e) => e.preventDefault()}>
                                                    {index > 0 && ", "}
                                                    <InvestorProfile investor={collaborator} />
                                                </span>
                                            ))}
                                        </div>
                                        <div>Last Date to Pitch: {scout.lastPitchDate}</div>
                                        <div>Pitched: {daftarsData.find(d => d.id === scout.daftarId)?.pitchCount || 0} Startups</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <BookmarkButton
                                        isBookmarked={bookmarkedSlugs.has(scout.slug)}
                                        onToggle={() => toggleBookmark(scout.slug)}
                                    />
                                    <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}