"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, User, KeyRound } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProfileSettingsProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Profil berhasil diperbarui");
      setIsSaving(false);
    }, 1000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password baru tidak cocok");
      return;
    }
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Password berhasil diperbarui");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Profil Saya</h2>
        <p className="text-slate-500">Kelola informasi pribadi dan keamanan akun Anda.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Info Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4 flex items-center gap-2">
            <User className="h-5 w-5 text-[#0066FF]" />
            <h3 className="font-semibold text-slate-800">Informasi Pribadi</h3>
          </div>
          <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-slate-100 mb-3 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center text-slate-400 text-3xl font-bold">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  name ? name.charAt(0).toUpperCase() : <User className="h-10 w-10" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm">Ganti Foto</Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
              <p className="text-xs text-slate-500">Hubungi Super Admin untuk mengubah alamat email.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bio Singkat</label>
              <Textarea 
                placeholder="Penulis konten seputar pendidikan..." 
                className="h-24 resize-none"
              />
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={isSaving} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Save className="mr-2 h-4 w-4" /> Simpan Profil
              </Button>
            </div>
          </form>
        </div>

        {/* Password Reset Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-fit">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4 flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-slate-800">Ubah Password</h3>
          </div>
          <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password Saat Ini</label>
              <Input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password Baru</label>
              <Input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Konfirmasi Password Baru</label>
              <Input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="pt-2">
              <Button type="submit" variant="destructive" disabled={isSaving} className="w-full">
                Ubah Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
