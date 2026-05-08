"use client";

import { Bell, Search, User, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-10 flex items-center justify-between">
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search records, batches..."
            className="w-full bg-slate-50 border border-slate-100 rounded-full py-2.5 pl-12 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">System Live</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full border-2 border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-slate-900 leading-none mb-1">Alex Rivera</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Enterprise Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-blue-600 transition-all overflow-hidden">
            <User className="text-slate-400 w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
