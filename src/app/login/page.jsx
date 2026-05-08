"use client";

import { motion } from "framer-motion";
import { Database, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
              <Database className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">DataMatch <span className="text-blue-400">Pro</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400">Sign in to your account to manage your data.</p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 md:p-10 border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  required
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-bold text-slate-400">Password</label>
                <Link href="#" className="text-xs font-bold text-blue-400 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-2xl font-bold transition-all glow-blue flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-950/20 backdrop-blur px-2 text-slate-500 font-bold">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 glass border-white/5 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold">
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 glass border-white/5 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold">
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Don't have an account? <Link href="#" className="text-blue-400 font-bold hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </main>
  );
}
