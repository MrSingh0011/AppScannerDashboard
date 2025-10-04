"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, AlertTriangle, Shield, CheckCircle, XCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PermissionsPage() {
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

  const { permissions } = selectedApp

  const PermissionList = ({ permissions, type }) => {
    const getProtectionColor = (level) => {
      switch (level) {
        case "dangerous":
          return "bg-red-500/10 text-red-500 border-red-500/20"
        case "normal":
          return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "signature":
          return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        default:
          return ""
      }
    }

    return (
      <div className="space-y-3">
        {permissions.map((perm, index) => (
          <div key={index} className="flex items-start gap-4 rounded-lg border border-border p-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{perm.name.split(".").pop()}</h4>
                  <Badge variant="outline" className={getProtectionColor(perm.protectionLevel)}>
                    {perm.protectionLevel}
                  </Badge>
                </div>
                {perm.granted ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Granted</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm">Not Granted</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{perm.description}</p>
              <code className="block rounded bg-muted px-2 py-1 font-mono text-xs">{perm.name}</code>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalPermissions = permissions.dangerous.length + permissions.normal.length + permissions.signature.length
  const grantedPermissions = [...permissions.dangerous, ...permissions.normal, ...permissions.signature].filter(
    (p) => p.granted,
  ).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Permissions</h1>
          <p className="text-muted-foreground">App permissions and protection levels</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalPermissions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Dangerous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">{permissions.dangerous.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Normal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-500">{permissions.normal.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Granted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">{grantedPermissions}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Permission Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dangerous">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dangerous">Dangerous ({permissions.dangerous.length})</TabsTrigger>
                <TabsTrigger value="normal">Normal ({permissions.normal.length})</TabsTrigger>
                <TabsTrigger value="signature">Signature ({permissions.signature.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="dangerous" className="mt-6">
                <PermissionList permissions={permissions.dangerous} type="dangerous" />
              </TabsContent>
              <TabsContent value="normal" className="mt-6">
                <PermissionList permissions={permissions.normal} type="normal" />
              </TabsContent>
              <TabsContent value="signature" className="mt-6">
                <PermissionList permissions={permissions.signature} type="signature" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
