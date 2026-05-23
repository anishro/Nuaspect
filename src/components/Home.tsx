/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CalendarRange, Clock, Quote } from "lucide-react";
import { motion } from "motion/react";
import { SessionConfig } from "../types";

interface HomeProps {
  session: SessionConfig;
  onOpenBooking: () => void;
  isFirebaseActive: boolean;
}

export function Home({ session, onOpenBooking, isFirebaseActive }: HomeProps) {
  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      
      {/* 1. HERO SECTION WITH VECTOR ANIMATIONS & TEXT */}
      <section className="relative overflow-hidden pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-12 lg:col-span-7 space-y-6 md:space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 bg-[#EFF6FF] text-amalfi text-[10px] font-bold uppercase tracking-widest rounded px-3 py-1 w-fit border border-[#BFDBFE]">
              <span className="w-2 h-2 rounded-full bg-amalfi animate-pulse"></span>
              Clinically Grounded Academic Therapy
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-[#1F2937]">
              Academic Success <br />
              <span className="text-amalfi">Through Mental Clarity.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 max-w-lg mb-8 leading-relaxed">
              Nuaspect provides specialized therapeutic guidance for students and academics. Join our research-backed live sessions to master cognitive resilience and discover emotional well-being.
            </p>

            {/* Active Live Session Dynamic Card (Triggers checkout) - Transformed into the Geometric Balance visual widget */}
            <motion.div 
              id="hero-cta-section"
              whileHover={{ y: -4 }}
              className="bg-white border border-[#E5E7EB] p-8 rounded-2xl shadow-xl shadow-gray-100 flex-1 flex flex-col text-[#1F2937] relative"
            >
              {/* Subtle top decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amalfi to-[#10B981] rounded-t-2xl" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-1">
                    Upcoming Live Session
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 leading-snug">
                    {session.topic}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-lg border border-[#E5E7EB]/40">
                    <div className="w-10 h-10 bg-white rounded border border-gray-150 flex items-center justify-center shadow-sm text-amalfi">
                      <CalendarRange className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Date</p>
                      <p className="font-extrabold text-gray-800 text-xs sm:text-sm mt-1">
                        {new Date(session.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-lg border border-[#E5E7EB]/40">
                    <div className="w-10 h-10 bg-white rounded border border-gray-150 flex items-center justify-center shadow-sm text-amalfi">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Time</p>
                      <p className="font-extrabold text-gray-800 text-xs sm:text-sm mt-1">{session.time} IST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3.5 border-t border-dashed border-gray-200 mt-4">
                    <span className="text-sm font-semibold text-gray-500">Registration Fee</span>
                    <span className="text-2xl font-black text-amalfi font-mono">₹{session.price}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 bg-amalfi text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-[#111827] hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-widest text-xs sm:text-sm cursor-pointer"
                >
                  Register Now via Razorpay
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  * Limited to 50 participants to ensure quality interaction. Live clinic details will be sent on receipt.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Content - STUNNING ABSTRACT GRAPHICAL VECTOR VECTOR ANIMATION */}
          <div className="md:col-span-12 lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden flex items-center justify-center p-3">
              {/* Stylized background grid */}
              <div className="absolute inset-0 bg-[#EFF6FF] opacity-60 rounded-3xl border border-[#E5E7EB]" />
              
              <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              {/* Dynamic Therapeutic Mind-Network SVG Vector */}
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full max-w-[380px] drop-shadow-xl z-10"
              >
                {/* Outer concentric breathing rings */}
                <motion.circle 
                  cx="200" 
                  cy="200" 
                  r="165" 
                  fill="none" 
                  stroke="#1E3A8A" 
                  strokeWidth="1" 
                  strokeDasharray="4 8"
                  opacity="0.3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle 
                  cx="200" 
                  cy="200" 
                  r="135" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  strokeDasharray="6 12"
                  opacity="0.25"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                />

                {/* Grounding Base Waves representing tranquility */}
                <path 
                  d="M 60 310 Q 130 260 200 310 T 340 310" 
                  fill="none" 
                  stroke="#BFDBFE" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  opacity="0.6" 
                />
                <path 
                  d="M 80 325 Q 140 285 200 325 T 320 325" 
                  fill="none" 
                  stroke="#1E3A8A" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  opacity="0.4" 
                />

                {/* Central brain cortex nodes styled elegantly */}
                <g id="cerebral-network">
                  {/* Glowing core sphere */}
                  <circle cx="200" cy="180" r="48" fill="#EFF6FF" opacity="0.9" />
                  <circle cx="200" cy="180" r="62" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.3" />
                  
                  {/* Network pathways */}
                  <line x1="200" y1="180" x2="140" y2="130" stroke="#1E3A8A" strokeWidth="2.5" strokeDasharray="2 3" />
                  <line x1="200" y1="180" x2="260" y2="130" stroke="#1E3A8A" strokeWidth="2.5" strokeDasharray="2 3" />
                  <line x1="200" y1="180" x2="130" y2="200" stroke="#1E3A8A" strokeWidth="2" />
                  <line x1="200" y1="180" x2="270" y2="200" stroke="#1E3A8A" strokeWidth="2" />
                  <line x1="200" y1="180" x2="170" y2="250" stroke="#BFDBFE" strokeWidth="2.5" />
                  <line x1="200" y1="180" x2="230" y2="250" stroke="#BFDBFE" strokeWidth="2.5" />

                  {/* Left thought cluster (Active CBT/Somatic Nodes) */}
                  <motion.circle 
                    cx="140" cy="130" r="14" fill="#1E3A8A" 
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="140" y="134" textAnchor="middle" fill="#FDFCF8" fontSize="10" fontWeight="bold" fontFamily="monospace">CBT</text>

                  <motion.circle 
                    cx="130" cy="200" r="11" fill="#10B981"
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="130" y="203" textAnchor="middle" fill="#FDFCF8" fontSize="7" fontWeight="bold" fontFamily="monospace">C1</text>

                  {/* Right thought cluster */}
                  <motion.circle 
                    cx="260" cy="130" r="14" fill="#1E3A8A" 
                    animate={{ scale: [1, 1.15, 1] }} 
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="260" y="134" textAnchor="middle" fill="#FDFCF8" fontSize="9" fontWeight="bold" fontFamily="monospace">ACT</text>

                  <motion.circle 
                    cx="270" cy="200" r="11" fill="#BFDBFE"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="270" y="203" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="bold" fontFamily="monospace">C2</text>

                  {/* Grounding/Somatic center */}
                  <motion.circle 
                    cx="170" cy="250" r="12" fill="#10B981"
                    animate={{ scale: [1, 1.14, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="170" y="253" textAnchor="middle" fill="#FDFCF8" fontSize="7" fontWeight="bold" fontFamily="monospace">SOM</text>

                  <motion.circle 
                    cx="230" cy="250" r="12" fill="#1E3A8A"
                    animate={{ scale: [1, 1.16, 1] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="230" y="253" textAnchor="middle" fill="#FDFCF8" fontSize="7" fontWeight="bold" fontFamily="monospace">RES</text>

                  {/* Floating clinical energy particles */}
                  <motion.circle 
                    cx="200" cy="180" r="4" fill="#10B981"
                    animate={{ x: [-35, 60, -35], y: [-50, 20, -50], opacity: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="200" cy="180" r="3" fill="#BFDBFE"
                    animate={{ x: [70, -45, 70], y: [20, 70, 20], opacity: [0, 1, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE NUASPECT METHOD SECTION (ACADEMIC SPECS) */}
      <section className="bg-[#EFF6FF]/40 border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-950">
              Clinical Rigor. Scholar Specific.
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              We move far beyond simple motivational advice. Our programs utilize research-verified psychological protocols designed for high-stress cognitive work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E7EB] shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-sm bg-[#EFF6FF] text-amalfi flex items-center justify-center font-bold tracking-tight border border-[#BFDBFE]">01</div>
              <h3 className="font-display font-bold text-lg text-gray-950">Cognitive Reframing for Imposterism</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Learn to isolate and identify automatic thoughts about fraudulence and academic comparison. We build concrete behavioral catalogs of achievements.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E7EB] shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-sm bg-[#EFF6FF] text-amalfi flex items-center justify-center font-bold tracking-tight border border-[#BFDBFE]">02</div>
              <h3 className="font-display font-bold text-lg text-gray-950">Vagus Nerve Somatic Regulation</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Regulate exam-induced hyperventilation and rapid heartbeats using science-backed pacing arrays. Stay calm when stepping into defense rooms.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E7EB] shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-sm bg-[#EFF6FF] text-amalfi flex items-center justify-center font-bold tracking-tight border border-[#BFDBFE]">03</div>
              <h3 className="font-display font-bold text-lg text-gray-950">Dissertation Writing Focus Architecture</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Strategies to protect focus, remove cognitive overload, and schedule deliberate isolation periods to output top-tier peer-reviewed research papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUOTE CORNER */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 text-center space-y-4 py-8">
        <Quote className="w-8 h-8 text-[#BFDBFE] mx-auto opacity-70" />
        <p className="text-lg sm:text-xl font-display italic text-gray-700 leading-relaxed font-medium">
          &ldquo;Academia demands intense intellectual stamina, yet provides very little structural psychological support. Nuaspect was founded to bridge these isolated clinical islands.&rdquo;
        </p>
        <div>
          <span className="block text-sm font-bold text-amalfi uppercase tracking-wider">Dr. Elena Vance, PsyD</span>
          <span className="block text-[10px] font-mono tracking-widest text-slate-400 mt-1 uppercase">Chief Clinical Conductor</span>
        </div>
      </section>

      {/* Firebase connectivity warning badge */}
      {!isFirebaseActive && (
        <div className="max-w-md mx-auto bg-[#EFF6FF] border border-[#BFDBFE] p-4 rounded-lg text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-amalfi font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Active Sandbox Mode (Local Sandboxed Storage)</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-normal">
            The platform is running inside localized sandbox mode. When your live Firestore database is fully provisioned, it automatically upgrades to persistent network synchronization.
          </p>
        </div>
      )}

    </div>
  );
}
