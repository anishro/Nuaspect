/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Blogs } from "./components/Blogs";
import { Contact } from "./components/Contact";
import { Dashboard } from "./components/Dashboard";
import { RazorpayModal } from "./components/RazorpayModal";
import { NuaspectDB } from "./db";
import { SessionConfig } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Mail, Phone, MapPin, Shield, Github, Heart, Settings, Key, X, Lock } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [session, setSession] = useState<SessionConfig>({
    topic: "Cognitive Behavioral Interventions for Academic Stress & Imposter Syndrome",
    date: "2026-06-08",
    time: "19:00",
    price: 599
  });

  const [passcodeModalOpen, setPasscodeModalOpen] = useState<boolean>(false);
  const [enteredPasscode, setEnteredPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");

  // Default admin passcode - can be updated here easily
  const ADMIN_PASSCODE = "8829";

  // Fetch session parameters on boot from our DB Adapter
  const loadActiveSession = async () => {
    try {
      const activeSession = await NuaspectDB.getSessionConfig();
      setSession(activeSession);
    } catch (err) {
      console.warn("Could not load initial session settings:", err);
    }
  };

  useEffect(() => {
    loadActiveSession();
  }, []);

  // When a checkout finishes, record the registration in the DB
  const handleCompleteRegistration = async (clientData: { 
    name: string; 
    email: string; 
    phone: string; 
    paymentId: string 
  }) => {
    try {
      await NuaspectDB.registerClient({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        topic: session.topic,
        date: session.date,
        time: session.time,
        price: session.price,
        createdAt: new Date().toISOString(),
        paymentId: clientData.paymentId,
        status: "paid"
      });
    } catch (err) {
      console.error("Failed to commit registration entry:", err);
    }
  };

  const handleAdminGateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredPasscode === ADMIN_PASSCODE) {
      setPasscodeError("");
      setPasscodeModalOpen(false);
      setEnteredPasscode("");
      setCurrentTab("dashboard");
    } else {
      setPasscodeError("Invalid certification code. Access denied.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FDFCF8]">
      
      {/* 1. Header with dynamic seminar tracking */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        sessionTopic={session.topic} 
      />

      {/* 2. Page viewport wrapper with fade animators */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full"
          >
            {currentTab === "home" && (
              <Home 
                session={session} 
                onOpenBooking={() => setBookingOpen(true)} 
                isFirebaseActive={NuaspectDB.isLive()} 
              />
            )}
            
            {currentTab === "about" && (
              <About />
            )}
            
            {currentTab === "blogs" && (
              <Blogs />
            )}
            
            {currentTab === "contact" && (
              <Contact />
            )}
            
            {currentTab === "dashboard" && (
              <Dashboard 
                session={session} 
                setSession={setSession} 
                onRefreshSession={loadActiveSession} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer with Hidden Conductor Entry Portal */}
      <footer className="bg-[#111827] text-white border-t border-slate-800 mt-16 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Info brand */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              {/* 
                FOOTER BRAND LOGO CONFIGURATION
                To update the logo, replace the <Brain /> component or embed an image element.
              */}
              <div className="w-8 h-8 rounded-sm bg-amalfi text-white flex items-center justify-center">
                <Brain className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="font-display font-medium text-lg tracking-tight text-[#BFDBFE]">Nuaspect Academic Care</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Bridging modern psychological research with mental performance protocols for scholars, researchers, and academic high-achievers.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              © {new Date().getFullYear()} Nuaspect Academy. All clinical rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-citrus">
              Academics Lobby
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => setCurrentTab("home")} className="text-left text-slate-450 hover:text-[#BFDBFE] transition-colors cursor-pointer">
                Live Seminar Registrations
              </button>
              <button onClick={() => setCurrentTab("about")} className="text-left text-slate-450 hover:text-[#BFDBFE] transition-colors cursor-pointer">
                Clinical Conductor Board
              </button>
              <button onClick={() => setCurrentTab("blogs")} className="text-left text-slate-450 hover:text-[#BFDBFE] transition-colors cursor-pointer">
                Therapeutic Library
              </button>
              <button onClick={() => setCurrentTab("contact")} className="text-left text-slate-450 hover:text-[#BFDBFE] transition-colors cursor-pointer">
                Inbound Consultation Desk
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Controls */}
          <div className="md:col-span-6 lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-citrus">
              Administrative Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#BFDBFE]" />
                <a href="mailto:team@nuaspect.com" className="hover:underline hover:text-white transition-colors">
                  team@nuaspect.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#BFDBFE]" />
                <span>+91 22 8876 5430</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-citrus" />
                <span>Confidential Intake Protocol</span>
              </div>
            </div>

            {/* Subtle portal key triggering our HIDDEN Dashboard portal */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  if (currentTab === "dashboard") {
                    setCurrentTab("home");
                  } else {
                    setPasscodeError("");
                    setEnteredPasscode("");
                    setPasscodeModalOpen(true);
                  }
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                  currentTab === "dashboard"
                    ? "bg-[#10B981] border-[#10B981] text-white font-extrabold"
                    : "border-slate-800 hover:bg-white/5 hover:border-slate-700 text-slate-400"
                }`}
                title="Only certified staff personnel allowed"
              >
                <Key className="w-3.5 h-3.5 shrink-0" />
                <span>{currentTab === "dashboard" ? "Exit Dashboard" : "Conductor Portal Area"}</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* 4. Live Razorpay Simulation Overlay Portal */}
      <RazorpayModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        session={session}
        onSubmitRegistration={handleCompleteRegistration}
      />

      {/* 5. Private Conductor Gate Passcode Modal */}
      <AnimatePresence>
        {passcodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPasscodeModalOpen(false)}
              className="absolute inset-0 bg-[#1E3A8A]/10 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#E5E7EB] z-10 p-6"
            >
              <button 
                onClick={() => setPasscodeModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-amalfi flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-gray-950">Administrative Gate</h3>
                <p className="text-xs text-gray-400">Please provide the conductor access credential key to visualize the control panel dashboard.</p>
              </div>

              <form onSubmit={handleAdminGateSubmit} className="space-y-4">
                {passcodeError && (
                  <div className="bg-red-50 text-red-650 text-xs p-3 rounded-lg flex items-center gap-2 border border-red-100 font-bold uppercase tracking-wider text-center justify-center">
                    <span>{passcodeError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mb-1">Passcode Credential</label>
                  <input 
                    type="password" 
                    required
                    value={enteredPasscode}
                    onChange={e => {
                      setEnteredPasscode(e.target.value);
                      if (passcodeError) setPasscodeError("");
                    }}
                    placeholder="••••"
                    className="w-full text-center text-sm font-mono font-extrabold tracking-widest px-3.5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amalfi bg-gray-50/50"
                  />
                  <div className="text-center text-[10px] text-gray-400 font-mono mt-2 italic">
                    Hint: Elena Vance's clinical license prefix in "About Us" (8829)
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E3A8A] hover:bg-slate-900 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all mt-2 cursor-pointer shadow-lg shadow-blue-100"
                >
                  Verify Certificate
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
