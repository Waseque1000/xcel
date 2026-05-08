"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FileSpreadsheet, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  Search,
  Check,
  MousePointer2,
  Plus,
  Code,
  Activity,
  LineChart,
  Globe,
  Terminal,
  Lock,
  ChevronRight,
  Share2
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/10 overflow-x-hidden font-sans">
      <Navbar className="bg-white/80 backdrop-blur-md border-slate-100" />
      
      {/* Hero: The White Command Center */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Soft Ambient Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50 blur-[120px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 blur-[120px] rounded-full" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto text-center z-10 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50/50 border border-blue-100 mb-10 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">v2.0 Neural Engine Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.85] mb-12 text-slate-900"
          >
            DATA <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x bg-[length:200%_auto]">ORCHESTRA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
          >
            The autonomous engine for enterprise data integrity. 
            Precision matching, high-fidelity cleaning, and neural validation 
            designed for the speed of modern business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard" className="group relative px-12 py-5 bg-slate-900 text-white rounded-full font-black text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200">
               <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <span className="relative z-10">Launch Console</span>
            </Link>
            <Link href="#architecture" className="px-12 py-5 bg-white border border-slate-200 text-slate-600 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm">
              View Specs
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Interactive Visualization (Light Version) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-32 w-full max-w-7xl mx-auto relative px-4"
        >
           <div className="relative glass-card rounded-[3rem] p-4 bg-white border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="bg-slate-50 rounded-[2.2rem] aspect-[21/9] relative overflow-hidden flex flex-col border border-slate-100">
                 <div className="h-14 border-b border-slate-200/50 flex items-center justify-between px-10 bg-white/50 backdrop-blur">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                       <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                       <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                          <Terminal className="w-3 h-3" />
                          Kernel-v2.0.4
                       </div>
                       <div className="h-4 w-px bg-slate-200" />
                       <div className="flex items-center gap-4">
                          <div className="w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                             <motion.div 
                               animate={{ x: ["-100%", "100%"] }}
                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                               className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                             />
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 flex">
                    <div className="w-20 border-r border-slate-200/50 flex flex-col items-center py-10 gap-10 bg-white/30">
                       {[Database, Activity, Share2, ShieldCheck].map((Icon, i) => (
                          <div key={i} className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-all", i === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:text-slate-900 hover:bg-white")}>
                             <Icon className="w-5 h-5" />
                          </div>
                       ))}
                    </div>
                    <div className="flex-1 p-12 relative flex items-center justify-center">
                       {/* Live Graph Simulation */}
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                       
                       <div className="w-full max-w-4xl grid grid-cols-3 gap-12 relative z-10">
                          {[
                            { label: "Source Input", val: "402k Rows", color: "blue" },
                            { label: "Neural Match", val: "99.8% Sync", color: "indigo" },
                            { label: "Final Output", val: "Verified", color: "emerald" }
                          ].map((node, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="relative group"
                            >
                               <div className="relative glass-card p-8 rounded-[2rem] border-slate-200 flex flex-col items-center text-center bg-white">
                                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", i === 2 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600")}>
                                     {i === 0 ? <Layers className="w-6 h-6" /> : i === 1 ? <Cpu className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                                  </div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{node.label}</p>
                                  <h5 className="text-xl font-bold text-slate-900">{node.val}</h5>
                               </div>
                               {i < 2 && (
                                 <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                                    <ChevronRight className="w-8 h-8 text-slate-200 animate-pulse" />
                                 </div>
                               )}
                            </motion.div>
                          ))}
                       </div>

                       {/* Scanning Line */}
                       <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[1px] bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] z-30"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-32 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="flex flex-col gap-2">
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Integrated Protocols</p>
                 <h3 className="text-2xl font-bold text-slate-900">Enterprise Standards</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale">
                {["SAPHIRA", "CORE", "QUANTUM", "OMEGA", "TITAN"].map((brand) => (
                  <span key={brand} className="text-3xl font-black tracking-tighter text-slate-900">{brand}</span>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Features: The Architecture */}
      <section id="architecture" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-12 h-1 bg-blue-600 mb-8" 
              />
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900">ENGINEERED FOR <br /> <span className="text-blue-600">PRECISION.</span></h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                The high-performance platform for data-first enterprises. 
                Optimized for massive throughput and sub-millisecond sync detection.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="w-20 h-20 glass-card rounded-3xl flex items-center justify-center bg-white border-slate-200">
                  <Cpu className="w-8 h-8 text-blue-600" />
               </div>
               <div className="w-20 h-20 glass-card rounded-3xl flex items-center justify-center bg-white border-slate-200">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Neural Engine v2", 
                desc: "Proprietary transformers trained for unmatched matching accuracy across messy datasets.",
                icon: <Zap className="text-amber-500" />,
                stat: "99.9%"
              },
              { 
                title: "Zero-Trust Privacy", 
                desc: "End-to-end encrypted processing. Your data never touches persistent storage layers.",
                icon: <Lock className="text-blue-600" />,
                stat: "AES-256"
              },
              { 
                title: "Elastic Scale", 
                desc: "Seamlessly scale from local files to petabyte-scale data lakes with neural precision.",
                icon: <Layers className="text-indigo-600" />,
                stat: "5GB/s"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass-card p-12 rounded-[3.5rem] border-slate-200 hover:border-blue-200 bg-white"
              >
                <div className="absolute top-12 right-12 text-[10px] font-black text-slate-300 group-hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">{feature.stat}</div>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform group-hover:bg-blue-50">
                   {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                <div className="mt-10 flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                   System Module <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-40 bg-slate-900 text-white rounded-[4rem] mx-6 shadow-2xl">
         <div className="max-w-7xl mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.9]">SEE THE <br /> SYNC.</h2>
                  <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
                     Experience real-time orchestration. Our interface is designed to give you 
                     absolute clarity over your most complex enterprise datasets.
                  </p>
                  <div className="space-y-8">
                     {[
                        "Real-time Similarity Mapping",
                        "Automated Schema Detection",
                        "Recursive Duplicate Filtering"
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 group cursor-default">
                           <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center group-hover:bg-blue-500 transition-all">
                              <Check className="w-5 h-5 text-blue-500 group-hover:text-white" />
                           </div>
                           <span className="text-xl font-bold tracking-tight">{item}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] -z-10 rounded-full" />
                  <div className="bg-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                     <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                    <FileSpreadsheet className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">Record_Set_{i}.csv</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Matched 99.2%</p>
                                 </div>
                              </div>
                              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "90%" }}
                                    className="h-full bg-blue-600"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-12 pt-10 border-t border-slate-100 flex justify-center">
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="px-10 py-4 bg-slate-900 text-white rounded-full font-black text-xs tracking-[0.2em] uppercase"
                        >
                           Process Global Batch
                        </motion.button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto"
        >
           <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-none text-slate-900">READY FOR <br /> DEPLOY.</h2>
           <p className="text-slate-500 text-xl mb-16 max-w-2xl mx-auto font-medium">
             Join the next generation of data-driven enterprises. 
             Start your 14-day full access trial today.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
             <Link href="/dashboard" className="px-16 py-6 bg-blue-600 text-white rounded-full font-black text-sm tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
               Create Account
             </Link>
             <Link href="/contact" className="px-16 py-6 bg-white border border-slate-200 text-slate-600 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-50 transition-all">
               Talk to Engineering
             </Link>
           </div>
        </motion.div>
      </section>

      <footer className="py-24 px-10 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">DataMatch <span className="text-blue-600">Pro</span></span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
              The high-performance orchestration platform for the AI enterprise. 
              Precision matching. Scalable architecture. Zero-trust security.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">Resources</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Neural Engine</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security Specs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">Foundation</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About System</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Open Roles</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Protocol</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Status Core</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">© 2024 DataMatch Pro AI. Enterprise Edition.</p>
          <div className="flex gap-10 text-slate-400">
            <Link href="#" className="hover:text-slate-900 transition-colors"><Globe className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-slate-900 transition-colors"><Share2 className="w-5 h-5" /></Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
