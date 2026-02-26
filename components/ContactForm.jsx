"use client";

import React from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] font-sans text-slate-900">

      {/* --- HERO / CONTACT FORM SECTION --- */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-linear-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-16  bg-linear-to-r from-[#ff5c01] via-[#ff007a] to-[#c400ff] bg-clip-text text-transparent">Contact Us</h1>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* Left: Form Card with Gradient Border on Hover */}
            <div className="group relative md:col-span-2 p-0.5 rounded-[42px] transition-all duration-500 hover:-translate-y-2">
              {/* 2px Gradient Border Layer */}
              <div className="absolute inset-0 rounded-[42px] bg-linear-to-br from-rose-400 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Internal Form Content */}
              <div className="relative h-full w-full bg-white rounded-[40px] p-10 border border-gray-100 group-hover:border-transparent transition-all shadow-[0_10px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_70px_rgba(139,92,246,0.15)]">
                <h2 className="text-3xl font-bold mb-2 text-[#0B1530]">Get in Touch</h2>
                <p className="text-gray-400 mb-8 text-sm">Enter your email and tell us your pattern.</p>

                <form className="space-y-6">
                  <div className="group/input">
                    <label className="block text-sm font-bold mb-2 text-[#0B1530]">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none transition-all duration-300 hover:border-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 bg-gray-50/40"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-sm font-bold mb-2 text-[#0B1530]">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none transition-all duration-300 hover:border-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 bg-gray-50/40"
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-sm font-bold mb-2 text-[#0B1530]">Message</label>
                    <textarea
                      rows="5"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none transition-all duration-300 hover:border-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 bg-gray-50/40 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="w-full relative overflow-hidden group/btn bg-linear-to-r from-[#FF0080] via-[#D300E0] to-[#9D00FF] text-white font-bold py-5 rounded-full transition-all duration-500 hover:shadow-[0_15px_35px_rgba(211,0,224,0.4)] active:scale-95"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-[#9D00FF] via-[#D300E0] to-[#FF0080] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative z-10">Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Side Cards with Gradient Border on Hover */}
            <div className="flex flex-col justify-between gap-6">
              <ContactInfoCard
                icon={<Mail className="text-purple-500" size={24} />}
                title="Email Us"
                detail="info@smartlogo.ai"
                desc="Standard technical support, normal removals for community and stability."
              />
              <ContactInfoCard
                icon={<MessageCircle className="text-rose-500" size={24} />}
                title="Chat with Support"
                detail="Active: 09:00 am - 10:00 pm"
                desc="Get a numerous profile standards with your credit and billing queries."
              />
              <ContactInfoCard
                icon={<MapPin className="text-orange-500" size={24} />}
                title="Visit Us"
                detail="4332 Office Address, Street, USA"
                desc="Send us an orbit of custom submit feedback or ideas to prevent business."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component for Side Cards
function ContactInfoCard({ icon, title, detail, desc }) {
  return (
    <div className="group relative flex-1 p-0.5 rounded-[35px] transition-all duration-500 hover:-translate-y-2">
      {/* 2px Gradient Border Layer */}
      <div className="absolute inset-0 rounded-[35px] bg-linear-to-br from-rose-400 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Internal Content */}
      <div className="relative h-full w-full bg-white rounded-[33px] p-8 flex flex-col justify-center border border-gray-100 group-hover:border-transparent transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-5 mb-3">
          <div className="p-4 bg-gray-50 rounded-2xl transition-all duration-700 group-hover.rotate-360 group-hover:bg-purple-50">
            {icon}
          </div>
          <h4 className="font-bold text-lg text-[#0B1530]">{title}</h4>
        </div>
        <p className="text-[#FF0080] font-semibold text-sm mb-2">{detail}</p>
        <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}