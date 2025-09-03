"use client"

import * as React from "react"
import { Search, Video, Settings, Home, User, Palette } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Types for search functionality
export interface SearchResult {
    id: string
    title: string
    description: string
    type: 'interview' | 'assistant' | 'setting' | 'page'
    url: string
    icon: React.ComponentType<{ className?: string }>
    category?: string
}

export interface SearchDialogProps {
    children: React.ReactNode
    onSearch?: (query: string) => Promise<SearchResult[]>
    recentSearches?: string[]
    onRecentSearchClick?: (search: string) => void
}

export function SearchDialog({ 
    children, 
    onSearch,
    recentSearches = [],
    onRecentSearchClick 
}: SearchDialogProps) {
    const router = useRouter()
    const [searchOpen, setSearchOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = React.useState(false)

    // Default search results for demo
    const defaultSearchResults: SearchResult[] = [
        {
            id: 'mock-interviews',
            title: 'Mock Interviews',
            description: 'Practice with AI-powered mock interviews',
            type: 'page',
            url: '/dashboard/meet',
            icon: Video,
            category: 'Navigation'
        },
        {
            id: 'settings',
            title: 'Settings',
            description: 'Manage your account and preferences',
            type: 'page',
            url: '/dashboard/settings',
            icon: Settings,
            category: 'Navigation'
        },
        {
            id: 'dashboard',
            title: 'Dashboard',
            description: 'View your overview and statistics',
            type: 'page',
            url: '/dashboard',
            icon: Home,
            category: 'Navigation'
        },
        {
            id: 'software-engineer-interview',
            title: 'Software Engineer Interview',
            description: 'Practice coding challenges and system design',
            type: 'interview',
            url: '/dashboard/meet/software-engineer',
            icon: Video,
            category: 'Interview Type'
        },
        {
            id: 'product-manager-interview',
            title: 'Product Manager Interview',
            description: 'Case studies and behavioral questions',
            type: 'interview',
            url: '/dashboard/meet/product-manager',
            icon: Video,
            category: 'Interview Type'
        },
        {
            id: 'data-scientist-interview',
            title: 'Data Scientist Interview',
            description: 'Machine learning and statistics problems',
            type: 'interview',
            url: '/dashboard/meet/data-scientist',
            icon: Video,
            category: 'Interview Type'
        },
        // Settings page content
        {
            id: 'my-details',
            title: 'My Details',
            description: 'Update your personal information and contact details',
            type: 'setting',
            url: '/dashboard/settings',
            icon: User,
            category: 'Settings'
        },
        {
            id: 'profile',
            title: 'Profile',
            description: 'Manage your profile picture and account information',
            type: 'setting',
            url: '/dashboard/profile',
            icon: User,
            category: 'Settings'
        },
        {
            id: 'settings',
            title: 'Settings',
            description: 'Configure your account and preferences',
            type: 'setting',
            url: '/dashboard/settings',
            icon: Settings,
            category: 'Settings'
        },
        {
            id: 'appearance',
            title: 'Appearance',
            description: 'Customize your theme and display preferences',
            type: 'setting',
            url: '/dashboard/settings',
            icon: Palette,
            category: 'Settings'
        },

    ]

    // Handle search input changes
    const handleSearchChange = React.useCallback(async (query: string) => {
        setSearchQuery(query)
        
        if (!query.trim()) {
            setSearchResults([])
            return
        }

        setIsSearching(true)
        
        try {
            if (onSearch) {
                // Use custom search function if provided
                const results = await onSearch(query)
                setSearchResults(results)
            } else {
                // Use default search logic
                const filtered = defaultSearchResults.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase()) ||
                    item.category?.toLowerCase().includes(query.toLowerCase())
                )
                setSearchResults(filtered)
            }
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }, [onSearch])

    // Handle result selection
    const handleResultClick = (result: SearchResult) => {
        router.push(result.url)
        setSearchOpen(false)
        setSearchQuery("")
        setSearchResults([])
    }

    // Handle recent search click
    const handleRecentSearchClick = (search: string) => {
        setSearchQuery(search)
        handleSearchChange(search)
        if (onRecentSearchClick) {
            onRecentSearchClick(search)
        }
    }

    // Handle dialog close
    const handleDialogClose = (open: boolean) => {
        setSearchOpen(open)
        if (!open) {
            setSearchQuery("")
            setSearchResults([])
        }
    }

    return (
        <Dialog open={searchOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                        Search across all your interviews, assistants, and settings.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search interviews, assistants, settings..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9"
                            autoFocus
                        />
                    </div>
                    
                    {isSearching && (
                        <div className="text-sm text-muted-foreground text-center py-4">
                            Searching...
                        </div>
                    )}
                    
                    {searchQuery && searchResults.length > 0 && !isSearching && (
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-muted-foreground">
                                Search Results
                            </div>
                            <div className="space-y-1 max-h-64 overflow-y-auto">
                                {searchResults.map((result) => (
                                    <button
                                        key={result.id}
                                        className="w-full text-left p-3 rounded-md hover:bg-muted transition-colors"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <result.icon className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{result.title}</div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {result.description}
                                                </div>
                                            </div>
                                            {result.category && (
                                                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                    {result.category}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {searchQuery && searchResults.length === 0 && !isSearching && (
                        <div className="text-sm text-muted-foreground text-center py-4">
                            No results found for &quot;{searchQuery}&quot;
                        </div>
                    )}
                    
                    {!searchQuery && (
                        <div className="space-y-4">
                            <div className="text-sm font-medium text-muted-foreground">
                                Recent Searches
                            </div>
                            <div className="space-y-1">
                                {recentSearches.length > 0 ? (
                                    recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground"
                                            onClick={() => handleRecentSearchClick(search)}
                                        >
                                            {search}
                                        </button>
                                    ))
                                ) : (
                                    <>
                                        <button 
                                            className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground"
                                            onClick={() => handleRecentSearchClick("Software Engineer Interview")}
                                        >
                                            Software Engineer Interview
                                        </button>
                                        <button 
                                            className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground"
                                            onClick={() => handleRecentSearchClick("Product Manager Practice")}
                                        >
                                            Product Manager Practice
                                        </button>
                                        <button 
                                            className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground"
                                            onClick={() => handleRecentSearchClick("Data Scientist Questions")}
                                        >
                                            Data Scientist Questions
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 