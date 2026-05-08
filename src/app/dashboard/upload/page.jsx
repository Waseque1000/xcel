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
  CheckCircle2
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
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      {/* Header & Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-slate-900">Compare Datasets</h1>
          <p className="text-slate-500 font-medium">Cross-reference two Excel files with Email priority matching.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-full border border-slate-100">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all",
                step === s ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : 
                step > s ? "bg-blue-600 text-white" : "bg-white text-slate-400 border border-slate-200"
              )}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && <div className={cn("w-6 h-px", step > s ? "bg-blue-600" : "bg-slate-200")} />}
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Source File */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">File A: Primary Source</label>
              <div className={cn(
                "border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all relative overflow-hidden h-[340px]",
                sourceFile ? "border-blue-200 bg-blue-50/30" : "border-slate-200 hover:border-slate-300 bg-white"
              )}>
                <input 
                  type="file" 
                  accept=".xlsx,.csv" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileUpload(e, 'source')}
                />
                {sourceFile ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto text-blue-600">
                      <FileSpreadsheet className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{sourceFile.name}</p>
                      <p className="text-xs text-slate-500">{sourceData.length} rows detected</p>
                    </div>
                    <button onClick={() => setSourceFile(null)} className="text-xs font-bold text-rose-500 hover:underline">Remove file</button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-slate-900">Upload Source File</p>
                    <p className="text-xs text-slate-400">Drag & drop .xlsx or .csv</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reference File */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">File B: Reference Data</label>
              <div className={cn(
                "border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all relative overflow-hidden h-[340px]",
                referenceFile ? "border-indigo-200 bg-indigo-50/30" : "border-slate-200 hover:border-slate-300 bg-white"
              )}>
                <input 
                  type="file" 
                  accept=".xlsx,.csv" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileUpload(e, 'reference')}
                />
                {referenceFile ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto text-indigo-600">
                      <FileSpreadsheet className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{referenceFile.name}</p>
                      <p className="text-xs text-slate-500">{referenceData.length} rows detected</p>
                    </div>
                    <button onClick={() => setReferenceFile(null)} className="text-xs font-bold text-rose-500 hover:underline">Remove file</button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-slate-900">Upload Reference File</p>
                    <p className="text-xs text-slate-400">Compare against this file</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
               <button 
                disabled={!sourceFile || !referenceFile}
                onClick={() => setStep(2)}
                className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-100 flex items-center gap-3"
              >
                Proceed to Mapping
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <ArrowLeftRight className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Define Match Priority</h3>
                  <p className="text-sm text-slate-500">Select the columns to use for cross-reference. (Email recommended)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">File A Column (Source)</label>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                  </div>
                  <div className="relative group">
                    <select 
                      value={selectedMapping.sourceMail}
                      onChange={(e) => setSelectedMapping(prev => ({ ...prev, sourceMail: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none transition-all"
                    >
                      <option value="">Select Email Column...</option>
                      {columns.source.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-[11px] text-slate-500 leading-relaxed italic">
                    Tip: DataMatch Pro works best when both files use the same unique identifier like Email or NID.
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">File B Column (Ref)</label>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                  </div>
                  <div className="relative group">
                    <select 
                      value={selectedMapping.refMail}
                      onChange={(e) => setSelectedMapping(prev => ({ ...prev, refMail: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none transition-all"
                    >
                      <option value="">Select Email Column...</option>
                      {columns.reference.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-[11px] text-emerald-700 font-medium">
                    <Sparkles className="w-4 h-4" />
                    AI has pre-selected columns with the highest mail similarity.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
               <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Back to Upload</button>
               <button 
                onClick={startComparison}
                className="px-12 py-5 bg-blue-600 text-white rounded-full font-bold transition-all hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center gap-3"
              >
                Start Comparison
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-10">
              <div className="w-32 h-32 border-4 border-slate-100 rounded-full" />
              <motion.div 
                className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-slate-900">{Math.round(progress)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Cross-Referencing Data...</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
              We are analyzing unique email identifiers across both datasets. 
              This will only take a moment.
            </p>
            
            <div className="w-full max-w-md space-y-4">
              {[
                { label: "Indexing File A", status: progress > 30 ? "done" : "active" },
                { label: "Identifying Matches in File B", status: progress > 70 ? "done" : progress > 30 ? "active" : "pending" },
                { label: "Generating Similarity Report", status: progress > 90 ? "done" : progress > 70 ? "active" : "pending" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    {task.status === "done" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                     task.status === "active" ? <Loader2 className="w-5 h-5 text-blue-600 animate-spin" /> : 
                     <div className="w-5 h-5 rounded-full border-2 border-slate-200" />}
                    <span className={cn(
                      "text-sm font-bold",
                      task.status === "done" ? "text-slate-400" : 
                      task.status === "active" ? "text-slate-900" : "text-slate-300"
                    )}>{task.label}</span>
                  </div>
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
            className="space-y-10"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Check className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Matching Complete!</h3>
              <p className="text-blue-100 max-w-xl mx-auto text-lg font-medium">
                Successfully cross-referenced <span className="text-white font-bold">{results.totalProcessed}</span> records. 
                Found <span className="text-white font-bold">{results.matches.length}</span> identical records based on Email priority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Exact Matches", count: results.matches.length, color: "emerald", data: results.matches, desc: "Present in both files" },
                { label: "Unique to File A", count: results.unmatchedSource.length, color: "blue", data: results.unmatchedSource, desc: "Not found in Reference" },
                { label: "Unique to File B", count: results.unmatchedRef.length, color: "rose", data: results.unmatchedRef, desc: "Missing from Source" },
              ].map((res) => (
                <div key={res.label} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] group hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      res.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                      res.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                    )}>{res.label}</div>
                    <FileText className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <div className="mb-8">
                    <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{res.count.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 font-medium">{res.desc}</p>
                  </div>
                  <button 
                    onClick={() => downloadResults(res.data, res.label.replace(' ', '_'))}
                    className="w-full py-3 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl text-xs font-bold transition-all hover:bg-slate-900 hover:text-white flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-slate-100"
                  >
                    <Download className="w-4 h-4" />
                    Download Dataset
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold transition-all hover:bg-slate-50"
              >
                Start New Comparison
              </button>
              <button 
                onClick={() => window.location.href = '/dashboard/reports'}
                className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-slate-800 shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
              >
                View Detailed Report
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
