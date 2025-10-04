"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Share2, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ReportPage() {
  const { selectedApp } = useApp()

  if (!selectedApp) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No app selected</p>
        </div>
      </DashboardLayout>
    )
  }

  const { appInfo, metadata, security } = selectedApp

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Scan Report</h1>
            <p className="text-muted-foreground">Comprehensive analysis report</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Application Name</p>
                <p className="text-lg font-semibold">{appInfo.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Package Name</p>
                <p className="font-mono text-sm">{appInfo.packageName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Version</p>
                <p className="text-sm">{appInfo.version}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">SDK Version</p>
                <p className="text-sm">
                  Target: {appInfo.targetSdk} | Min: {appInfo.minSdk}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">App Size</p>
                <p className="text-sm">{appInfo.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scan Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scan Date</p>
                  <p className="text-sm font-semibold">{new Date(metadata.scanDate).toISOString().replace('T', ' ').split('.')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold">{(metadata.scanDuration / 1000).toFixed(2)}s</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scanner Version</p>
                  <p className="text-sm font-semibold">v{metadata.scannerVersion}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {metadata.shortSummary && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metadata.shortSummary}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Overall Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">Based on comprehensive security analysis</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    security.riskScore >= 80
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : security.riskScore >= 60
                        ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        : security.riskScore >= 40
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-green-500/10 text-green-500 border-green-500/20"
                  }
                >
                  Risk Score: {security.riskScore}/100
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-2 font-semibold">Key Findings</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    {security.vulnerabilities.filter((v) => v.severity === "critical").length} Critical vulnerabilities
                    detected
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {selectedApp.permissions.dangerous?.length || 0} Dangerous permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    {selectedApp.permissions.malware_prone_count || 0} Malware-prone permissions
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-2 font-semibold">Recommendations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {metadata.recommendations?.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  )) || [
                    <li key="default1">• Address critical vulnerabilities immediately</li>,
                    <li key="default2">• Review and minimize dangerous permissions</li>,
                    <li key="default3">• Implement certificate pinning</li>,
                    <li key="default4">• Update vulnerable dependencies</li>
                  ]}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
