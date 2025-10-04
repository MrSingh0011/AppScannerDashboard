"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, Activity, Radio, Database, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComponentsPage() {
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

  const { components } = selectedApp

  const ComponentList = ({ components, icon: Icon }) => {
    return (
      <div className="space-y-3">
        {components.map((comp, index) => (
          <div key={index} className="flex items-start gap-4 rounded-lg border border-border p-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{comp.name.split(".").pop()}</h4>
                <div className="flex items-center gap-2">
                  {comp.exported && (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                      Exported
                    </Badge>
                  )}
                  {comp.enabled ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                      Disabled
                    </Badge>
                  )}
                </div>
              </div>
              <code className="block rounded bg-muted px-2 py-1 font-mono text-xs">{comp.name}</code>
              {comp.permission && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Required Permission:</span>
                  <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{comp.permission}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalComponents =
    components.activities.length +
    components.services.length +
    components.receivers.length +
    components.providers.length

  const exportedComponents = [
    ...components.activities,
    ...components.services,
    ...components.receivers,
    ...components.providers,
  ].filter((c) => c.exported).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Components</h1>
          <p className="text-muted-foreground">Application components and their configurations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalComponents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-500">{components.activities.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">{components.services.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Receivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-500">{components.receivers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Exported
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-500">{exportedComponents}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Component Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activities">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="activities">Activities ({components.activities.length})</TabsTrigger>
                <TabsTrigger value="services">Services ({components.services.length})</TabsTrigger>
                <TabsTrigger value="receivers">Receivers ({components.receivers.length})</TabsTrigger>
                <TabsTrigger value="providers">Providers ({components.providers.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="activities" className="mt-6">
                <ComponentList components={components.activities} icon={Activity} />
              </TabsContent>
              <TabsContent value="services" className="mt-6">
                <ComponentList components={components.services} icon={Radio} />
              </TabsContent>
              <TabsContent value="receivers" className="mt-6">
                <ComponentList components={components.receivers} icon={Radio} />
              </TabsContent>
              <TabsContent value="providers" className="mt-6">
                <ComponentList components={components.providers} icon={Database} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
