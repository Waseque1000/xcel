"use client";

import { motion } from "framer-motion";
import { Users, Shield, Server, Activity, Database, Key } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
          <p className="text-slate-400">System-wide monitoring and user management.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 text-sm font-bold">
          <Shield className="w-4 h-4" />
          Admin Access
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,402", icon: <Users className="text-blue-400" /> },
          { label: "Active Nodes", value: "12", icon: <Server className="text-emerald-400" /> },
          { label: "System Load", value: "24%", icon: <Activity className="text-amber-400" /> },
          { label: "Storage Used", value: "2.4 TB", icon: <Database className="text-violet-400" /> },
        ].map((stat) => (
          <div key={stat.label} className="p-6 glass rounded-2xl border-white/5">
            <div className="flex items-center gap-3 mb-4 text-slate-500">
              {stat.icon}
              <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 border-white/5">
        <h3 className="text-xl font-bold mb-6">Recent System Logs</h3>
        <div className="space-y-4">
          {[
            { event: "New enterprise user registration", user: "vertex_ai", time: "2 mins ago", level: "info" },
            { event: "Database backup completed", user: "system", time: "15 mins ago", level: "success" },
            { event: "High latency detected in Node-04", user: "monitor", time: "45 mins ago", level: "warning" },
            { event: "API Key regenerated for user #1240", user: "admin_01", time: "1 hour ago", level: "security" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 text-sm">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${log.level === 'info' ? 'bg-blue-500' : log.level === 'success' ? 'bg-emerald-500' : log.level === 'warning' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                <span className="font-bold">{log.event}</span>
              </div>
              <div className="flex items-center gap-8 text-slate-500">
                <span>{log.user}</span>
                <span className="w-24 text-right">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
