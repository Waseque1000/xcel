"use client";

import { motion } from "framer-motion";
import { User, Bell, Lock, Globe, CreditCard, Shield, Zap } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your profile, preferences, and billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[
            { label: "Profile", icon: <User className="w-4 h-4" />, active: true },
            { label: "Security", icon: <Shield className="w-4 h-4" /> },
            { label: "Notifications", icon: <Bell className="w-4 h-4" /> },
            { label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
            { label: "API Keys", icon: <Zap className="w-4 h-4" /> },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? "bg-blue-600 text-white glow-blue" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5">
            <h3 className="text-xl font-bold mb-6">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center border-2 border-white/10 overflow-hidden shrink-0">
                  <User className="text-white w-10 h-10" />
                </div>
                <div className="flex flex-col justify-center">
                  <button className="text-sm font-bold text-blue-400 hover:underline mb-1">Change Avatar</button>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                  <input type="text" defaultValue="Rivera" className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                <input type="email" defaultValue="alex.rivera@example.com" className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all glow-blue">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border-white/5 border-rose-500/10">
            <h3 className="text-xl font-bold mb-2 text-rose-400">Danger Zone</h3>
            <p className="text-sm text-slate-500 mb-6">Irreversibly delete your account and all data.</p>
            <button className="px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-sm font-bold transition-all border border-rose-500/20">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
