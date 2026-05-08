"use client";

import { motion } from "framer-motion";
import { Database, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "py-4" : "py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn(
          "transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between border",
          scrolled 
            ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
            : "bg-transparent border-transparent"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">DataMatch <span className="text-blue-600">Pro</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
              <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
              <Link href="#solutions" className="hover:text-slate-900 transition-colors flex items-center gap-1">Solutions <ChevronDown className="w-3 h-3" /></Link>
              <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            </div>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-[13px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors">Log in</Link>
              <Link href="/dashboard" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[13px] font-bold transition-all hover:bg-slate-800 shadow-md shadow-slate-100 flex items-center gap-2 group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-6 right-6 bg-white border border-slate-100 rounded-3xl p-8 flex flex-col gap-6 md:hidden shadow-2xl mt-4"
        >
          <Link href="#features" className="text-xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#solutions" className="text-xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>Solutions</Link>
          <Link href="#pricing" className="text-xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>Pricing</Link>
          <div className="h-px bg-slate-100 my-2" />
          <Link href="/login" className="text-lg font-bold text-slate-500" onClick={() => setIsOpen(false)}>Log in</Link>
          <Link href="/dashboard" className="w-full py-4 bg-blue-600 text-white rounded-2xl text-center font-bold shadow-lg shadow-blue-100" onClick={() => setIsOpen(false)}>Launch Platform</Link>
        </motion.div>
      )}
    </nav>
  );
}
