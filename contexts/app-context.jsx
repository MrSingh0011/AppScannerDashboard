"use client"

import { createContext, useContext, useState } from "react"
import { multipleApps } from "@/lib/sample-data"

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  const [apps, setApps] = useState(multipleApps)
  const [selectedApp, setSelectedApp] = useState(multipleApps[0])

  const addApp = (app) => {
    setApps((prev) => [...prev, app])
  }

  return <AppContext.Provider value={{ apps, selectedApp, setSelectedApp, addApp }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
