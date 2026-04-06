"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { InputField } from "@/src/components/form/InputField";
import { ForgotPasswordValues } from "@/src/interfaces/index";

const initialValues: ForgotPasswordValues = {
  email: "",
};

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-zinc-50">
            Forgot Password
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Enter your email to reset your password
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Reset email:", values.email);
            // TODO: Call API
            setTimeout(() => setSubmitting(false), 3000);
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-white" />
                    Sending reset link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="mt-5 text-center">
          <Link
            href="/login"
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-200 hover:underline"
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
