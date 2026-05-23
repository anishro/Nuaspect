/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquareCode, Check, ShieldAlert, HeartHandshake, Twitter, Linkedin, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { NuaspectDB } from "../db";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      await NuaspectDB.submitQuery({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not specified",
        message: formData.message,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setErrorMsg("Failed to dispatch query. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-16">
      
      {/* Page header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-[#10B981] bg-[#EFF6FF] px-3 py-1 rounded-sm border border-[#BFDBFE] uppercase">
          DIRECT ASSISTANCE
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 mt-2">
          Connect With Our Facilitating Team
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Whether you require academic group bookings, individual clinical intake, or seminar licensing, our administrators are ready to help.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Contact Left - Communication Channels */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#1E3A8A] text-white p-6 sm:p-8 rounded-xl space-y-6 shadow-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/5 rounded-full blur-2xl -mr-8 -mt-8" />
            
            <div className="space-y-2 relative z-10">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">Operational Details</h3>
              <p className="text-xs text-blue-100 leading-normal">
                Nuaspect maintains global standard responses for academic researchers within 24 hours.
              </p>
            </div>

            <div className="space-y-4 relative z-10 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-blue-200 font-mono tracking-wider font-bold uppercase leading-none">Electronic Mail</p>
                  <a href="mailto:team@nuaspect.com" className="font-bold underline hover:text-white transition-colors mt-1 block">
                    team@nuaspect.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-blue-200 font-mono tracking-wider font-bold uppercase leading-none">Active Help Desk (IST)</p>
                  <span className="font-bold mt-1 block tracking-tight">+91 22 8876 5430</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-blue-200 font-mono tracking-wider font-bold uppercase leading-none">Intake Chambers</p>
                  <span className="font-semibold mt-1 block">Bandra Kurla Complex, Mumbai, India</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 space-y-3 relative z-10">
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#BFDBFE]">Professional Networks</p>
              <div className="flex gap-2.5">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 hover:bg-[#10B981] hover:text-white text-white flex items-center justify-center transition-all cursor-pointer">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 hover:bg-[#10B981] hover:text-white text-white flex items-center justify-center transition-all cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 hover:bg-[#10B981] hover:text-white text-white flex items-center justify-center transition-all cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Secure assurance card */}
          <div className="bg-[#EFF6FF]/40 border border-[#E5E7EB] border-l-4 border-amalfi p-5 rounded-r-xl flex gap-3 text-xs text-gray-500 leading-relaxed shadow-sm">
            <HeartHandshake className="w-6 h-6 text-amalfi shrink-0" />
            <div>
              <h4 className="font-bold text-gray-950 uppercase tracking-wide">Strict Clinical Secrecy</h4>
              <p className="mt-1">
                All letters and inquiries dispatched to team@nuaspect.com fall under clinical communication confidentiality laws (MHCA 2017).
              </p>
            </div>
          </div>
        </div>

        {/* Contact Right - Interactive inquiry form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-9 rounded-2xl border border-[#E5E7EB] shadow-xl shadow-gray-100/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 text-amalfi border-b pb-3 border-gray-100">
              <MessageSquareCode className="w-5 h-5 text-[#10B981]" />
              <h3 className="font-display font-bold text-lg text-gray-950">Leave a Secure Note</h3>
            </div>

            {success ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100 text-center space-y-3"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Message Dispatched!</h4>
                  <p className="text-xs text-emerald-600 mt-1 max-w-sm mx-auto">
                    Your inquiry has been stored securely. Our administrative directors will respond via email within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="text-xs text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer"
                >
                  Write another message
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg flex items-center gap-2 border border-red-100">
                    <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Prof. Jane Doe"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane.doe@university.edu"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Message Detail *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify the details of your inquiry, clinical consultation, or seminar here..."
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amalfi hover:bg-[#111827] text-white py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-100"
                >
                  {loading ? "Dispatching Query..." : (
                    <>
                      <Send className="w-4 h-4" />
                      Dispatch Inbound Query
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
}
