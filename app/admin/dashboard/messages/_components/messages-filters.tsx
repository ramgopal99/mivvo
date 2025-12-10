import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, RefreshCw } from "lucide-react"

interface MessagesFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterChange: (value: string) => void
  activeTab: string
  onRefresh: () => void
  totalCount: number
  filteredCount: number
}

export function MessagesFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  activeTab,
  onRefresh,
  totalCount,
  filteredCount
}: MessagesFiltersProps) {
  const clearFilters = () => {
    onSearchChange("")
    onFilterChange("all")
  }

  const hasActiveFilters = searchTerm || filterStatus !== "all"

  return (
    <div className="space-y-4">
      {/* Search and Filter Row */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${activeTab === 'contact' ? 'contact messages' : activeTab === 'support' ? 'support tickets' : 'feedback'}...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {activeTab === 'contact' ? 'Messages' : activeTab === 'support' ? 'Tickets' : 'Feedback'}</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            {activeTab === 'support' && (
              <>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onRefresh} className="shrink-0">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="shrink-0">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Total:</span>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">{totalCount}</Badge>
          </div>

          {filteredCount !== totalCount && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filtered:</span>
              <Badge variant="outline" className="border-gray-300 text-gray-700">{filteredCount}</Badge>
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">Search: "{searchTerm}"</Badge>}
              {filterStatus !== "all" && <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">Status: {filterStatus}</Badge>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
