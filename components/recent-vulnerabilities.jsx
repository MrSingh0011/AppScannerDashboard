import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export function RecentVulnerabilities({ vulnerabilities }) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Vulnerabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vulnerabilities.slice(0, 4).map((vuln) => (
            <div key={vuln.id} className="flex items-start gap-4 rounded-lg border border-border p-4">
              <div className="rounded-lg bg-destructive/10 p-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{vuln.title}</h4>
                  <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                    {vuln.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{vuln.description}</p>
                <p className="text-xs text-muted-foreground">Component: {vuln.affectedComponent}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
