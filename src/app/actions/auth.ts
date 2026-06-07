"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    // We do not pass `redirect: false` because Server Actions handle redirects natively
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      // In NextAuth v5, custom errors thrown in authorize usually appear here
      const errorMessage = (error as any).cause?.err?.message || (error as Error).message;
      const authError = error as AuthError;
      switch (authError.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah." };
        case "CallbackRouteError":
          return { error: errorMessage || "Terjadi kesalahan saat verifikasi kredensial." };
        default:
          return { error: errorMessage || "Terjadi kesalahan sistem." };
      }
    }
    
    // IMPORTANT: Next.js redirect() throws a specific error that MUST be rethrown
    // so Next.js can intercept it and perform the actual HTTP redirect to the client.
    throw error;
  }
}
