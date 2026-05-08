"use client";

import { motion } from "framer-motion";
import { Clock, FileSpreadsheet, Download, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const historyData = [
  { id: 1, batch: "Batch #1204", date: "May 08, 2024", time: "08:42 AM", files: 3, records: "1.2M", status: "Success", type: "Comparison" },
  { id: 2, batch: "Batch #1198", date: "May 07, 2024", time: "02:15 PM", files: 1, records: "450K", status: "Success", type: "Cleanup" },
  { id: 3, batch: "Batch #1192", date: "May 05, 2024", time: "11:30 AM", files: 2, records: "890K", status: "Failed", type: "Comparison" },
  { id: 4, batch: "Batch #1185", date: "May 04, 2024", time: "09:00 AM", files: 5, records: "3.1M", status: "Success", type: "Comparison" },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2">Processing History</h1>
        <p className="text-slate-400">Review and download reports from your past data matching batches.</p>
      </div>

      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search batches..." className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm" />
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {historyData.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.batch}</h4>
                  <p className="text-xs text-slate-500">{item.date} • {item.time}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-12 text-sm text-slate-400">
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase mb-1">Type</p>
                  <p className="font-medium">{item.type}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase mb-1">Records</p>
                  <p className="font-medium">{item.records}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase mb-1">Status</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                    item.status === "Success" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}>{item.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <FileSpreadsheet className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
