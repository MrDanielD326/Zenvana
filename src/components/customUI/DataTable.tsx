
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { ArrowRightCircle, Box, ChevronDown, X } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "../ui/badge"

type iLead = {
  id: string
  name: string
  interest: "Hot" | "Warm" | "Cold"
  assignedTo: string
  lastInteraction: string
  followUp: string
}

const defaultLeads: iLead[] = (() => {
  const names = [
    "Jeo Yadav", "Aman Gupta", "Riya Sen", "Neha Kapoor", "Arjun Mehta",
    "Olivia Smith", "Liam Johnson", "Emma Müller", "Noah Dubois", "Sofia Rossi",
    "Hiroshi Tanaka", "Yuna Kim", "Miguel Alvarez", "Isabella Costa", "Fatima Zahra",
    "Alexander Ivanov", "Aisha Khan", "Chloe Brown", "Luca Bianchi", "Amara Okafor"
  ]
  const assignees = ["Jeo Yadav", "Aman Gupta", "Riya Sen", "Neha Kapoor", "Arjun Mehta"]
  const interests: iLead["interest"][] = ["Hot", "Warm", "Cold"]
  const follows = ["New Inquiry", "Need Follow Up", "Engaged", "Converted", "Archived"]

  return names.map((name, i) => ({
    id: String(i + 1),
    name,
    interest: interests[i % interests.length],
    assignedTo: assignees[i % assignees.length],
    lastInteraction: `${30 - i} June 2025`,
    followUp: follows[i % follows.length],
  }))
})()

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 rounded-lg border text-sm text-gray-700 bg-gray-100 flex items-center gap-2">
      {children}
    </div>
  )
}

const icons = {
  hotIcon: "🔥",
  warmIcon: "🌡️",
  coldIcon: "❄️",
  whatappsIcon: (
    <svg width="25px" height="25px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0" />
      <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white" />
      <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5BD066" />
          <stop offset="1" stop-color="#27B43E" />
        </linearGradient>
      </defs>
    </svg>
  ),
  arrowIcon: <ArrowRightCircle />,
  boxIcon: <Box />
}

function InterestBadge({ level }: { level: iLead["interest"] }) {
  const map: Record<iLead["interest"], string> = {
    Hot: "bg-red-100 text-red-700",
    Warm: "bg-yellow-100 text-yellow-700",
    Cold: "bg-blue-100 text-blue-700",
  }
  const icon = level === "Hot" ? icons.hotIcon : level === "Warm" ? icons.warmIcon : icons.coldIcon
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${map[level]}`}>
      <span> {icon} </span>
      {level}
    </span>
  )
}

function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

function getPageList(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | "...")[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  if (left > 2) pages.push("...")
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < total - 1) pages.push("...")
  pages.push(total)
  return pages
}

type iDataTable = {
  data?: iLead[]
  pageSize?: number
}

export function DataTableDemo({ data = defaultLeads, pageSize = 10 }: iDataTable) {
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(0)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [interestFilter, setInterestFilter] = React.useState<Set<iLead["interest"]>>(new Set())
  const [assignedFilter, setAssignedFilter] = React.useState<string | "All">("All")
  const [sortBy, setSortBy] = React.useState<"createdAt" | "name" | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [lastAfter, setLastAfter] = React.useState<Date | null>(null)

  const isMobile = useIsMobile()

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    let out = data.filter((l) => l.name.toLowerCase().includes(q)) // <-- only name
    if (interestFilter.size) out = out.filter((l) => interestFilter.has(l.interest))
    if (assignedFilter !== "All") out = out.filter((l) => l.assignedTo === assignedFilter)
    if (lastAfter) out = out.filter((l) => new Date(l.lastInteraction) >= lastAfter)
    if (sortBy) {
      const dir = sortDir === "asc" ? 1 : -1
      out = [...out].sort((a, b) =>
        sortBy === "name"
          ? a.name.localeCompare(b.name) * dir
          : (new Date(a.lastInteraction).getTime() - new Date(b.lastInteraction).getTime()) * dir
      )
    }
    return out
  }, [data, search, interestFilter, assignedFilter, lastAfter, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const pageItems = paginate(filtered, safePage, pageSize)

  return (
    <div className="w-full">
      <div className="flex w-full gap-4 items-center">
        <Input placeholder="Search" className="flex-1 bg-gray-100" value={search} onChange={(e) => { setPage(1); setSearch(e.target.value) }} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-semibold gap-2 bg-gray-100 text-gray-700">
              Last interaction : {lastAfter ? lastAfter.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Any"} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Last interaction after</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => { setLastAfter(null); setPage(1) }}>Any</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setLastAfter(new Date("2025-06-01")); setPage(1) }}>1 June 2025</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setLastAfter(new Date("2025-07-01")); setPage(1) }}>1 July 2025</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setLastAfter(new Date("2025-07-26")); setPage(1) }}>26 July 2025</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {/* Row 1 */}
        <div className={isMobile ? "w-1/2" : "w-auto"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Chip>
                  <span className="text-gray-600">Interest Level</span>
                  <ChevronDown size={16} />
                </Chip>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by interest</DropdownMenuLabel>
              {(["Hot", "Warm", "Cold"] as const).map((lvl) => (
                <DropdownMenuCheckboxItem
                  key={lvl}
                  checked={interestFilter.has(lvl)}
                  onCheckedChange={(v) => {
                    setPage(1)
                    setInterestFilter((prev) => {
                      const next = new Set(prev)
                      if (v) next.add(lvl)
                      else next.delete(lvl)
                      return next
                    })
                  }}
                >
                  {lvl}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setInterestFilter(new Set())
                  setPage(1)
                }}
              >
                Clear
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className={isMobile ? "w-1/2" : "w-auto"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Chip>
                  <span className="text-gray-600">Assigned to</span>
                  <ChevronDown size={16} />
                </Chip>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Assigned to</DropdownMenuLabel>
              {(["All", ...Array.from(new Set(data.map((d) => d.assignedTo)))] as string[]).map((who) => (
                <DropdownMenuItem
                  key={who}
                  onClick={() => {
                    setAssignedFilter(who as any)
                    setPage(1)
                  }}
                >
                  <span className={who === assignedFilter ? "font-semibold" : ""}>{who}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Row 2 */}
        <div className={isMobile ? "w-1/2" : "w-auto"}>
          <button
            className="w-full px-3 py-2 rounded-lg border text-sm text-gray-700 bg-gray-100 flex items-center gap-2"
            onClick={() => {
              setSortBy("createdAt")
              setSortDir((d) => (d === "asc" ? "desc" : "asc"))
            }}
          >
            <span className="text-gray-600">Created At</span>
            <span className="text-gray-400">{sortBy === "createdAt" ? (sortDir === "asc" ? "↑" : "↓") : "⇵"}</span>
          </button>
        </div>

        <div className={isMobile ? "w-1/2" : "w-auto"}>
          <button
            className="w-full px-3 py-2 rounded-lg border text-sm text-gray-700 bg-gray-100 flex items-center gap-2"
            onClick={() => {
              setSortBy("name")
              setSortDir((d) => (d === "asc" ? "desc" : "asc"))
            }}
          >
            <span className="text-gray-600">Name Alphabetical</span>
            <span className="text-gray-400">{sortBy === "name" ? (sortDir === "asc" ? "↑" : "↓") : "⇵"}</span>
          </button>
        </div>

        {/* Reset Button */}
        <div className="ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearch("")
                  setInterestFilter(new Set())
                  setAssignedFilter("All")
                  setSortBy(null)
                  setLastAfter(null)
                  setSelectedIds(new Set())
                  setPage(1)
                }}
              >
                <X size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {`${selectedIds.size} of ${filtered.length} leads selected`}
      </div>

      <div className="overflow-hidden rounded-md border mt-4 mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] text-center">
                <Checkbox
                  checked={pageItems.length > 0 && pageItems.every((r) => selectedIds.has(r.id))}
                  onCheckedChange={(v) => {
                    setSelectedIds((prev) => {
                      const next = new Set(prev)
                      if (v) pageItems.forEach((r) => next.add(r.id)); else pageItems.forEach((r) => next.delete(r.id))
                      return next
                    })
                  }}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[18%] text-center"> Name </TableHead>
              <TableHead className="w-[16%] text-center"> Interest Level </TableHead>
              <TableHead className="w-[16%] text-center"> Assigned To </TableHead>
              <TableHead className="w-[16%] text-center"> Last Interaction </TableHead>
              <TableHead className="w-[16%] text-center"> Follow Up </TableHead>
              <TableHead className="w-[16%] text-center"> Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((lead) => (
              <TableRow key={lead.id} className="text-center">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selectedIds.has(lead.id)}
                    onCheckedChange={(v) => {
                      setSelectedIds((prev) => {
                        const next = new Set(prev)
                        if (v) next.add(lead.id); else next.delete(lead.id)
                        return next
                      })
                    }}
                    aria-label="Select row"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar> <AvatarFallback> {lead.name[0]} </AvatarFallback> </Avatar>
                    <a className="text-blue-600 hover:underline truncate" title={lead.name}>
                      {lead.name}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="text-center"> <InterestBadge level={lead.interest} /> </TableCell>
                <TableCell className="text-center truncate" title={lead.assignedTo}> {lead.assignedTo} </TableCell>
                <TableCell className="text-center truncate" title={lead.lastInteraction}> {lead.lastInteraction} </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`text-xs font-medium px-3 py-1 rounded-md ${lead.followUp === "New Inquiry" ? "text-blue-700 bg-[#BFDBFE]" :
                        lead.followUp === "Need Follow Up" ? "text-amber-600 bg-[#FDE68A]" :
                          lead.followUp === "Engaged" ? "text-green-700 bg-[#BBF7D0]" :
                            lead.followUp === "Converted" ? "text-purple-700 bg-[#DDD6FE]" :
                              lead.followUp === "Archived" ? "text-gray-700 bg-[#CBD5E1]" : ""
                      }`}
                  >
                    {lead.followUp}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center justify-center gap-3 text-gray-600">
                    <span title="WhatsApp" onClick={() => window.alert(`Open WhatsApp for ${lead.name}`)} className="cursor-pointer">
                      {icons.whatappsIcon}
                    </span>
                    <span title="Action" onClick={() => window.alert(`Open history for ${lead.name}`)} className="cursor-pointer">
                      {icons.arrowIcon}
                    </span>
                    <span title="View" onClick={() => window.alert(`More options for ${lead.name}`)} className="cursor-pointer">
                      {icons.boxIcon}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="ml-auto justify-end gap-3 items-center">
        <div className="flex items-center py-2 text-xs justify-end text-gray-600">
          <span>
            Showing {(safePage - 1) * pageSize + (pageItems.length ? 1 : 0)} to {(safePage - 1) * pageSize + pageItems.length} of {filtered.length} entries
          </span>
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="h-7 px-2 text-xs leading-none" href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }} />
          </PaginationItem>
          {getPageList(safePage, totalPages).map((p, idx) => (
            <PaginationItem key={`${p}-${idx}`}>
              {p === "..." ? <PaginationEllipsis className="size-6" /> : (
                <PaginationLink size="sm" href="#" isActive={p === safePage} onClick={(e) => { e.preventDefault(); setPage(p as number) }} className={p === safePage ? "bg-green-600 text-white rounded-md px-2 h-6 leading-none text-xs" : "h-7 leading-none text-xs"}>
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext className="h-7 px-2 text-xs leading-none" href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)) }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
