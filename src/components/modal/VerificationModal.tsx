"use client";

import React, { useState } from "react";
import { Mail, X, Loader2, Send } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAxios } from "@/src/context/AxiosContext";
import { toast } from "sonner";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export default function VerificationModal({
  isOpen,
  onClose,
  email = "",
}: VerificationModalProps) {
  const { authService } = useAxios();
  const [modalEmail, setModalEmail] = useState(email);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const [verificationCode, setVerificationCode] = useState("");

  // Update email when prop changes
  React.useEffect(() => {
    setModalEmail(email);
  }, [email]);

  const handleResend = async () => {
    if (!modalEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.resendVerification(modalEmail);
      toast.success("Verification email sent!", {
        description: "Please check your inbox and verify your email address.",
      });
      setStep("code");
    } catch (error: any) {
      toast.error("Failed to send verification email", {
        description:
          typeof error === "string"
            ? error
            : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("email");
    setVerificationCode("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 cursor-pointer text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-500/30 bg-purple-500/10">
              <Mail className="size-8 text-purple-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-zinc-50">
            {step === "email"
              ? "Verify Your Email"
              : "Check Your Inbox"}
          </h2>
          <p className="mt-2 text-xs text-zinc-400">
            {step === "email"
              ? "We'll send you a verification link to verify your account"
              : "We've sent a verification email. Please check your inbox."}
          </p>
        </div>

        {step === "email" ? (
          <>
            {/* Email Input */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="email"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-zinc-50 placeholder-zinc-500 outline-none transition-colors focus:border-purple-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResend}
                disabled={isSubmitting}
                className="flex-1 cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Resend
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-400">
                ✓ Verification email sent to{" "}
                <span className="font-medium">{modalEmail}</span>
              </p>
            </div>

            {/* Close Button */}
            <Button
              onClick={handleClose}
              className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
              size="lg"
            >
              Got it!
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
