"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Shield, Lock, Layers, Package, FileText, ChevronRight } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Permissions", href: "/permissions", icon: Lock },
  { name: "Components", href: "/components", icon: Layers },
  { name: "Dependencies", href: "/dependencies", icon: Package },
  { name: "Report", href: "/report", icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()
  const { apps, selectedApp, setSelectedApp } = useApp()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">App Scanner</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">SELECT APP</label>
          <Select
            value={selectedApp?.id}
            onValueChange={(value) => {
              const app = apps.find((a) => a.id === value)
              if (app) setSelectedApp(app)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {apps.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.appInfo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* {selectedApp && (
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-3">
            <div className="text-xs font-medium text-muted-foreground">CURRENT APP</div>
            <div className="mt-1 text-sm font-semibold">{selectedApp.appInfo.name}</div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">v{selectedApp.appInfo.version}</div>
          </div>
        </div>
      )} */}
    </div>
  )
}
