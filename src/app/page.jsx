"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  Globe,
  Plus
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const bentoFeatures = [
  {
    title: "AI Similarity Engine",
    description: "Our proprietary neural network identifies complex duplicates and near-matches with 99.8% precision.",
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-white",
    illustration: (
      <div className="absolute bottom-0 right-0 p-6 w-full">
        <div className="space-y-2">
          {[98, 87, 95].map((val, i) => (
            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${val}%` }} className="h-full bg-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-500">{val}% Match</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Instant Processing",
    description: "Scale from thousands to millions of rows in seconds.",
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    className: "md:col-span-2 md:row-span-1",
    illustration: (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <Zap className="w-32 h-32 text-amber-500 fill-amber-500/20" />
      </div>
    )
  },
  {
    title: "Smart Mapping",
    description: "Auto-detect columns across messy datasets.",
    icon: <Layers className="w-8 h-8 text-indigo-500" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption & zero-persistence privacy.",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Visual Analytics",
    description: "Stunning real-time insights for your data quality.",
    icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
    className: "md:col-span-2 md:row-span-1 flex flex-row items-center gap-6",
    illustration: (
      <div className="flex gap-1 items-end h-12">
        {[40, 70, 45, 90, 65].map((h, i) => (
          <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: h }} className="w-3 bg-rose-500/10 rounded-t border-t border-rose-500/20" />
        ))}
      </div>
    )
  }
];

export default function Home() {
  const containerRef = useRef(null);
  
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/10 overflow-x-hidden font-sans grid-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Soft Ambient Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">AI-Powered Data Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Match data at <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">the speed of AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The premium platform for enterprise Excel comparisons, 
            smart data cleaning, and high-accuracy similarity detection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50 transition-all">
              See How It Works
            </Link>
          </motion.div>
          
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative glass-card rounded-[2.5rem] p-4 bg-white border-slate-200 shadow-2xl overflow-hidden">
              <div className="bg-slate-50 rounded-[1.8rem] aspect-[16/9] relative overflow-hidden flex flex-col items-center justify-center">
                 {/* Simulated Interface Grid */}
                 <div className="absolute top-0 left-0 w-full h-12 bg-white border-b border-slate-200 flex items-center px-6 gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                 </div>
                 
                 <div className="z-10 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200 animate-pulse">
                      <Database className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-4 text-center">
                      <p className="text-xl font-bold text-slate-800">Analyzing Batch #1204</p>
                      <div className="flex gap-1.5 items-center justify-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div 
                            key={i} 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-600" 
                          />
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by Data Intelligence Teams</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale">
            {["DATACORE", "NEXUS", "OPTIMA", "STRATOS", "VERTEX"].map((brand) => (
              <span key={brand} className="text-2xl font-black tracking-tighter text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Built for clarity at scale.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Engineered for data professionals who demand precision, speed, and 
              a clean workspace for their most complex datasets.
            </p>
          </div>

          <div className="bento-grid">
            {bentoFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "glass-card rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden",
                  feature.className
                )}
              >
                <div className="mb-6 relative z-10">{feature.icon}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">{feature.description}</p>
                </div>
                {feature.illustration}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Data matching as <br /> <span className="text-blue-600">it should be.</span></h2>
            <div className="space-y-10">
              {[
                { title: "Smart Column Mapping", text: "Zero manual intervention. Our AI identifies headers regardless of naming variations.", icon: <CheckCircle2 className="text-blue-600" /> },
                { title: "Fuzzy Logic Engine", text: "Match phonetically similar names and addresses with neural precision.", icon: <CheckCircle2 className="text-blue-600" /> },
                { title: "Export with Integrity", text: "Get your results in perfectly structured workbooks, ready for your CRM.", icon: <CheckCircle2 className="text-blue-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-6 h-6 mt-1 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-blue-100/50 blur-[100px] -z-10" />
            <div className="glass-card rounded-[3rem] p-12 bg-white border-slate-200 relative overflow-hidden shadow-2xl">
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
                        <div>
                           <p className="text-sm font-bold">Jonathon D.</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Customer ID: 12402</p>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest">EXACT MATCH</div>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"><User className="w-5 h-5 text-indigo-600" /></div>
                        <div>
                           <p className="text-sm font-bold">Johnathan Doe</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Possible Duplicate</p>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-widest">98% SIMILAR</div>
                  </div>
               </div>
               <div className="mt-10 pt-10 border-t border-slate-100 flex justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-slate-900 px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl shadow-slate-200"
                  >
                    <MousePointer2 className="w-4 h-4 fill-white" />
                    Merge Records
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto glass-card rounded-[3.5rem] p-16 md:p-28 text-center bg-white border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">Ready to sync?</h2>
          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of data professionals using DataMatch Pro AI to power their data workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Start Free Trial
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50 transition-all">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100"><Database className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold tracking-tight">DataMatch <span className="text-blue-600">Pro</span></span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              The premium data matching platform for enterprise teams. 
              Built for speed, accuracy, and clarity.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Enterprise</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">API Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-medium">© 2024 DataMatch Pro AI. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Globe className="w-5 h-5" /></Link>
            <span className="text-slate-300 text-xs uppercase font-bold tracking-[0.2em] pt-1">SF • LDN • TKY</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Demo Icons
function User({ className }) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
   );
}
