"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function DependenciesPage() {
  const { selectedApp } = useApp()
  const [search, setSearch] = useState("")

  if (!selectedApp) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No app selected</p>
        </div>
      </DashboardLayout>
    )
  }

  const filteredDependencies = selectedApp.dependencies.filter((dep) =>
    dep.name.toLowerCase().includes(search.toLowerCase()),
  )

  const totalVulnerabilities = selectedApp.dependencies.reduce((sum, dep) => sum + dep.vulnerabilities, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dependencies</h1>
          <p className="text-muted-foreground">Libraries and packages used by the application</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Total Libraries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{selectedApp.dependencies.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                With Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-500">
                {selectedApp.dependencies.filter((d) => d.vulnerabilities > 0).length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Secure Libraries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">
                {selectedApp.dependencies.filter((d) => d.vulnerabilities === 0).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Library List</CardTitle>
            <Input
              placeholder="Search libraries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-4"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredDependencies.map((dep, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{dep.name}</p>
                      <p className="text-sm text-muted-foreground">Version {dep.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{dep.type}</Badge>
                    {dep.vulnerabilities > 0 ? (
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                        {dep.vulnerabilities} vulnerabilities
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Secure
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
