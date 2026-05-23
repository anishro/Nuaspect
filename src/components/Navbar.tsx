/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, Calendar, HelpCircle, User, LayoutDashboard, Brain } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  sessionTopic: string;
}

export function Navbar({ currentTab, setCurrentTab, sessionTopic }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFCF8]/90 backdrop-blur-md border-b border-[#E5E7EB] px-4 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 
          BRAND LOGO ICON CONFIGURATION
          To update the primary application icon or logo:
          1. Replace the <Brain /> component below with a different Lucide icon (e.g. <Flame />, <Activity />)
          2. Or replace it with an <img src="/logo.png" className="w-5 h-5 object-contain" /> for custom assets
        */}
        <button 
          onClick={() => setCurrentTab("home")}
          className="flex items-center gap-2.5 font-display font-medium text-2xl tracking-tight text-amalfi hover:opacity-90 transition-opacity cursor-pointer group"
        >
          <div className="w-8 h-8 bg-amalfi rounded-sm flex items-center justify-center text-white shadow-sm transition-transform">
            <Brain className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-extrabold tracking-wider text-amalfi uppercase">
            Nuaspect
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm uppercase font-bold">
            Clinic
          </span>
        </button>

        {/* Global Navigation Links in high-contrast crisp uppercase tracker */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Us" },
            { id: "blogs", label: "Articles" },
            { id: "contact", label: "Contact Us" }
          ].map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative py-1 cursor-pointer transition-all ${
                  isActive 
                    ? "text-amalfi font-extrabold border-b-2 border-amalfi" 
                    : "text-gray-500 hover:text-amalfi"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live CTA Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentTab("home")}
            className="hidden lg:flex flex-col text-right pr-2 leading-none"
          >
            <span className="text-[9px] font-mono tracking-widest text-amalfi/60 uppercase">Topic Outline</span>
            <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px] mt-0.5" title={sessionTopic}>
              {sessionTopic}
            </span>
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("hero-cta-section") || document.getElementById("root");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
              setCurrentTab("home");
            }}
            className="px-5 py-2.5 bg-amalfi text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#111827] active:scale-95 transition-all text-center cursor-pointer shadow-sm"
          >
            Reserve Seat
          </button>
          
          {/* Subtle Mobile Menu Trigger */}
          <div className="md:hidden flex flex-wrap gap-1 justify-end max-w-[180px]">
            {["home", "about", "blogs", "contact"].map((t) => (
              <button
                key={t}
                onClick={() => setCurrentTab(t)}
                className={`p-1 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                  currentTab === t 
                    ? "bg-amalfi text-white font-black" 
                    : "bg-gray-100 text-gray-500 hover:text-amalfi"
                }`}
              >
                {t === "home" ? "Home" : t === "about" ? "About" : t === "blogs" ? "Blogs" : "Contact"}
              </button>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
}
