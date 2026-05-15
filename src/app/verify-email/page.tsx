"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle, XCircle, Loader2, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAxios } from "@/src/context/AxiosContext";
import { toast } from "sonner";

type VerificationStatus = "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authService } = useAxios();
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      console.log("token",token)

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing");
        return;
      }

      try {
        const response=await authService.verifyEmail(token);
        console.log("res",response)
        toast.success("Email verified successfully!", {
          description: "Your account is ready. Redirecting to home...",
        });
        setStatus("success");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to verify email. The link may be invalid or expired.",
        );
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Failed to verify email. The link may be invalid or expired."
        );
      }
    };

    verifyEmail();
  }, [searchParams, authService]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-zinc-50">
            Email Verification
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            {status === "verifying" && "Please wait while we verify your email..."}
            {status === "success" && "Your email has been successfully verified"}
            {status === "error" && "Verification failed"}
          </p>
        </div>

        {/* Status Icon */}
        <div className="mb-6 flex flex-col items-center justify-center py-6">
          {status === "verifying" && (
            <>
              <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-purple-500/30 bg-purple-500/10">
                <Loader2 className="size-10 animate-spin text-purple-500" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-zinc-300">
                  Verifying your email
                </p>
                <p className="text-xs text-zinc-500">
                  This will only take a moment...
                </p>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle className="size-10 text-emerald-500" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-zinc-300">
                  Verification Successful
                </p>
                <p className="text-xs text-zinc-500">{message}</p>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
                <XCircle className="size-10 text-red-500" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-zinc-300">
                  Verification Failed
                </p>
                <p className="text-xs text-zinc-500">{message}</p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === "verifying" && (
            <Button
              disabled
              className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
              size="lg"
            >
              <Loader2 className="size-4 animate-spin text-white" />
              Verifying...
            </Button>
          )}

          {status === "success" && (
            <>
              <Button
                onClick={handleGoToLogin}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                <Lock className="size-4" />
                Go to Login
              </Button>
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="w-full cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                size="lg"
              >
                <ArrowLeft className="size-4" />
                Back to Home
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Button
                onClick={handleGoHome}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                <ArrowLeft className="size-4" />
                Back to Home
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                variant="outline"
                className="w-full cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                size="lg"
              >
                <Mail className="size-4" />
                Try Signing Up Again
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-zinc-500">
          Need help?{" "}
          <Link
            href="/"
            className="cursor-pointer text-zinc-300 underline-offset-4 transition-colors hover:text-zinc-100 hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
