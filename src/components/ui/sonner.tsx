"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-center"
      richColors
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast group flex items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-sm",
          title: "cn-toast-title text-sm font-semibold tracking-tight",
          description: "cn-toast-description mt-1 text-xs leading-relaxed",
          success: "cn-toast-success",
          error: "cn-toast-error",
          warning: "cn-toast-warning",
          info: "cn-toast-info",
          icon: "cn-toast-icon mt-0.5 shrink-0",
          actionButton:
            "cn-toast-action h-8 rounded-md border border-white/20 bg-white/10 px-3 text-xs font-medium text-white transition-colors hover:bg-white/20",
          cancelButton:
            "cn-toast-cancel h-8 rounded-md border border-zinc-600 bg-zinc-800 px-3 text-xs font-medium text-zinc-100 transition-colors hover:bg-zinc-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
