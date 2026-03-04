"use client";
import { HiOutlineSparkles } from 'react-icons/hi';
import { ChevronLeft } from 'lucide-react';

const BusinessInfo = ({ onNext, data, setData }) => {
  const isFormValid = data.businessName.trim() !== '';

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Back Button */}
      <div className="w-full flex justify-start mb-12">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-all bg-white px-5 py-2 rounded-xl border border-slate-100 shadow-sm font-bold"
        >
          <ChevronLeft size={18} />
          Back
        </button>
      </div>

      {/* Icon & Title */}
      <div className="text-center mb-10">
        <div className="mx-auto w-20 h-20 bg-linear-to-br from-[#FF5C00] via-[#FF007A] to-[#C400FF] rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-pink-200">
          <HiOutlineSparkles className="text-white text-4xl" />
        </div>
        <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tight mb-4">
          Let's Get Started
        </h1>
        <p className="text-slate-500 text-xl font-medium">
          Tell us about your business to create the perfect logo
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white p-12 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-bold text-slate-800 mb-3 ml-1">
              Business Name <span className='text-pink-500'>*</span>
            </label>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => setData({ ...data, businessName: e.target.value })}
              placeholder="Enter your business name"
              className='w-full px-7 py-5 rounded-2xl border-2 border-slate-50 outline-none transition-all duration-300 focus:border-pink-200 focus:ring-8 focus:ring-pink-500/5 bg-slate-50/50 text-xl'
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-slate-800 mb-3 ml-1">
              Slogan <span className="text-slate-400 font-normal ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.slogan}
              onChange={(e) => setData({ ...data, slogan: e.target.value })}
              placeholder="Enter your slogan or tagline"
              className='w-full px-7 py-5 rounded-2xl border-2 border-slate-50 outline-none transition-all duration-300 focus:border-purple-200 focus:ring-8 focus:ring-purple-500/5 bg-slate-50/50 text-xl'
            />
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-slate-500 font-medium italic">
            Your information helps our AI create personalized logo designs
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full mt-10">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full py-6 rounded-3xl text-white font-black text-2xl transition-all duration-500 shadow-xl flex items-center justify-center gap-3
            ${isFormValid
              ? 'bg-linear-to-r from-[#FFB88C] via-[#FF007A] to-[#C400FF] hover:scale-[1.01] active:scale-95 shadow-pink-500/30'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          Continue <span className="text-3xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default BusinessInfo;