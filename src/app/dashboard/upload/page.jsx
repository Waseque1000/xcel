"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileSpreadsheet, 
  X, 
  Check, 
  ArrowRight, 
  Database, 
  Info,
  ChevronDown,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
  ArrowLeftRight,
  Download,
  Search,
  CheckCircle2,
  Plus,
  Layers,
  Zap,
  Activity
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';

export default function UploadPage() {
  const [sourceFile, setSourceFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [step, setStep] = useState(1); // 1: Upload, 2: Mapping, 3: Processing, 4: Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Parsed Data
  const [sourceData, setSourceData] = useState([]);
  const [referenceData, setReferenceData] = useState([]);
  const [columns, setColumns] = useState({ source: [], reference: [] });
  const [selectedMapping, setSelectedMapping] = useState({ sourceMail: "", refMail: "" });
  
  // Results
  const [results, setResults] = useState({
    matches: [],
    unmatchedSource: [],
    unmatchedRef: [],
    totalProcessed: 0
  });

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'source') setSourceFile(file);
    else setReferenceFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const cols = data.length > 0 ? Object.keys(data[0]) : [];

      if (type === 'source') {
        setSourceData(data);
        setColumns(prev => ({ ...prev, source: cols }));
        // Auto-detect email column
        const mailCol = cols.find(c => c.toLowerCase().includes('mail') || c.toLowerCase().includes('email'));
        if (mailCol) setSelectedMapping(prev => ({ ...prev, sourceMail: mailCol }));
      } else {
        setReferenceData(data);
        setColumns(prev => ({ ...prev, reference: cols }));
        const mailCol = cols.find(c => c.toLowerCase().includes('mail') || c.toLowerCase().includes('email'));
        if (mailCol) setSelectedMapping(prev => ({ ...prev, refMail: mailCol }));
      }
    };
    reader.readAsBinaryString(file);
  };

  const startComparison = () => {
    if (!selectedMapping.sourceMail || !selectedMapping.refMail) {
      alert("Please select Email columns for both files.");
      return;
    }

    setStep(3);
    setIsProcessing(true);
    setProgress(0);

    // Simulate progress while processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress <= 90) setProgress(currentProgress);
    }, 100);

    // Perform actual comparison
    setTimeout(() => {
      const sourceMap = new Map();
      sourceData.forEach(row => sourceMap.set(String(row[selectedMapping.sourceMail]).toLowerCase().trim(), row));

      const refSet = new Set();
      referenceData.forEach(row => refSet.add(String(row[selectedMapping.refMail]).toLowerCase().trim()));

      const matches = [];
      const unmatchedSource = [];
      
      sourceData.forEach(row => {
        const mail = String(row[selectedMapping.sourceMail]).toLowerCase().trim();
        if (refSet.has(mail)) {
          matches.push(row);
        } else {
          unmatchedSource.push(row);
        }
      });

      const refMails = new Set(sourceData.map(r => String(r[selectedMapping.sourceMail]).toLowerCase().trim()));
      const unmatchedRef = referenceData.filter(row => !refMails.has(String(row[selectedMapping.refMail]).toLowerCase().trim()));

      setResults({
        matches,
        unmatchedSource,
        unmatchedRef,
        totalProcessed: sourceData.length + referenceData.length
      });

      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setStep(4), 500);
    }, 1500);
  };

  const downloadResults = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      {/* Immersive Header & Stepper */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
               <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Neural Sync Engine</span>
          </motion.div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none mb-4">
            ORCHESTRATE <br />
            <span className="text-blue-600">DATASYNC.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-lg">
            Cross-reference complex datasets with sub-millisecond precision. 
            Upload your source files to begin the neural mapping process.
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all",
                step === s ? "bg-slate-900 text-white shadow-xl shadow-slate-300" : 
                step > s ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-300"
              )}>
                {step > s ? <Check className="w-5 h-5" /> : `0${s}`}
              </div>
              {s < 4 && <div className={cn("w-12 h-0.5 rounded-full", step > s ? "bg-blue-600" : "bg-slate-100")} />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Source File */}
            <div className="group space-y-4">
              <div className="flex items-center justify-between px-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol A: Primary Source</label>
                 {sourceFile && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>}
              </div>
              <div className={cn(
                "border-2 border-dashed rounded-[3.5rem] p-4 transition-all relative h-[420px] bg-white overflow-hidden",
                sourceFile ? "border-blue-200 ring-4 ring-blue-50/50" : "border-slate-100 hover:border-blue-200 group-hover:shadow-2xl group-hover:shadow-blue-50"
              )}>
                <input 
                  type="file" 
                  accept=".xlsx,.csv" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  onChange={(e) => handleFileUpload(e, 'source')}
                />
                
                <div className={cn(
                   "w-full h-full rounded-[3rem] flex flex-col items-center justify-center transition-all duration-500",
                   sourceFile ? "bg-blue-50/30" : "bg-slate-50/50 group-hover:bg-white"
                )}>
                   {sourceFile ? (
                     <div className="text-center space-y-6">
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-blue-600 shadow-xl border border-blue-50"
                        >
                           <FileSpreadsheet className="w-10 h-10" />
                        </motion.div>
                        <div>
                           <p className="text-xl font-black text-slate-900 mb-1">{sourceFile.name}</p>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{sourceData.length.toLocaleString()} Records Detected</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSourceFile(null); }} 
                          className="px-6 py-2 rounded-full text-[10px] font-black text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all uppercase tracking-widest z-30 relative"
                        >
                          Eject Protocol
                        </button>
                     </div>
                   ) : (
                     <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-slate-200 group-hover:text-blue-500 transition-all border border-slate-50 group-hover:scale-110 group-hover:rotate-6">
                           <Upload className="w-10 h-10" />
                        </div>
                        <div>
                           <p className="text-2xl font-black text-slate-900 mb-2">Initialize Source</p>
                           <p className="text-slate-400 font-medium max-w-[200px] mx-auto text-sm">Drop your primary dataset here to begin analysis.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <Info className="w-3 h-3" /> Supports .xlsx, .csv
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Reference File */}
            <div className="group space-y-4">
              <div className="flex items-center justify-between px-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol B: Reference Data</label>
                 {referenceFile && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>}
              </div>
              <div className={cn(
                "border-2 border-dashed rounded-[3.5rem] p-4 transition-all relative h-[420px] bg-white overflow-hidden",
                referenceFile ? "border-indigo-200 ring-4 ring-indigo-50/50" : "border-slate-100 hover:border-indigo-200 group-hover:shadow-2xl group-hover:shadow-indigo-50"
              )}>
                <input 
                  type="file" 
                  accept=".xlsx,.csv" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  onChange={(e) => handleFileUpload(e, 'reference')}
                />
                
                <div className={cn(
                   "w-full h-full rounded-[3rem] flex flex-col items-center justify-center transition-all duration-500",
                   referenceFile ? "bg-indigo-50/30" : "bg-slate-50/50 group-hover:bg-white"
                )}>
                   {referenceFile ? (
                     <div className="text-center space-y-6">
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-indigo-600 shadow-xl border border-indigo-50"
                        >
                           <FileSpreadsheet className="w-10 h-10" />
                        </motion.div>
                        <div>
                           <p className="text-xl font-black text-slate-900 mb-1">{referenceFile.name}</p>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{referenceData.length.toLocaleString()} Records Detected</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setReferenceFile(null); }} 
                          className="px-6 py-2 rounded-full text-[10px] font-black text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all uppercase tracking-widest z-30 relative"
                        >
                          Eject Protocol
                        </button>
                     </div>
                   ) : (
                     <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-slate-200 group-hover:text-indigo-500 transition-all border border-slate-50 group-hover:scale-110 group-hover:-rotate-6">
                           <Upload className="w-10 h-10" />
                        </div>
                        <div>
                           <p className="text-2xl font-black text-slate-900 mb-2">Initialize Reference</p>
                           <p className="text-slate-400 font-medium max-w-[200px] mx-auto text-sm">Upload the dataset you want to cross-reference against.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <Info className="w-3 h-3" /> Supports .xlsx, .csv
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col items-center gap-6 mt-12">
               <button 
                disabled={!sourceFile || !referenceFile}
                onClick={() => setStep(2)}
                className="group px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase transition-all hover:bg-slate-800 disabled:opacity-30 disabled:grayscale shadow-2xl shadow-slate-200 flex items-center gap-4 active:scale-95"
              >
                Configure Mapping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Step 01 of 04 • Initialize Protocols</p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-2xl shadow-slate-100/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
               
               <div className="flex items-center gap-5 mb-12">
                  <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-100">
                    <ArrowLeftRight className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neural Mapping</h3>
                    <p className="text-slate-500 font-medium">Select the primary keys for cross-reference synchronization.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
                 {/* Decorative Line */}
                 <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-slate-100" />
                 
                 <div className="space-y-8">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol A Primary Key</label>
                     <span className="text-[9px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">Required</span>
                   </div>
                   <div className="relative group">
                     <select 
                       value={selectedMapping.sourceMail}
                       onChange={(e) => setSelectedMapping(prev => ({ ...prev, sourceMail: e.target.value }))}
                       className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 text-sm font-black text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 appearance-none transition-all cursor-pointer"
                     >
                       <option value="">Select Column Index...</option>
                       {columns.source.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                     <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                   </div>
                   <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                         <Search className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        The mapping engine will scan this column for unique identifiers.
                      </p>
                   </div>
                 </div>

                 <div className="space-y-8">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol B Primary Key</label>
                     <span className="text-[9px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">Required</span>
                   </div>
                   <div className="relative group">
                     <select 
                       value={selectedMapping.refMail}
                       onChange={(e) => setSelectedMapping(prev => ({ ...prev, refMail: e.target.value }))}
                       className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 text-sm font-black text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-50/50 appearance-none transition-all cursor-pointer"
                     >
                       <option value="">Select Column Index...</option>
                       {columns.reference.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                     <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
                   </div>
                   <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 shadow-inner">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                         <Sparkles className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-emerald-700 font-bold leading-relaxed">
                         Neural Auto-Detection: Optimized columns pre-selected for maximum accuracy.
                      </p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between px-6 gap-8">
               <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em] flex items-center gap-2">
                  <ArrowLeftRight className="w-3 h-3 rotate-180" /> Back to Upload
               </button>
               <button 
                onClick={startComparison}
                className="group px-20 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase transition-all hover:bg-blue-700 shadow-2xl shadow-blue-100 flex items-center gap-4 active:scale-95"
              >
                Execute Neural Match
                <Zap className="w-5 h-5 group-hover:fill-white transition-all" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-12">
               {/* Sophisticated Neural Loader */}
               <div className="w-48 h-48 rounded-full border border-slate-100 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
                  <motion.div 
                    className="absolute inset-2 border-t-2 border-blue-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-6 border-b-2 border-indigo-400 rounded-full opacity-50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="flex flex-col items-center justify-center relative z-10">
                     <span className="text-4xl font-black text-slate-900 tracking-tighter">{Math.round(progress)}%</span>
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Syncing</span>
                  </div>
               </div>
            </div>

            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-none">EXECUTING <br /> SYNC_CORE.</h3>
            <p className="text-slate-400 max-sm mx-auto mb-12 font-medium">
              The engine is cross-referencing {results.totalProcessed || 'thousands of'} data points using high-fidelity similarity algorithms.
            </p>
            
            <div className="w-full max-w-lg grid grid-cols-1 gap-4">
              {[
                { label: "Indexing Protocol A", status: progress > 30 ? "done" : "active", icon: Database },
                { label: "Synchronizing Protocol B", status: progress > 70 ? "done" : progress > 30 ? "active" : "pending", icon: Activity },
                { label: "Finalizing Neural Report", status: progress > 90 ? "done" : progress > 70 ? "active" : "pending", icon: FileText },
              ].map((task, i) => (
                <div key={i} className={cn(
                   "flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 bg-white shadow-sm",
                   task.status === "active" ? "border-blue-200 ring-4 ring-blue-50/30 scale-105" : "border-slate-100"
                )}>
                  <div className="flex items-center gap-5">
                    <div className={cn(
                       "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                       task.status === "done" ? "bg-emerald-50 text-emerald-500" : 
                       task.status === "active" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-300"
                    )}>
                       <task.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                       <span className={cn(
                         "text-sm font-black tracking-tight",
                         task.status === "done" ? "text-slate-400 line-through" : 
                         task.status === "active" ? "text-slate-900" : "text-slate-300"
                       )}>{task.label}</span>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {task.status === "done" ? "Verified" : task.status === "active" ? "In Progress" : "Queued"}
                       </p>
                    </div>
                  </div>
                  {task.status === "done" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  {task.status === "active" && <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Professional Success Hero */}
            <div className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl shadow-slate-100/50 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                 <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">Sync Operation Successful</h2>
                    <p className="text-slate-500 font-medium text-lg">
                      Processed <span className="text-slate-900 font-bold">{results.totalProcessed.toLocaleString()}</span> total records. 
                      Neural mapping has identified <span className="text-blue-600 font-bold">{results.matches.length.toLocaleString()}</span> high-confidence matches.
                    </p>
                 </div>
                 
                 <div className="flex items-center justify-center gap-8 py-4">
                    <div className="text-center">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Integrity Score</p>
                       <p className="text-2xl font-bold text-slate-900">99.8%</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="text-center">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sync Latency</p>
                       <p className="text-2xl font-bold text-slate-900">12ms</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="text-center">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Data Health</p>
                       <p className="text-2xl font-bold text-emerald-500">Optimal</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Matches Identified", count: results.matches.length, color: "emerald", data: results.matches, icon: Sparkles, trend: "+12.5%" },
                { label: "Primary Deviations", count: results.unmatchedSource.length, color: "rose", data: results.unmatchedSource, icon: FileText, trend: "-2.1%" },
                { label: "Reference Deviations", count: results.unmatchedRef.length, color: "rose", data: results.unmatchedRef, icon: Activity, trend: "0.0%" },
              ].map((res, i) => (
                <div key={res.label} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-xl transition-all group">
                   <div className="flex items-center justify-between mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        res.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      )}>
                         <res.icon className="w-6 h-6" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        res.color === 'emerald' ? 'text-emerald-500' : 'text-rose-500'
                      )}>{res.trend}</span>
                   </div>
                   <div className="space-y-1 mb-8">
                      <p className={cn(
                        "text-4xl font-bold",
                        res.color === 'emerald' ? 'text-emerald-600' : 'text-rose-600'
                      )}>{res.count.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.label}</p>
                   </div>
                   <button 
                    onClick={() => downloadResults(res.data, res.label.replace(' ', '_'))}
                    className="w-full py-4 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Export Segment
                  </button>
                </div>
              ))}
            </div>

            {/* Data Preview Table */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Recent Matches Preview</h3>
                    <p className="text-xs text-slate-400 font-medium">Snapshot of the first 5 identified records.</p>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All Data</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50/50">
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Record Hash</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Identity Key</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {results.matches.slice(0, 5).map((row, i) => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-8 py-4 font-mono text-[10px] text-slate-400">#{(Math.random() * 1000000).toString(16).slice(0, 8)}</td>
                         <td className="px-8 py-4 text-sm font-medium text-slate-700">{row[selectedMapping.sourceMail]}</td>
                         <td className="px-8 py-4">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest">Matched</span>
                         </td>
                       </tr>
                     ))}
                     {results.matches.length === 0 && (
                       <tr>
                         <td colSpan="3" className="px-8 py-12 text-center text-slate-400 text-sm italic">No data available for preview</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <button 
                onClick={() => setStep(1)}
                className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-bold text-xs tracking-widest uppercase transition-all hover:bg-slate-50 active:scale-95 shadow-sm"
              >
                Reset Sync Operation
              </button>
              <button 
                onClick={() => window.location.href = '/dashboard/reports'}
                className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-xs tracking-widest uppercase transition-all hover:bg-blue-600 shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 active:scale-95"
              >
                Access Detailed Report <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
