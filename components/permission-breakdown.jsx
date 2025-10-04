"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function PermissionBreakdown({ permissions }) {
  const data = [
    { name: "Dangerous", value: permissions.dangerous?.length || 0, fill: "#ef4444" },
    { name: "Normal", value: permissions.normal?.length || 0, fill: "#3b82f6" },
    { name: "Signature", value: permissions.signature?.length || 0, fill: "#eab308" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Distribution</CardTitle>
        {permissions.all_count && (
          <p className="text-sm text-muted-foreground">
            Total: {permissions.all_count} permissions ({permissions.malware_prone_count} malware-prone)
          </p>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
