import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Password | SelesainAja Admin",
};

export default function AdminForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <ForgotPasswordForm role="admin" />
      </div>
    </div>
  );
}
