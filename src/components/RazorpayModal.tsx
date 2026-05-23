/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, ShieldCheck, Loader2, X, CreditCard, Smartphone, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SessionConfig } from "../types";

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: SessionConfig;
  onSubmitRegistration: (clientData: { name: string; email: string; phone: string; paymentId: string }) => void;
}

export function RazorpayModal({ isOpen, onClose, session, onSubmitRegistration }: RazorpayModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState<"details" | "methods" | "processing" | "success">("details");
  const [errorMessage, setErrorMessage] = useState("");
  const [simulatedTxId, setSimulatedTxId] = useState("");

  if (!isOpen) return null;

  // Validation
  const handleProceedToPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please fill out all contact fields.");
      return;
    }
    setErrorMessage("");
    setStep("methods");
  };

  const handleSimulatePay = () => {
    setStep("processing");
    setTimeout(() => {
      const ref = "pay_ref_" + Math.random().toString(36).substring(2, 14).toUpperCase();
      setSimulatedTxId(ref);
      setStep("success");
      onSubmitRegistration({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        paymentId: ref
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1E3A8A]/10 backdrop-blur-xs"
        />

        {/* Modal Content container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#E5E7EB] z-10"
        >
          {/* Header */}
          <div className="bg-[#1E3A8A] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#10B981] flex items-center justify-center text-xs font-bold font-mono text-white select-none">R</div>
              <div>
                <h3 className="font-bold text-sm leading-none uppercase tracking-wide">Razorpay Secure</h3>
                <span className="text-[9px] opacity-70 font-mono">Nuaspect Academic Care</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader detailing active amount */}
          <div className="bg-[#EFF6FF]/60 px-6 py-3.5 border-b border-[#E5E7EB] flex justify-between items-center text-xs text-amalfi font-bold uppercase tracking-wider">
            <span className="truncate max-w-[200px]" title={session.topic}>
              Lab: {session.topic}
            </span>
            <span className="font-mono text-sm text-[#1E3A8A] font-extrabold whitespace-nowrap bg-white px-2.5 py-1 rounded-sm border border-[#BFDBFE] h-max">
              ₹{session.price}
            </span>
          </div>

          <div className="p-6">
            {step === "details" && (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="text-center mb-1">
                  <h4 className="text-base font-extrabold font-display text-gray-950">Registration Details</h4>
                  <p className="text-xs text-gray-400 mt-1">Provide your details to receive the video conference invite.</p>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg flex items-center gap-2 border border-red-100">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Jane Doe"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane.doe@university.edu"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Mobile Contact</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E3A8A] hover:bg-[#111827] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer shadow-lg shadow-blue-100"
                >
                  Proceed to Payment Options
                </button>
              </form>
            )}

            {step === "methods" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h4 className="text-sm font-extrabold text-[#1E3A8A]">Select Simulation Option</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Academic sandbox — no real funds will be charged.</p>
                </div>

                {/* Simulated Payment Methods */}
                <div className="space-y-2.5">
                  <button 
                    onClick={handleSimulatePay}
                    className="w-full border border-gray-200 hover:border-amalfi hover:bg-[#EFF6FF]/40 p-3.5 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#EFF6FF] text-amalfi flex items-center justify-center border border-[#BFDBFE]">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-950">UPI / QR (GPay, PhonePe)</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Instant checkout clearance simulation</p>
                      </div>
                    </div>
                    <span className="text-[10px] border border-gray-200 text-gray-600 bg-gray-50 px-2.5 py-1 rounded font-mono font-bold">₹{session.price}</span>
                  </button>

                  <button 
                    onClick={handleSimulatePay}
                    className="w-full border border-gray-200 hover:border-amalfi hover:bg-[#EFF6FF]/40 p-3.5 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#EFF6FF] text-amalfi flex items-center justify-center border border-[#BFDBFE]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-950">Cards / Netbanking</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Visa, Mastercard, RuPay processing</p>
                      </div>
                    </div>
                    <span className="text-[10px] border border-gray-200 text-gray-600 bg-gray-50 px-2.5 py-1 rounded font-mono font-bold">₹{session.price}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Secure PCI-DSS Verification
                  </span>
                  <span>128-Bit Encryption</span>
                </div>

                <button
                  onClick={() => setStep("details")}
                  className="w-full text-center text-xs font-bold text-amalfi hover:text-blue-900 tracking-wider uppercase py-1 mt-2 cursor-pointer"
                >
                  ← Edit registration details
                </button>
              </div>
            )}

            {step === "processing" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amalfi">Verifying Transaction</h4>
                  <p className="text-xs text-gray-400 mt-1.5 max-w-[280px]">Simulating dynamic handshakes with the academic billing endpoints.</p>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="py-2 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-emerald-100 text-[#10B981] rounded-full flex items-center justify-center shadow-lg shadow-emerald-100">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-gray-950">Seat Reserved Successfully</h4>
                  <p className="text-xs text-gray-400 mt-1">Thank you. Your interactive laboratory seat is guaranteed.</p>
                </div>

                <div className="bg-[#EFF6FF]/30 border border-[#BFDBFE] p-4.5 rounded-lg space-y-2.5 text-left text-xs max-w-sm mx-auto">
                  <div className="flex justify-between border-b pb-1.5 border-gray-100 font-medium text-[11px]">
                    <span className="text-gray-400">Client Name</span>
                    <span className="font-bold text-gray-800">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5 border-gray-100 font-medium text-[11px]">
                    <span className="text-gray-400">Paid Fees</span>
                    <span className="font-extrabold text-[#1E3A8A]">₹{session.price}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5 border-gray-100 font-medium text-[11px]">
                    <span className="text-gray-400">Razorpay Ref ID</span>
                    <span className="font-mono text-[9px] text-[#1E3A8A] bg-white border border-[#BFDBFE] px-1.5 py-0.5 rounded-sm">{simulatedTxId}</span>
                  </div>
                  <span className="block text-[9px] leading-relaxed text-gray-400 italic text-center pt-2 font-medium">
                    An entry invitation containing the exclusive seminar links has been dispatched to {formData.email}.
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase cursor-pointer shadow-lg"
                >
                  Return to Academics Lobby
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
