"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { RiskGauge } from "@/components/risk-gauge"
import { VulnerabilityChart } from "@/components/vulnerability-chart"
import { PermissionBreakdown } from "@/components/permission-breakdown"
import { RecentVulnerabilities } from "@/components/recent-vulnerabilities"
import { useApp } from "@/contexts/app-context"
import { Shield, Lock, Layers, Package, AlertTriangle, CheckCircle } from "lucide-react"

export default function HomePage() {
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

  const totalPermissions = selectedApp.permissions.all_count || 
    (selectedApp.permissions.dangerous?.length || 0) +
    (selectedApp.permissions.normal?.length || 0) +
    (selectedApp.permissions.signature?.length || 0)

  const totalComponents =
    (selectedApp.components.activities?.length || 0) +
    (selectedApp.components.services?.length || 0) +
    (selectedApp.components.receivers?.length || 0) +
    (selectedApp.components.providers?.length || 0)

  const exportedComponents = [
    ...(selectedApp.components.activities || []),
    ...(selectedApp.components.services || []),
    ...(selectedApp.components.receivers || []),
    ...(selectedApp.components.providers || []),
  ].filter((c) => c.exported).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Comprehensive security analysis and app insights</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Permissions"
            value={totalPermissions}
            icon={Lock}
            trend={{ value: 12, isPositive: false }}
          />
          <MetricCard title="Components" value={totalComponents} icon={Layers} trend={{ value: 5, isPositive: true }} />
          <MetricCard
            title="Dependencies"
            value={selectedApp.dependencies?.length || 0}
            icon={Package}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Vulnerabilities"
            value={selectedApp.security.vulnerabilities.length}
            icon={AlertTriangle}
            trend={{ value: 25, isPositive: false }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RiskGauge score={selectedApp.security.riskScore} />
          <VulnerabilityChart vulnerabilities={selectedApp.security.vulnerabilities} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PermissionBreakdown permissions={selectedApp.permissions} />
          <div className="space-y-6">
            <MetricCard
              title="Exported Components"
              value={exportedComponents}
              icon={Shield}
              className="bg-orange-500/5 border-orange-500/20"
            />
            <MetricCard
              title="Network Security"
              value={selectedApp.security.networkSecurity.certificatePinning ? "Enabled" : "Disabled"}
              icon={CheckCircle}
              className="bg-green-500/5 border-green-500/20"
            />
          </div>
        </div>

        <RecentVulnerabilities vulnerabilities={selectedApp.security.vulnerabilities} />
      </div>
    </DashboardLayout>
  )
}
