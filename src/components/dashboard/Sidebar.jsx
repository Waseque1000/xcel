"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileSearch, 
  History, 
  Settings, 
  LogOut,
  Database,
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", href: "/dashboard" },
  { icon: <UploadCloud className="w-4 h-4" />, label: "Upload & Match", href: "/dashboard/upload" },
  { icon: <FileSearch className="w-4 h-4" />, label: "Reports", href: "/dashboard/reports" },
  { icon: <History className="w-4 h-4" />, label: "History", href: "/dashboard/history" },
  { icon: <Users className="w-4 h-4" />, label: "Team", href: "/dashboard/team" },
];

const secondaryItems = [
  { icon: <Settings className="w-4 h-4" />, label: "Settings", href: "/dashboard/settings" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "Admin", href: "/dashboard/admin" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-slate-100 flex flex-col"
    >
      {/* Logo Area */}
      <Link href="/" className="p-8 block">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                <Database className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 whitespace-nowrap">DataMatch <span className="text-blue-600">Pro</span></span>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-lg shadow-blue-100">
              <Database className="text-white w-6 h-6" />
            </div>
          )}
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
              pathname === item.href 
                ? "bg-blue-50 text-blue-600 border border-blue-100" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}>
              <div className={cn(
                "transition-transform group-hover:scale-110 relative z-10",
                pathname === item.href ? "text-blue-600" : "text-slate-400"
              )}>
                {item.icon}
              </div>
              {!collapsed && <span className="font-bold text-[13px] tracking-tight relative z-10">{item.label}</span>}
              
              {pathname === item.href && (
                <motion.div 
                  layoutId="sidebar-active" 
                  className="absolute inset-0 bg-blue-50/50 -z-10" 
                />
              )}
            </div>
          </Link>
        ))}

        <div className="py-6 px-4">
          {!collapsed && <div className="h-px bg-slate-100 w-full" />}
        </div>

        {secondaryItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
              pathname === item.href 
                ? "bg-blue-50 text-blue-600 border border-blue-100" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}>
              <div className={cn(
                "transition-transform group-hover:scale-110",
                pathname === item.href ? "text-blue-600" : "text-slate-400"
              )}>
                {item.icon}
              </div>
              {!collapsed && <span className="font-bold text-[13px] tracking-tight">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="p-5 mx-4 mb-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Pro Intelligence</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-medium">Unlock neural matching for enterprise scale datasets.</p>
            <button className="w-full py-2.5 bg-slate-900 text-white text-[11px] font-bold rounded-full transition-all hover:bg-slate-800 shadow-md shadow-slate-100">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div className="p-6 border-t border-slate-100">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <div className="mt-6 flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-rose-500 cursor-pointer transition-all group text-xs font-bold uppercase tracking-widest">
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span>Log out</span>}
        </div>
      </div>
    </motion.aside>
  );
}
