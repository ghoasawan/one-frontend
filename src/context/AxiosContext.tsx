"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { authService } from "@/src/services/index"
import {AuthService} from "@/src/services/auth.service"

interface AxiosContextType {
  authService:AuthService
}

const AxiosContext = createContext<AxiosContextType | undefined>(undefined)

export function AxiosProvider({ children }: { children: ReactNode }) {

  return (
    <AxiosContext.Provider value={{authService }}>
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
