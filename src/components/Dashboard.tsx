/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  CalendarRange, Users, HelpCircle, FilePlus2, DollarSign, Database, 
  CheckCircle, RefreshCw, Sparkles, Send, ShieldAlert, BookOpen 
} from "lucide-react";
import { NuaspectDB } from "../db";
import { Blog, Registration, ContactQuery, SessionConfig } from "../types";

interface DashboardProps {
  session: SessionConfig;
  setSession: (config: SessionConfig) => void;
  onRefreshSession: () => void;
}

export function Dashboard({ session, setSession, onRefreshSession }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"session" | "registered" | "queries" | "write-blog">("session");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  
  // Forms states
  const [sessionForm, setSessionForm] = useState<SessionConfig>({ ...session });
  const [blogForm, setBlogForm] = useState({ title: "", content: "", author: "Dr. Elena Vance, PsyD" });
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Load registered users & queries from DB
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const regs = await NuaspectDB.getRegistrations();
      const qrs = await NuaspectDB.getQueries();
      setRegistrations(regs);
      setQueries(qrs);
    } catch (e) {
      console.error("Failed to load dashboard statistics:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Synchronize internal session configuration state when parent changes
  useEffect(() => {
    setSessionForm({ ...session });
  }, [session]);

  // Handle Updates to Live Session Config
  const handleUpdateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    try {
      const priceNum = Number(sessionForm.price);
      if (isNaN(priceNum) || priceNum < 0) {
        setMsg({ text: "Fee must be a non-negative number.", type: "error" });
        return;
      }
      
      const newConfig: SessionConfig = {
        topic: sessionForm.topic,
        date: sessionForm.date,
        time: sessionForm.time,
        price: priceNum
      };

      await NuaspectDB.updateSessionConfig(newConfig);
      setSession(newConfig);
      onRefreshSession();
      setMsg({ text: "Live academic session updated successfully across the home page!", type: "success" });
    } catch (err) {
      setMsg({ text: "Could not save session settings.", type: "error" });
    }
  };

  // Handle Blog Uploading
  const handlePublishBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    if (!blogForm.title || !blogForm.content || !blogForm.author) {
      setMsg({ text: "All fields are required to publish an academic column.", type: "error" });
      return;
    }

    try {
      await NuaspectDB.addBlog({
        title: blogForm.title,
        content: blogForm.content,
        author: blogForm.author,
        createdAt: new Date().toISOString()
      });
      setBlogForm({ title: "", content: "", author: "Dr. Elena Vance, PsyD" });
      setMsg({ text: "A new mental wellness column has been securely added to home archives!", type: "success" });
    } catch (err) {
      setMsg({ text: "Failed to publish blog.", type: "error" });
    }
  };

  // Computed summary metrics
  const totalPaidRevenue = registrations.reduce((sum, reg) => sum + (reg.status === "paid" ? reg.price : 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      
      {/* 1. Header with live DB sync banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] bg-[#EFF6FF] text-amalfi border border-[#BFDBFE] font-mono tracking-widest px-2.5 py-0.5 rounded-sm font-bold uppercase">
              Conductor Access Portal (Private Dashboard)
            </span>
            <div className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase font-mono border ${
              NuaspectDB.isLive() 
                ? "bg-emerald-50 text-[#10B981] border-emerald-100" 
                : "bg-amber-50 text-amber-600 border-amber-100"
            }`}>
              <Database className="w-3 h-3" />
              <span>{NuaspectDB.isLive() ? "Live Firestore Connected" : "Local Sandbox Active"}</span>
            </div>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-gray-950 mt-2.5">
            Nuaspect Academic Control Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure future topics, set registration fees, monitor active registrations, post blog columns, and correspond with incoming client queries.
          </p>
        </div>

        <button 
          onClick={loadDashboardData}
          className="flex items-center gap-1.5 text-xs text-amalfi hover:bg-[#EFF6FF] hover:text-blue-900 bg-[#EFF6FF]/60 px-4 py-2 border border-[#BFDBFE] rounded-lg font-bold tracking-wider uppercase transition-all self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Fetch Raw Logs
        </button>
      </div>

      {/* 2. Visual summary metric charts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xl shadow-gray-100/40 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#EFF6FF] border border-[#BFDBFE] text-amalfi flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="block text-[9px] font-mono tracking-wider text-gray-400 font-bold uppercase">Attendees</span>
            <span className="font-display font-extrabold text-xl text-gray-950">{registrations.length}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xl shadow-gray-100/40 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-100 text-[#10B981] flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[9px] font-mono tracking-wider text-gray-400 font-bold uppercase">Gross Revenue</span>
            <span className="font-display font-extrabold text-xl text-[#10B981]">₹{totalPaidRevenue}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xl shadow-gray-100/40 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[9px] font-mono tracking-wider text-gray-400 font-bold uppercase">Pending Queries</span>
            <span className="font-display font-extrabold text-xl text-gray-950">{queries.length}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xl shadow-gray-100/40 flex items-center gap-4 col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-sm bg-[#EFF6FF] border border-[#BFDBFE] text-amalfi flex items-center justify-center shrink-0">
            <CalendarRange className="w-4.5 h-4.5" />
          </div>
          <div className="truncate">
            <span className="block text-[9px] font-mono tracking-wider text-gray-400 font-bold uppercase">Active Cost (IST)</span>
            <span className="font-display font-extrabold text-xs sm:text-xs text-gray-800 truncate block uppercase tracking-wide">₹{session.price} / Ticket</span>
          </div>
        </div>
      </div>

      {/* 3. Operational Inner Navigation */}
      <div className="flex border border-gray-200 bg-gray-50/50 p-1.5 rounded-lg space-x-1.5 font-bold">
        {[
          { id: "session", label: "Session Config", icon: CalendarRange },
          { id: "registered", label: `Registered Clients (${registrations.length})`, icon: Users },
          { id: "queries", label: `Client Queries (${queries.length})`, icon: HelpCircle },
          { id: "write-blog", label: "Publish Blog Column", icon: FilePlus2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded text-xs md:text-xs transition-all uppercase tracking-wider cursor-pointer ${
                isActive 
                  ? "bg-white text-amalfi font-extrabold shadow-sm border border-gray-200" 
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">
                {tab.id === "session" ? "Config" : tab.id === "registered" ? "Clients" : tab.id === "queries" ? "Queries" : "Blog"}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Display Alerts/Messages */}
      {msg && (
        <div className={`p-4 rounded-lg text-xs flex items-center gap-2.5 border ${
          msg.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
            : "bg-red-50 text-red-705 border-red-100"
        }`}>
          {msg.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <ShieldAlert className="w-5 h-5 text-red-500" />}
          <span className="font-bold uppercase tracking-wider">{msg.text}</span>
        </div>
      )}

      {/* 5. Dynamically Render Active Operations View */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xl shadow-gray-100/40">
        {activeTab === "session" && (
          <form onSubmit={handleUpdateSession} className="space-y-6">
            <div className="border-b pb-4 border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-gray-950">Lobby Registration Config</h3>
                <p className="text-xs text-gray-400 mt-1">Values input here instantly update dynamic pricing blocks, date/times, and topics on the home landing page.</p>
              </div>
              <Sparkles className="w-5 h-5 text-[#10B981]" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Seminar Topic Title</label>
                <input 
                  type="text" 
                  required
                  value={sessionForm.topic}
                  onChange={e => setSessionForm({ ...sessionForm, topic: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-medium text-gray-900"
                  placeholder="Topic of the upcoming dynamic cohort session..."
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Event Date (YYYY-MM-DD)</label>
                  <input 
                    type="date" 
                    required
                    value={sessionForm.date}
                    onChange={e => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Event Time (IST)</label>
                  <input 
                    type="text" 
                    required
                    value={sessionForm.time}
                    onChange={e => setSessionForm({ ...sessionForm, time: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-medium text-gray-900"
                    placeholder="19:00"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Interactive Seat Fee (INR)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono font-bold">₹</span>
                    <input 
                      type="number" 
                      required
                      value={sessionForm.price}
                      onChange={e => setSessionForm({ ...sessionForm, price: Number(e.target.value) })}
                      className="w-full text-xs pl-7 pr-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-mono font-bold text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-amalfi hover:bg-[#111827] text-white py-3.5 px-6 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer shadow-lg shadow-blue-100"
            >
              Update Live Platform
            </button>
          </form>
        )}

        {activeTab === "registered" && (
          <div className="space-y-4">
            <div className="border-b pb-4 border-gray-100">
              <h3 className="font-display font-extrabold text-lg text-gray-950">Live Seminar Enrollments ({registrations.length})</h3>
              <p className="text-xs text-gray-400 mt-1">Incoming admissions that succeeded checkout simulations on the gateway.</p>
            </div>

            {registrations.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-8 text-center bg-gray-50/50 border border-dashed rounded-lg">No active enrollments for this session.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#EFF6FF]/60 text-amalfi border-b border-gray-200 font-mono text-[9px] uppercase tracking-wider font-extrabold">
                      <th className="p-4">Client Details</th>
                      <th className="p-4">Seminar Booked</th>
                      <th className="p-4">Payment Details</th>
                      <th className="p-4">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50/30">
                        <td className="p-4">
                          <p className="font-extrabold text-gray-950">{reg.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{reg.email}</p>
                          <p className="text-gray-400 text-[10px] mt-0.5 font-mono">{reg.phone}</p>
                        </td>
                        <td className="p-4 max-w-[200px]">
                          <p className="font-bold text-gray-800 line-clamp-1" title={reg.topic}>{reg.topic}</p>
                          <span className="text-[10px] text-[#10B981] font-mono font-bold uppercase tracking-wider block mt-1">
                            {reg.date} • {reg.time}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold font-mono tracking-wider bg-emerald-50 text-[#10B981] border border-emerald-100 uppercase">
                            {reg.status}
                          </span>
                          <p className="font-mono text-[9px] text-gray-400 mt-1">{reg.paymentId}</p>
                          <p className="font-mono text-xs text-gray-500 font-extrabold mt-0.5">₹{reg.price}</p>
                        </td>
                        <td className="p-4 text-xs text-gray-400 font-mono font-bold uppercase">
                          {new Date(reg.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "queries" && (
          <div className="space-y-4">
            <div className="border-b pb-4 border-gray-100">
              <h3 className="font-display font-extrabold text-lg text-gray-950">Client Letters & Consultation Logs ({queries.length})</h3>
              <p className="text-xs text-gray-400 mt-1">Review messages entered in the contact portals.</p>
            </div>

            {queries.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-8 text-center bg-gray-50/50 border border-dashed rounded-lg">No inbound queries recorded.</p>
            ) : (
              <div className="space-y-4">
                {queries.map((q) => (
                  <div key={q.id} className="p-5 rounded-lg bg-gray-50/50 border border-gray-200 space-y-3 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-extrabold text-sm text-gray-900 block">{q.name}</span>
                        <span className="text-gray-400 font-mono font-bold block mt-0.5 uppercase tracking-wide text-[10px]">{q.email} • {q.phone}</span>
                      </div>
                      <span className="text-gray-400 font-mono bg-white border border-gray-200 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                        {new Date(q.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </div>
                    <div className="p-3.5 rounded bg-white border border-gray-100 text-xs sm:text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                      {q.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "write-blog" && (
          <form onSubmit={handlePublishBlog} className="space-y-5">
            <div className="border-b pb-4 border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-gray-950">Publish Wellness Column</h3>
                <p className="text-xs text-gray-400 mt-1">Write an article containing therapy strategies. It will be pushed sequentially onto the library archives.</p>
              </div>
              <BookOpen className="w-5 h-5 text-[#10B981]" />
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Column Title</label>
                  <input 
                    type="text" 
                    required
                    value={blogForm.title}
                    onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-medium text-gray-900"
                    placeholder="Slowing down racing thoughts: practical tips"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Conductor / Author Signature</label>
                  <input 
                    type="text" 
                    required
                    value={blogForm.author}
                    onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 font-medium text-gray-900"
                    placeholder="Dr. Elena Vance, PsyD"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Article Body Content (Support Markdown paragraphs)</label>
                <textarea 
                  required
                  rows={8}
                  value={blogForm.content}
                  onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 resize-none font-sans"
                  placeholder="Write clear, supportive clinical guidelines or advice here. Standard formatting rules apply..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-amalfi hover:bg-[#111827] text-white py-3.5 px-6 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100"
            >
              <Send className="w-4 h-4" />
              Publish to Archives
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
