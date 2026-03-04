"use client";
import { HiOutlineSparkles } from 'react-icons/hi';
import { ChevronLeft } from 'lucide-react';
import { useDispatch } from "react-redux";
import { setBusinessName } from "@/store/logoSlice";

const BusinessInfo = ({ onNext, data, setData }) => {
  const isFormValid = data.businessName.trim() !== '';

const dispatch = useDispatch();
const handleChange = (e) => {
  dispatch(setBusinessName(e.target.value));
};

  return (
    /* Width barhane ke liye max-w-5xl use kiya hai aur px-0 taake sides barabar hon */
    <div className="w-full flex flex-col items-center pt-10 max-w-6xl mx-auto relative animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 md:px-0">

      {/* Back Button Section */}
      <div className="w-full flex justify-start mb-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-all bg-white px-5 py-2.5 rounded-xl border border-slate-100 shadow-sm font-bold active:scale-95"
        >
          <ChevronLeft size={18} strokeWidth={3} />
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mx-auto w-24 h-24 bg-linear-to-br from-[#FF5C00] via-[#FF007A] to-[#C400FF] rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-pink-200 border-4 border-white">
          <HiOutlineSparkles className="text-white text-5xl" />
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-[#1A1A1A] tracking-tight mb-5">
          Let's Get Started
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
          Tell us about your business to create the perfect logo
        </p>
      </div>

      {/* Main Form Card - full width of the container */}
      <div className="w-full bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white">
        <div className="space-y-10">
          {/* Business Name Input */}
          <div className="w-full">
            <label className="block text-xl font-bold text-slate-800 mb-4 ml-2">
              Business Name <span className='text-pink-500'>*</span>
            </label>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => setData({ ...data, businessName: e.target.value })}
              placeholder="Enter your business name"
              className='w-full px-8 py-6 rounded-3xl border-2 border-slate-50 outline-none transition-all duration-300 focus:border-pink-200 focus:ring-12 focus:ring-pink-500/5 bg-slate-50/50 text-2xl font-medium'
            />
          </div>

          {/* Slogan Input */}
          <div className="w-full">
            <label className="block text-xl font-bold text-slate-800 mb-4 ml-2">
              Slogan <span className="text-slate-400 font-normal ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.slogan}
              onChange={(e) => setData({ ...data, slogan: e.target.value })}
              placeholder="Enter your slogan or tagline"
              className='w-full px-8 py-6 rounded-3xl border-2 border-slate-50 outline-none transition-all duration-300 focus:border-purple-200 focus:ring-12 focus:ring-purple-500/5 bg-slate-50/50 text-2xl font-medium'
            />
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-12 flex items-center justify-center gap-4 bg-slate-50/80 py-4 rounded-2xl border border-slate-100">
          <span className="text-2xl">💡</span>
          <p className="text-slate-500 font-bold italic text-lg">
            Your information helps our AI create personalized logo designs
          </p>
        </div>
      </div>

      {/* Continue Button Section */}
      <div className="w-full mt-12 mb-10">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full py-7 rounded-[2.5rem] text-white font-black text-3xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-4
          ${isFormValid
              ? 'bg-linear-to-r from-[#FFB88C] via-[#FF007A] to-[#C400FF] hover:scale-[1.01] active:scale-95 shadow-pink-500/30'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'}`}
        >
          Continue <span className="text-4xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default BusinessInfo;