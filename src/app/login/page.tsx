"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { InputField } from "@/src/components/form/InputField";
import { LoginValues } from "@/src/interfaces/index";
import { useAxios } from "@/src/context/AxiosContext";
import { toast } from "sonner";
import VerificationModal from "@/src/components/modal/VerificationModal";

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const { authService } = useAxios();
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [verificationEmail, setVerificationEmail] = useState<string>("");
  const [verificationError, setVerificationError] = useState<string>("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-zinc-50">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Log in to your account
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await authService.login(values);
              
              toast.success("Login successful!", {
                description: "Welcome back!",
              });
              
              router.push("/");
            } catch (error: any) {
              const errorMessage = typeof error === "string" ? error : "Invalid email or password. Please try again.";
              
              // Check if error indicates email needs verification
              if (errorMessage.toLowerCase().includes("verify") || errorMessage.toLowerCase().includes("not verified")) {
                setVerificationEmail(values.email);
                setVerificationError("Your email is not verified");
                setShowVerificationModal(true);
              } else {
                setVerificationError("");
              }
              
              toast.error("Login failed", {
                description: errorMessage,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-3.5">
              <InputField
                label="Email"
                name="email"
                type="email"
                icon={<Mail size={16} />}
                placeholder="john@example.com"
                error={errors.email}
                touched={touched.email}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                icon={<Lock size={16} />}
                placeholder="••••••••"
                error={errors.password}
                touched={touched.password}
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="cursor-pointer text-sm bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text font-medium text-transparent hover:from-purple-500 hover:to-violet-500 transition-all"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-white" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Verification Error Message */}
        {verificationError && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-400">
                  {verificationError}
                </p>
                <button
                  type="button"
                  onClick={() => setShowVerificationModal(true)}
                  className="mt-2 cursor-pointer text-sm font-medium text-purple-400 underline underline-offset-4 transition-colors hover:text-purple-300"
                >
                  Click here to verify
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="cursor-pointer text-zinc-300 underline-offset-4 transition-colors hover:text-zinc-100 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={verificationEmail}
      />
    </div>
  );
}
