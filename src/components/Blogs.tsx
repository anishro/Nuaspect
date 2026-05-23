/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { User, Calendar, ArrowRight, Loader2, RefreshCw, X } from "lucide-react";
import { NuaspectDB } from "../db";
import { Blog } from "../types";
import { motion, AnimatePresence } from "motion/react";

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBlogDetail, setActiveBlogDetail] = useState<Blog | null>(null);
  
  // Ref for intersection observer or manual trigger point
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Load initial blogs
  const fetchBlogs = async (currentPage: number, append: boolean = false) => {
    setLoading(true);
    try {
      const result = await NuaspectDB.getBlogs(currentPage, 6);
      if (append) {
        setBlogs(prev => {
          // Filter duplicates just in case
          const existingIds = new Set(prev.map(b => b.id));
          const union = [...prev, ...result.data.filter(b => !existingIds.has(b.id))];
          return union;
        });
      } else {
        setBlogs(result.data);
      }
      setHasMore(result.hasMore);
    } catch (e) {
      console.error("Error loading blog posts:", e);
    } finally {
      setLoading(false);
    }
  };

  // Trigger loading on page changes
  useEffect(() => {
    fetchBlogs(page, page > 1);
  }, [page]);

  // Infinite Scroll Trigger via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, {
      root: null, // viewport
      rootMargin: "150px", // pre-fetch before hitting bottom
      threshold: 0.1
    });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [sentinelRef, hasMore, loading]);

  const handleRefresh = () => {
    setPage(1);
    fetchBlogs(1, false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#10B981] bg-[#EFF6FF] px-2.5 py-1 rounded-sm border border-[#BFDBFE] uppercase inline-block">
            Psychological Columns
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 mt-2">
            Academic Therapy Blogs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access certified therapeutic research, anxiety mitigation protocols, and group clinical guidelines.
          </p>
        </div>

        <button 
          onClick={handleRefresh}
          className="flex items-center gap-1.5 text-xs text-amalfi hover:bg-[#EFF6FF] hover:text-blue-900 bg-[#EFF6FF]/60 px-4 py-2 border border-[#BFDBFE] rounded-lg transition-all font-bold self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Registry
        </button>
      </div>

      {/* Grid containing blogs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogs.map((blog, idx) => (
          <motion.article
            key={blog.id || idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.05, 0.4), duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between bg-white rounded-xl border border-[#E5E7EB] hover:border-amalfi/30 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-300 overflow-hidden group h-full"
          >
            {/* Design header color bar */}
            <div className="h-1.5 bg-gradient-to-r from-amalfi via-neutral-100 to-[#10B981]" />

            {/* 3 DISTINCT SECTIONS ENFORCED: Heading, Body Text, Read More Button */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              
              {/* SECTION 1: Blog Heading/Meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-amalfi" />
                    {blog.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amalfi" />
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-lg text-gray-950 group-hover:text-amalfi transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>
              </div>

              {/* SECTION 2: Body text excerpt */}
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-4">
                  {blog.content.replace(/[#*`\-]/g, "")}
                </p>
              </div>

              {/* SECTION 3: Read more button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveBlogDetail(blog)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amalfi hover:text-blue-900 transition-colors cursor-pointer"
                >
                  Read Advanced Column
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <span className="text-[10px] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-sm text-amalfi font-bold font-mono uppercase tracking-wider">
                  Clinic Lab
                </span>
              </div>

            </div>
          </motion.article>
        ))}
      </div>

      {/* Infinite scroll loader placeholder sentinel */}
      <div 
        ref={sentinelRef}
        className="py-12 flex flex-col items-center justify-center text-center space-y-3"
      >
        {loading && (
          <div className="flex items-center gap-2 text-amalfi font-extrabold bg-[#EFF6FF] px-4 py-2 rounded-full border border-[#BFDBFE]">
            <Loader2 className="w-4.5 h-4.5 animate-spin text-[#10B981]" />
            <span className="text-xs uppercase tracking-wider">Streaming Next Clinical Columns...</span>
          </div>
        )}

        {!hasMore && blogs.length > 0 && (
          <div className="text-gray-400 text-xs font-mono font-bold tracking-wider uppercase bg-[#EFF6FF] px-4 py-2 rounded-full border border-[#BFDBFE]">
            ✓ You have read all columns in our archives
          </div>
        )}

        {hasMore && !loading && (
          <button
            onClick={() => setPage(p => p + 1)}
            className="text-xs text-amalfi hover:text-blue-900 bg-[#EFF6FF] hover:bg-blue-100 px-6 py-3 rounded-full border border-[#BFDBFE] font-bold tracking-widest uppercase transition-all cursor-pointer shadow-sm"
          >
            Show legacy archives (Manual Trigger)
          </button>
        )}
      </div>

      {/* Standard modal detail viewport */}
      <AnimatePresence>
        {activeBlogDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBlogDetail(null)}
              className="absolute inset-0 bg-[#1E3A8A]/10 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#E5E7EB] z-10 space-y-6"
            >
              <button
                onClick={() => setActiveBlogDetail(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2.5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pt-4">
                <span className="text-[10px] font-bold tracking-widest text-[#10B981] bg-[#EFF6FF] px-2.5 py-1 rounded-sm border border-[#BFDBFE] uppercase">
                  Clinical column
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-950 leading-snug pt-1">
                  {activeBlogDetail.title}
                </h2>
                <div className="flex gap-4 text-xs text-gray-400 font-mono font-bold uppercase tracking-wider">
                  <span>Author: {activeBlogDetail.author}</span>
                  <span>•</span>
                  <span>Published: {new Date(activeBlogDetail.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 text-sm text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                {activeBlogDetail.content}
              </div>

              <div className="bg-[#EFF6FF]/30 p-4 rounded-xl text-center border border-[#BFDBFE] text-[10px] text-gray-500 font-mono font-medium leading-relaxed leading-normal">
                This academic paper was prepared for the counseling body at Nuaspect. Any clinical redistribution requires citation authorization.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
