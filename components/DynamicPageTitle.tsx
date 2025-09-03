"use client"

import { usePathname } from "next/navigation"
import { getPageTitle } from "@/lib/navigation-data"

export function DynamicPageTitle() {
    const pathname = usePathname()
    const title = getPageTitle(pathname)

    return (
        <h1 className="text-lg font-semibold">{title}</h1>
    )
} 