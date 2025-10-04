"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Lock, CheckCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SecurityPage() {
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

  const security = selectedApp.security

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return ""
    }
  }

  const getRiskColor = (score) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-orange-500"
    if (score >= 40) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Security Analysis</h1>
          <p className="text-muted-foreground">Detailed security assessment and vulnerability report</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Overall Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold ${getRiskColor(security.riskScore)}`}>{security.riskScore}</span>
                  <span className="mb-2 text-muted-foreground">/ 100</span>
                </div>
                <Progress value={security.riskScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {security.riskScore >= 80
                    ? "Critical risk level - immediate action required"
                    : security.riskScore >= 60
                      ? "High risk level - review recommended"
                      : security.riskScore >= 40
                        ? "Medium risk level - monitor closely"
                        : "Low risk level - acceptable security posture"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Vulnerabilities Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Critical</span>
                  <span className="text-2xl font-bold text-red-500">
                    {security.vulnerabilities.filter((v) => v.severity === "critical").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">High</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {security.vulnerabilities.filter((v) => v.severity === "high").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Medium</span>
                  <span className="text-2xl font-bold text-yellow-500">
                    {security.vulnerabilities.filter((v) => v.severity === "medium").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <span className="text-2xl font-bold text-green-500">
                    {security.vulnerabilities.filter((v) => v.severity === "low").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Network Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cleartext Traffic</span>
                  {security.networkSecurity.cleartextTrafficPermitted ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Certificate Pinning</span>
                  {security.networkSecurity.certificatePinning ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trust User Certs</span>
                  {security.networkSecurity.trustUserCerts ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {security.vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                          {vuln.severity.toUpperCase()}
                        </Badge>
                        <h3 className="text-lg font-semibold">{vuln.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Affected Component:</span>
                          <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{vuln.affectedComponent}</code>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium">Recommendation:</span>
                          <span className="text-muted-foreground">{vuln.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedApp.binaries && selectedApp.binaries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Binary Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedApp.binaries.map((binary, index) => (
                  <div key={index} className="rounded-lg border border-border p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium font-mono text-sm">{binary.name}</h4>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Stack Canary:</span>
                          {binary.stack_canary ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Fortify:</span>
                          {binary.fortify ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{binary.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Certificate Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Issuer</p>
                <p className="font-mono text-sm">{security.certificateInfo.issuer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                <p className="font-mono text-sm">{security.certificateInfo.subject}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Valid From</p>
                <p className="text-sm">
                  {security.certificateInfo.validFrom === "Unknown" 
                    ? "Unknown" 
                    : new Date(security.certificateInfo.validFrom).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Valid To</p>
                <p className="text-sm">
                  {security.certificateInfo.validTo === "Unknown" 
                    ? "Unknown" 
                    : new Date(security.certificateInfo.validTo).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Signature Algorithm</p>
                <p className="font-mono text-sm">{security.certificateInfo.signatureAlgorithm}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Fingerprint</p>
                <p className="font-mono text-sm">{security.certificateInfo.fingerprint}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
