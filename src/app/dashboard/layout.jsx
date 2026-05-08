"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white flex selection:bg-blue-600/10">
      <Sidebar collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
      
      <main 
        className="flex-1 flex flex-col transition-all duration-500 ease-in-out"
        style={{ marginLeft: isCollapsed ? "80px" : "280px" }}
      >
        <TopBar />
        
        <div className="flex-1 p-6 md:p-10 overflow-y-auto grid-bg bg-slate-50/30">
          <AnimatePresence mode="wait">
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
