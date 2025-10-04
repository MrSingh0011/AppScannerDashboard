"use client"

import { Bell, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/contexts/app-context"

export function Header() {
  const { selectedApp } = useApp()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search components, permissions..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="ml-4 flex items-center gap-3 rounded-lg border border-border bg-muted px-3 py-2">
          <div className="text-right">
            <div className="text-sm font-medium">{selectedApp?.appInfo.name || "No App Selected"}</div>
            <div className="text-xs text-muted-foreground">{selectedApp?.appInfo.packageName || ""}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
