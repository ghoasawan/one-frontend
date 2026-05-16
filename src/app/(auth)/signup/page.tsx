"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  User,
  Phone,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { InputField } from "@/src/components/form/InputField";
import { SignupValues } from "@/src/interfaces/index";
import {useAxios} from '@/src/context/AxiosContext'
import { toast } from "sonner";
import VerificationModal from "@/src/components/modal/VerificationModal";

const initialValues: SignupValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Signup() {

  const router = useRouter();
  const client= useAxios();
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [verificationEmail, setVerificationEmail] = useState<string>("");
  const [verificationError, setVerificationError] = useState<string>("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-zinc-50">
            Create Account
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Sign up to get started
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={async(values, { setSubmitting, resetForm }) => {
            try {
              const { confirmPassword,...data } = values;

              const response=await client.authService.register(data);
              console.log("res",response)
              toast.success(response?.message);
              resetForm();
              setTimeout(()=>{
                router.push("/verify-email");
              },1000)
            } catch (error: any) {
              if(error=== "Verify your Email") {
                setVerificationEmail(values.email);
                setVerificationError("Please verify your email address");
              } else {
                setVerificationError("");
              }
              toast.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-3.5">
              <InputField
                label="Full Name"
                name="name"
                icon={<User size={16} />}
                placeholder="John Doe"
                error={errors.name}
                touched={touched.name}
              />

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
                label="Phone Number"
                name="phone"
                type="tel"
                icon={<Phone size={16} />}
                placeholder="+1234567890"
                error={errors.phone}
                touched={touched.phone}
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

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                icon={<Lock size={16} />}
                placeholder="••••••••"
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
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
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-pointer text-zinc-300 underline-offset-4 transition-colors hover:text-zinc-100 hover:underline"
          >
            Log in
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
