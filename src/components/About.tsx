/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, Award, Compass, Heart, Film, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

export function About() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-16">
      
      {/* Page Title */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-amalfi uppercase bg-[#EFF6FF] px-3 py-1 rounded border border-[#BFDBFE]">
          MEET OUR BOARD
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950">
          About Nuaspect Academic Care
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Providing deep scientific anchoring for minds pursuing high-stress academic discoveries.
        </p>
      </div>

      {/* Grid: Dr. Elena Vance Conductor Card & Info */}
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-xl shadow-gray-100/50">
        
        {/* 
          BIOGRAPHIC PORTRAIT / AVATAR UPDATE CONFIGURATION
          To update the clinician's portrait/avatar icon with a real photo or custom image asset:
          1. Replace the <svg> element below with <img src="/elena_vance.jpg" className="w-[85%] h-[85%] object-cover rounded-full border-2 border-amalfi" />
        */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] aspect-square rounded-xl bg-gray-50 border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
            
            {/* Elegant decorative background waves */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-indigo-50 rounded-t-[50%]" />
            <div className="absolute w-24 h-24 bg-teal-50 rounded-full top-6 left-6 blur-2xl opacity-70" />

            {/* Stylized minimal vector drawing representing Dr. Elena Vance */}
            <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-amalfi drop-shadow z-10">
              {/* Head & Neck */}
              <circle cx="50" cy="42" r="16" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
              {/* Hair outline representing elegant hair */}
              <path 
                d="M 33 40 Q 50 15 67 40 Q 64 50 50 52 Q 36 50 33 40 Z" 
                fill="#1E3A8A" 
                opacity="0.95" 
              />
              <path 
                d="M 32 38 Q 33 18 50 16 Q 67 18 68 38 S 70 54 62 55 L 64 62 L 67 68 L 33 68 L 36 62 L 38 55 Z" 
                fill="none" 
                stroke="#1E3A8A" 
                strokeWidth="2.5" 
              />
              {/* Glasses representing professional academic */}
              <rect x="40" y="38" width="8" height="6" rx="2" fill="none" stroke="#1E3A8A" strokeWidth="1.2" />
              <rect x="52" y="38" width="8" height="6" rx="2" fill="none" stroke="#1E3A8A" strokeWidth="1.2" />
              <line x1="48" y1="41" x2="52" y2="41" stroke="#1E3A8A" strokeWidth="1.2" />
              
              {/* Subtle smile */}
              <path d="M 46 48 Q 50 51 54 48" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Academic Cap / Collar */}
              <path d="M 35 70 L 65 70 L 62 88 L 38 88 Z" fill="#1E3A8A" />
              <path d="M 50 70 L 44 76 L 50 82 L 56 76 Z" fill="#BFDBFE" />
            </svg>

            <div className="absolute bottom-3 bg-white border border-[#E5E7EB] px-3 py-0.5 rounded-sm shadow-sm z-20">
              <span className="text-[9px] font-mono font-bold text-amalfi tracking-widest uppercase">Clinical Director</span>
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="font-display font-extrabold text-xl text-gray-950">Dr. Elena Vance, PsyD</h3>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#EFF6FF] px-2.5 py-1 rounded-sm border border-[#BFDBFE] font-bold uppercase mt-2 inline-block">
              Lic. No. PsyD-88291-MH
            </span>
          </div>
        </div>

        {/* Credentials Details */}
        <div className="md:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-amalfi">
            <Award className="w-5 h-5 text-[#10B981] shrink-0" />
            <h4 className="font-display font-bold text-lg text-gray-950">Biographical Outline & Experience</h4>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Dr. Elena Vance is the Chief Academic Clinician and original founder of the Nuaspect Academy. With over 14 years of dedicated clinical practice and instructional research, her work centers around specialized anxiety containment, relational trauma resolution, and cognitive performance frameworks for researchers and scholars.
          </p>

          <p className="text-sm text-gray-500 leading-relaxed">
            She has served as guest developer for university wellness councils and regularly consults on peer-reviewed stress-reduction curriculums. Through Nuaspect, she translates technical psychotherapy methods into highly actionable, modular, and safe therapeutic sessions.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-[11px] text-gray-600 font-medium">
            <div className="flex items-center gap-2 bg-[#EFF6FF]/40 p-3 rounded-lg border border-[#E5E7EB]/40">
              <HeartHandshake className="w-4 h-4 text-amalfi" />
              <span>Secure Client Confidentiality</span>
            </div>
            <div className="flex items-center gap-2 bg-[#EFF6FF]/40 p-3 rounded-lg border border-[#E5E7EB]/40">
              <CheckBadgeIcon className="w-4 h-4 text-amalfi" />
              <span>Certified Clinical Psychologist</span>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Video Seminar Player Section with YouTube Placeholder */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amalfi">
          <Film className="w-5 h-5 text-[#10B981]" />
          <h3 className="font-display font-bold text-xl text-gray-950">Introductory Seminar Preview</h3>
        </div>
        
        <div className="relative w-full aspect-video rounded-2xl bg-slate-950 border border-[#E5E7EB] overflow-hidden shadow-xl flex items-center justify-center">
          
          {videoPlaying ? (
            /* YouTube embed simulator/actual video placeholder layout */
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Therapy Seminar Introduction - Placeholder" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
              <button 
                onClick={() => setVideoPlaying(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-md px-3 py-1.5 text-xs font-mono tracking-wider cursor-pointer transition-all uppercase"
              >
                Exit Player
              </button>
            </div>
          ) : (
            /* Custom video cover vector illustration */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white space-y-6">
              {/* Outer decorative layout */}
              <div className="absolute inset-0 bg-radial-gradient from-amalfi/85 to-[#111827]" />
              
              <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

              <div className="relative z-10 space-y-3 max-w-lg">
                <span className="text-[9px] font-mono tracking-widest text-[#BFDBFE] uppercase bg-white/10 px-2.5 py-1 rounded border border-white/15">
                  Clinical Lecture Segment
                </span>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Demystifying Cognitive Overload: Interactive Seminar segment with Dr. Elena Vance
                </h4>
                <p className="text-xs text-blue-200 max-w-sm mx-auto">
                  Watch this 12-minute preview of core behavioral therapy concepts discussed in our monthly live labs.
                </p>
              </div>

              {/* Pulsating play button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVideoPlaying(true)}
                className="relative z-10 w-16 h-16 rounded-full bg-[#10B981] hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white translate-x-0.5 text-white" />
              </motion.button>
            </div>
          )}

        </div>
      </div>

      {/* Grid: Mission and Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        
        <div className="bg-[#EFF6FF]/40 border border-[#E5E7EB] border-l-4 border-amalfi p-6.5 sm:p-8 rounded-xl space-y-4">
          <div className="flex items-center gap-2.5 text-amalfi">
            <Compass className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-display font-bold text-xl text-gray-950">The Nuaspect Mission</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Our mission is to establish accessible, clinical-grade psychological conditioning for the global research sector. We seek to eliminate scholar attrition rates caused by systemic mental burnout, impostor syndrome, and performance fears by conducting science-backed instruction cohorts.
          </p>
        </div>

        <div className="bg-[#EFF6FF]/40 border border-[#E5E7EB] border-l-4 border-[#10B981] p-6.5 sm:p-8 rounded-xl space-y-4">
          <div className="flex items-center gap-2.5 text-amalfi">
            <Heart className="w-5 h-5 text-amalfi" />
            <h3 className="font-display font-bold text-xl text-gray-950">The Conductor's Vision</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            We envision an empowered academic ecosystem where psychiatric wellness is viewed as a vital catalyst of strategic discovery. By educating academic mentors and providing premium direct care, we strive to build collaborative high-performance research circles.
          </p>
        </div>

      </div>

    </div>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}
