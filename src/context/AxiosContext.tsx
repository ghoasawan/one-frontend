"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { AxiosClient } from "@/src/services/axiosclient"
import { AuthService } from "@/src/services/auth.service"

interface AxiosContextType {
  axiosClient: AxiosClient
  authService: AuthService
}

const AxiosContext = createContext<AxiosContextType | undefined>(undefined)

export function AxiosProvider({ children }: { children: ReactNode }) {
  const axiosClient = new AxiosClient()
  const authService = new AuthService(axiosClient)

  return (
    <AxiosContext.Provider value={{ axiosClient, authService }}>
      {children}
    </AxiosContext.Provider>
  )
}

export function useAxios() {
  const context = useContext(AxiosContext)
  if (context === undefined) {
    throw new Error("useAxios must be used within an AxiosProvider")
  }
  return context
}
