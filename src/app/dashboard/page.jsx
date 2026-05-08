"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  FileCheck, 
  AlertCircle, 
  Copy, 
  BarChart3, 
  Zap, 
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  MoreVertical,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Database,
  Search,
  Activity,
  MousePointer2,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { cn } from "@/lib/utils";
import { useState } from "react";

const stats = [
  { label: "Total Records", value: "1,284,502", change: "+12.5%", icon: <Users className="w-5 h-5" />, color: "blue", trend: [20, 40, 30, 50, 40, 60, 70] },
  { label: "Matches Found", value: "942,103", change: "+8.2%", icon: <FileCheck className="w-5 h-5" />, color: "emerald", trend: [10, 20, 15, 30, 25, 40, 45] },
  { label: "Duplicates", value: "12,403", change: "-4.1%", icon: <Copy className="w-5 h-5" />, color: "amber", trend: [40, 35, 30, 25, 20, 15, 10] },
  { label: "AI Accuracy", value: "99.8%", change: "+0.5%", icon: <Zap className="w-5 h-5" />, color: "indigo", trend: [98, 98.5, 99, 99.2, 99.5, 99.7, 99.8] },
];

const matchData = [
  { name: "Mon", matches: 4000, unmatches: 2400, confidence: 92 },
  { name: "Tue", matches: 3000, unmatches: 1398, confidence: 94 },
  { name: "Wed", matches: 2000, unmatches: 9800, confidence: 91 },
  { name: "Thu", matches: 2780, unmatches: 3908, confidence: 96 },
  { name: "Fri", matches: 1890, unmatches: 4800, confidence: 95 },
  { name: "Sat", matches: 2390, unmatches: 3800, confidence: 98 },
  { name: "Sun", matches: 3490, unmatches: 4300, confidence: 99 },
];

const pieData = [
  { name: "Exact Match", value: 75, color: "#2563eb" },
  { name: "Similar", value: 15, color: "#6366f1" },
  { name: "Unmatched", value: 10, color: "#ef4444" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-widest border border-blue-100">Live Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-500">Enterprise Match Engine</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">Intelligence Hub</h1>
          <p className="text-slate-500 font-medium text-sm">Real-time data matching & validation dashboard.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
             {["Overview", "Analytics", "Logs"].map((tab) => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all",
                  activeTab === tab.toLowerCase() ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"
                )}
               >
                 {tab}
               </button>
             ))}
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold shadow-xl shadow-slate-200 flex items-center gap-2 hover:bg-slate-800">
            <Plus className="w-4 h-4" />
            New Batch
          </button>
        </div>
      </div>

      {/* Stats with Mini Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] group hover:shadow-xl hover:shadow-slate-100/50 transition-all cursor-pointer overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border",
                  stat.color === 'blue' ? "text-blue-600 bg-blue-50 border-blue-100" : 
                  stat.color === 'emerald' ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
                  stat.color === 'amber' ? "text-amber-600 bg-amber-50 border-amber-100" : "text-indigo-600 bg-indigo-50 border-indigo-100"
                )}>
                  {stat.icon}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.change.startsWith("+") ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                )}>
                  {stat.change}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter mb-4">{stat.value}</p>
              
              {/* Mini Trend Line */}
              <div className="h-10 w-full opacity-30">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.trend.map((val, idx) => ({ val, idx }))}>
                    <Line type="monotone" dataKey="val" stroke="currentColor" strokeWidth={2} dot={false} className={cn(
                      stat.color === 'blue' ? "text-blue-500" : 
                      stat.color === 'emerald' ? "text-emerald-500" :
                      stat.color === 'amber' ? "text-amber-500" : "text-indigo-500"
                    )} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Performance Graph */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Match Velocity</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Throughput per interval</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Matched</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confidence</span>
                </div>
              </div>
            </div>
            
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={matchData}>
                  <defs>
                    <linearGradient id="matchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} fontVariant="bold" />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip 
                    cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", padding: "16px" }}
                    itemStyle={{ fontSize: "12px", color: "#0f172a", fontWeight: "bold" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="matches" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#matchGrad)" 
                    animationDuration={2000}
                  />
                  <Line type="monotone" dataKey="confidence" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Predictions */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-24 h-24 text-blue-400" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 mb-6">Predictive Audit</h4>
                  <p className="text-2xl font-bold mb-4 leading-tight">Next batch matches <br /> predicted at <span className="text-blue-400">84%</span></p>
                  <p className="text-slate-400 text-sm mb-8 max-w-[200px]">Based on historical patterns in your CRM datasets.</p>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-[11px] font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all">
                    Enable Auto-Sync
                  </button>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Intelligence Toolkit</h4>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Cleanup", icon: <Database className="w-4 h-4" />, color: "blue" },
                    { label: "Verify", icon: <ShieldCheck className="w-4 h-4" />, color: "emerald" },
                    { label: "Dedup", icon: <Copy className="w-4 h-4" />, color: "amber" },
                    { label: "Normal", icon: <Activity className="w-4 h-4" />, color: "violet" }
                  ].map((act) => (
                    <button key={act.label} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                       <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-1 group-hover:scale-110 transition-transform", 
                         act.color === 'blue' ? 'text-blue-600 bg-blue-100/50' : 
                         act.color === 'emerald' ? 'text-emerald-600 bg-emerald-100/50' :
                         act.color === 'amber' ? 'text-amber-600 bg-amber-100/50' : 'text-violet-600 bg-violet-100/50'
                       )}>
                          {act.icon}
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900">{act.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Health & Insights */}
        <div className="lg:col-span-4 space-y-8">
           {/* Data Health Score */}
           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center text-center">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 w-full text-left">Overall Integrity</h4>
              <div className="relative mb-8">
                 <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                    <motion.circle 
                      cx="96" cy="96" r="88" stroke="#2563eb" strokeWidth="12" fill="transparent" 
                      strokeDasharray="552.92"
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 - (552.92 * 0.94) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">94%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                 <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xl font-bold text-slate-900">8.4k</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anomalies</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xl font-bold text-slate-900">12s</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Latency</p>
                 </div>
              </div>
           </div>

           {/* AI Activity Feed */}
           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Match Insights</h4>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-6">
                 {[
                   { user: "AI Engine", action: "Matched 1,204 records", target: "CRM_Export", time: "Just now", type: "match" },
                   { user: "Smart Map", action: "Detected 'Phone' column", target: "Leads_v2", time: "4m ago", type: "system" },
                   { user: "Cleanup", action: "Removed 45 duplicates", target: "Marketing_B", time: "12m ago", type: "clean" },
                   { user: "Security", action: "Data encrypted & vaulted", target: "Archive", time: "1h ago", type: "secure" }
                 ].map((act, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-blue-200 transition-all">
                         {act.type === 'match' ? <FileCheck className="w-4 h-4 text-blue-600" /> : 
                          act.type === 'clean' ? <Zap className="w-4 h-4 text-amber-600" /> :
                          act.type === 'secure' ? <ShieldCheck className="w-4 h-4 text-indigo-600" /> :
                          <Database className="w-4 h-4 text-slate-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-none mb-1">{act.action}</p>
                         <p className="text-[10px] text-slate-400 font-medium">via {act.user} • {act.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-3 bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-500 rounded-full hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest">
                Full Activity Stream
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// Missing Plus icon
function Plus({ className }) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
   );
}
