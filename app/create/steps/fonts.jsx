'use client';
import { Type, ChevronLeft } from 'lucide-react';

const fontStyles = [
  { name: 'Modern Sans', description: 'Clean and contemporary', style: 'font-sans' },
  { name: 'Elegant Serif', description: 'Sophisticated and timeless', style: 'font-serif' },
  { name: 'Bold Display', description: 'Strong and impactful', style: 'font-extrabold tracking-tighter' },
  { name: 'Playful Rounded', description: 'Friendly and approachable', style: 'font-mono' },
  { name: 'Minimal Light', description: 'Subtle and refined', style: 'font-light' },
  { name: 'Classic Script', description: 'Elegant and decorative', style: 'font-serif italic' },
];

const Fonts = ({ onNext, onBack, data, setData }) => {
  
  const handleSelect = (fontName) => {
    setData({ ...data, font: fontName });
  };

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Top Left Back Button */}
      <div className="w-full flex justify-start mb-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-black transition-all bg-white px-5 py-2.5 rounded-xl border border-slate-100 shadow-sm font-bold active:scale-95"
        >
          <ChevronLeft size={18} strokeWidth={3} />
          Back
        </button>
      </div>

      {/* Title Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="p-5 rounded-[2rem] bg-white shadow-xl shadow-pink-100/50 mb-6 border border-white">
          <Type size={40} className="text-pink-600" />
        </div>
        <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tight mb-4">
          Choose Your Font Style
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-lg">
          Select a typography style that matches your brand personality
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-12">
        {fontStyles.map((font) => {
          const isSelected = data.font === font.name;

          return (
            <button
              key={font.name}
              onClick={() => handleSelect(font.name)}
              className={`
                relative p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4
                transition-all duration-500 ease-out border-2
                ${isSelected
                  ? 'bg-white shadow-[0_20px_40px_-10px_rgba(255,0,122,0.15)] border-pink-200 scale-105 z-10'
                  : 'bg-white/60 shadow-sm border-transparent hover:border-slate-100 hover:bg-white hover:shadow-md'
                }
              `}
            >
              <span className={`text-5xl md:text-6xl text-slate-900 mb-2 ${font.style}`}>
                Aa
              </span>

              <div className="text-center">
                <span className={`text-lg font-bold block ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                  {font.name}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {font.description}
                </span>
              </div>

              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-linear-to-r from-[#FF5C00] to-[#FF007A] p-1.5 rounded-full shadow-lg border-2 border-white animate-in zoom-in-50 duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Action Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
          <button
            onClick={onBack}
            className="w-full md:w-1/2 py-5 rounded-3xl text-lg font-bold text-slate-400 bg-white shadow-sm hover:text-slate-600 transition-all border border-slate-50 active:scale-95"
          >
            Go Back
          </button>
          
          <button
            onClick={onNext}
            disabled={!data.font}
            className={`
              w-full md:w-1/2 py-6 rounded-[2rem] text-xl font-black text-white
              transition-all duration-500 shadow-2xl tracking-wide flex items-center justify-center gap-3
              ${data.font
                ? 'bg-linear-to-r from-[#FFB88C] via-[#FF007A] to-[#C400FF] hover:scale-[1.02] active:scale-95 shadow-pink-500/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60 shadow-none'
              }
            `}
          >
            Continue <span>→</span>
          </button>
      </div>
    </div>
  );
};

export default Fonts;