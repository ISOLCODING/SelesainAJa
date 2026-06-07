"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Mail, KeyRound, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

type Step = "EMAIL" | "OTP" | "RESET" | "SUCCESS";

interface ForgotPasswordFormProps {
  role: "admin" | "writer";
}

export function ForgotPasswordForm({ role }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("OTP");
      toast.success("Kode OTP telah dikirim ke email Anda");
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Masukkan 6 digit kode OTP");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("RESET");
      toast.success("OTP valid, silakan buat password baru");
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password minimal 8 karakter");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      setStep("SUCCESS");
    }, 1500);
  };

  const backLink = role === "admin" ? "/admin/login" : "/writer/login";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100/50 w-full relative z-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Lupa Password?
        </h1>
        <p className="text-slate-500 text-sm">
          {step === "EMAIL" && "Masukkan email Anda untuk menerima kode OTP."}
          {step === "OTP" && "Masukkan 6 digit kode yang dikirim ke email."}
          {step === "RESET" && "Buat password baru yang kuat dan aman."}
          {step === "SUCCESS" && "Password berhasil diubah!"}
        </p>
      </div>

      {step === "EMAIL" && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-6 bg-slate-50 border-slate-200 focus-visible:ring-[#0066FF]"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white py-6"
            disabled={isLoading || !email}
          >
            {isLoading ? "Mengirim..." : "Kirim OTP"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
          <div className="text-center mt-6">
            <Link href={backLink} className="text-sm text-slate-500 hover:text-[#0066FF] inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Kembali ke Login
            </Link>
          </div>
        </form>
      )}

      {step === "OTP" && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-semibold text-slate-700">Kode OTP</label>
            <Input
              id="otp"
              type="text"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="py-6 text-center text-xl tracking-[0.5em] font-mono bg-slate-50 border-slate-200 focus-visible:ring-[#0066FF]"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6"
            disabled={isLoading || otp.length < 6}
          >
            {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
          </Button>
          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={() => setStep("EMAIL")}
              className="text-sm text-slate-500 hover:text-slate-800 inline-flex items-center"
            >
              Salah email? Kembali
            </button>
          </div>
        </form>
      )}

      {step === "RESET" && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="new-password" className="text-sm font-semibold text-slate-700">Password Baru</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="new-password"
                type="password"
                placeholder="Minimal 8 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 py-6 bg-slate-50 border-slate-200 focus-visible:ring-[#0066FF]"
                required
                minLength={8}
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#00C853] hover:bg-[#00a846] text-white py-6"
            disabled={isLoading || newPassword.length < 8}
          >
            {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
          </Button>
        </form>
      )}

      {step === "SUCCESS" && (
        <div className="text-center space-y-6 py-4">
          <div className="mx-auto w-16 h-16 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-[#00C853]" />
          </div>
          <p className="text-slate-600 mb-8">
            Password Anda telah berhasil diubah. Silakan login kembali dengan password baru Anda.
          </p>
          <Link href={backLink}>
            <Button className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white py-6">
              Kembali ke Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
