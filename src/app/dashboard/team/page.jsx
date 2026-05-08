"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, MoreVertical, Mail, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const team = [
  { id: 1, name: "Alex Rivera", role: "Owner", email: "alex.rivera@example.com", status: "Active" },
  { id: 2, name: "Sarah Chen", role: "Admin", email: "s.chen@company.io", status: "Active" },
  { id: 3, name: "Michael Park", role: "Member", email: "m.park@data.org", status: "Away" },
  { id: 4, name: "Emma Wilson", role: "Member", email: "emma.w@marketing.com", status: "Active" },
];

export default function TeamPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Collaboration</h1>
          <p className="text-slate-400">Manage your organization's members and their permissions.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all glow-blue flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass rounded-3xl border-white/5 relative group"
          >
            <button className="absolute top-6 right-6 p-1 text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-white/5 relative">
                <Users className="w-8 h-8 text-blue-400" />
                <div className={cn(
                  "absolute bottom-1 right-1 w-4 h-4 rounded-full border-4 border-slate-950",
                  member.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                )} />
              </div>
              <h4 className="text-lg font-bold mb-1">{member.name}</h4>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">{member.role}</p>
              
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-slate-400 overflow-hidden">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-slate-400">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>Full Access</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
