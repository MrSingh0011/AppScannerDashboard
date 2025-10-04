"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export function RiskGauge({ score }) {
  const getRiskLevel = (score) => {
    if (score >= 80) return { label: "Critical", color: "#ef4444" }
    if (score >= 60) return { label: "High", color: "#f97316" }
    if (score >= 40) return { label: "Medium", color: "#eab308" }
    return { label: "Low", color: "#22c55e" }
  }

  const risk = getRiskLevel(score)
  const data = [
    { name: "Risk", value: score },
    { name: "Safe", value: 100 - score },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={risk.color} />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-xs text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-8">
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Risk Level</div>
                <div className="text-2xl font-bold" style={{ color: risk.color }}>
                  {risk.label}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vulnerabilities</span>
                  <span className="font-medium">4 found</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Dangerous Permissions</span>
                  <span className="font-medium">5 granted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Exported Components</span>
                  <span className="font-medium">3 exposed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
