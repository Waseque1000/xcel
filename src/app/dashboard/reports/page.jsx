"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowUpDown,
  Mail,
  Phone,
  User,
  Shield,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const demoData = [
  { id: 1, name: "Robert Fox", email: "robert.fox@example.com", phone: "+1 (555) 012-3456", status: "Exact Match", confidence: 100, origin: "CRM_Export.xlsx" },
  { id: 2, name: "Jane Cooper", email: "jane.c@company.io", phone: "+1 (555) 012-7890", status: "Similar", confidence: 92, origin: "Marketing_Leads.csv" },
  { id: 3, name: "Cody Fisher", email: "cody.fisher@provider.com", phone: "+1 (555) 012-1122", status: "Unmatched", confidence: 0, origin: "Old_Database.xlsx" },
  { id: 4, name: "Theresa Webb", email: "t.webb@gmail.com", phone: "+1 (555) 012-3344", status: "Exact Match", confidence: 100, origin: "CRM_Export.xlsx" },
  { id: 5, name: "J. Cooper", email: "jane.cooper@company.io", phone: "+1 (555) 012-7891", status: "Duplicate", confidence: 85, origin: "Leads_v2.csv" },
  { id: 6, name: "Marvin McKinney", email: "marvin.m@invalid", phone: "N/A", status: "Invalid Data", confidence: 10, origin: "Import_Temp.csv" },
  { id: 7, name: "Annette Black", email: "annette@black.com", phone: "+1 (555) 012-5566", status: "Similar", confidence: 98, origin: "Sales_Force.xlsx" },
  { id: 8, name: "Eleanor Pena", email: "e.pena@domain.org", phone: "+1 (555) 012-7788", status: "Exact Match", confidence: 100, origin: "CRM_Export.xlsx" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Exact Match", "Similar", "Unmatched", "Duplicate", "Invalid Data"];

  const filteredData = demoData.filter(item => {
    const matchesTab = activeTab === "All" || item.status === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Matching Reports</h1>
          <p className="text-slate-400">Detailed breakdown of processed records and matching results.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 glass border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all glow-blue flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
              activeTab === tab 
                ? "bg-blue-600 text-white border-blue-500 glow-blue" 
                : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Showing <span className="text-white font-bold">{filteredData.length}</span> of {demoData.length} records</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                    Customer Info <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Contact Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Confidence</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Source File</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((item, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id} 
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/20">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">ID: DM-{item.id}284</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {item.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {item.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5",
                        item.status === "Exact Match" ? "bg-emerald-500/10 text-emerald-400" : 
                        item.status === "Similar" ? "bg-blue-500/10 text-blue-400" : 
                        item.status === "Duplicate" ? "bg-amber-500/10 text-amber-400" :
                        item.status === "Invalid Data" ? "bg-rose-500/10 text-rose-400" :
                        "bg-slate-500/10 text-slate-400"
                      )}>
                        {item.status === "Exact Match" && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === "Similar" && <Sparkles className="w-3 h-3" />}
                        {item.status === "Invalid Data" && <XCircle className="w-3 h-3" />}
                        {item.status === "Duplicate" && <Shield className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-bold">{item.confidence}%</span>
                      <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            item.confidence > 90 ? "bg-emerald-500" : 
                            item.confidence > 70 ? "bg-blue-500" : "bg-slate-600"
                          )} 
                          style={{ width: `${item.confidence}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
                      <Download className="w-3 h-3" />
                      {item.origin}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-white transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button 
                key={i} 
                className={cn(
                  "w-8 h-8 rounded-lg text-sm font-bold transition-all",
                  p === 1 ? "bg-blue-600 text-white glow-blue" : "text-slate-500 hover:text-white"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
