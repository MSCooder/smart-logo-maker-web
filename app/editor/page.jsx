"use client";
import React, { useState, Suspense, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Palette, Type, LayoutGrid, Zap, Eye, Save, ShoppingCart, ChevronDown, Loader2, Menu, X } from 'lucide-react';

const LogoCanvas = dynamic(() => import('../../components/Editor/Canvas'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 bg-white animate-pulse rounded-3xl" />
});

const gradients = {
  primary: "bg-gradient-to-r from-[#FF6B00] via-[#E02424] to-[#2563EB]", 
  hover: "hover:shadow-[0_8px_25px_rgba(224,36,36,0.3)]",
  text: "bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] via-[#E02424] to-[#2563EB]",
};

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Editor...</div>}>
      <EditorUI />
    </Suspense>
  );
}

function EditorUI() {
  const searchParams = useSearchParams();
  
  // Image Loading Fix: State ko direct initialize karne ke bajaye useEffect use karein
  const [logoConfig, setLogoConfig] = useState({
    imageUrl: '/photo1.jfif', // Default
    text: 'Smart Logo Maker',
    bgColor: '#E0F2FE', 
    fontFamily: 'Arial',
  });

  useEffect(() => {
    const img = searchParams.get('img');
    const txt = searchParams.get('text');
    if (img || txt) {
      setLogoConfig(prev => ({
        ...prev,
        imageUrl: img || prev.imageUrl,
        text: txt || prev.text
      }));
    }
  }, [searchParams]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fonts = ['Arial', 'Verdana', 'Georgia', 'Courier New', 'Impact'];
  const colors = [
    { name: 'SoftBlue', value: '#E0F2FE' },
    { name: 'Mint', value: '#DCFCE7' },
    { name: 'Peach', value: '#FFEDD5' },
    { name: 'Lavender', value: '#F3E8FF' },
    { name: 'Rose', value: '#FFE4E6' },
    { name: 'Cream', value: '#FEF3C7' },
  ];

  const variations = [
    { id: 1, label: 'Modern' }, { id: 2, label: 'Clean' },
    { id: 3, label: 'Soft' }, { id: 4, label: 'Minimal' },
    { id: 5, label: 'Bold' }, { id: 6, label: 'Classic' },
  ];

  return (
    <div className="fixed inset-0 bg-[#f4f7fa] flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* 1. MOBILE SIDEBAR - Z-INDEX FIX */}
      <div className={`fixed inset-0 z-[200] md:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <aside className={`absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 border-b flex justify-between items-center">
            <span className={`font-bold text-sm ${gradients.text}`}>VARIATIONS</span>
            <X onClick={() => setSidebarOpen(false)} className="cursor-pointer text-gray-400" size={20} />
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
            {variations.map((v) => (
              <div key={v.id} onClick={() => { setLogoConfig({...logoConfig, bgColor: colors[v.id % colors.length].value}); setSidebarOpen(false); }} className="border border-gray-100 rounded-xl p-3 hover:border-orange-400 transition-colors">
                 <div className="w-full aspect-video rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: logoConfig.bgColor }}>
                    <img src={logoConfig.imageUrl} className="w-12 h-12 object-contain" alt="preview" />
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{v.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* 2. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col shrink-0">
        <div className="p-8 border-b border-gray-50">
           <h2 className={`text-xs font-black uppercase tracking-widest ${gradients.text}`}>Variations</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
           {variations.map((v) => (
             <div key={v.id} onClick={() => setLogoConfig({...logoConfig, bgColor: colors[v.id % colors.length].value})} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-orange-400 cursor-pointer transition-all group">
                <div className="w-full aspect-video rounded-xl mb-2 flex items-center justify-center group-hover:scale-[1.02] transition-transform" style={{ backgroundColor: logoConfig.bgColor }}>
                   <img src={logoConfig.imageUrl} alt="preview" className="w-14 h-14 object-contain" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{v.label}</span>
             </div>
           ))}
        </div>
      </aside>

      {/* 3. MAIN AREA */}
      <main className="flex-1 flex flex-col relative h-full">
        
        {/* TOPBAR - 4 BUTTONS FIXED */}
        <div className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-center px-4 md:px-8 gap-2 md:gap-3 shrink-0 overflow-x-auto no-scrollbar" ref={dropdownRef}>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 bg-gray-50 rounded-xl mr-1"><Menu size={20}/></button>
          
          <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-full text-[11px] md:text-xs font-bold hover:bg-gray-100 transition-all">
            <Zap size={14} className="text-orange-500"/> Style
          </button>

          <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-full text-[11px] md:text-xs font-bold hover:bg-gray-100 transition-all">
            <LayoutGrid size={14} className="text-blue-500"/> Layout
          </button>
          
          {/* Font Dropdown */}
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === 'font' ? null : 'font')} className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[11px] md:text-xs font-bold transition-all ${gradients.primary}`}>
              <Type size={14}/> Font <ChevronDown size={12}/>
            </button>
            {activeDropdown === 'font' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl z-[210] border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2">
                {fonts.map(f => <button key={f} onClick={() => {setLogoConfig({...logoConfig, fontFamily: f}); setActiveDropdown(null);}} className="w-full text-left p-2.5 hover:bg-gray-50 rounded-xl text-sm" style={{fontFamily: f}}>{f}</button>)}
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === 'color' ? null : 'color')} className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[11px] md:text-xs font-bold transition-all ${gradients.primary}`}>
              <Palette size={14}/> Color <ChevronDown size={12}/>
            </button>
            {activeDropdown === 'color' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-3xl z-[210] border border-gray-100 p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                {colors.map(c => (
                  <button key={c.value} onClick={() => {setLogoConfig({...logoConfig, bgColor: c.value}); setActiveDropdown(null);}} className="flex items-center gap-2 p-2 border border-gray-50 rounded-xl hover:bg-gray-50 transition-all">
                    <span className="w-6 h-6 rounded-lg shrink-0 shadow-inner" style={{ backgroundColor: c.value }} />
                    <span className="text-[10px] font-bold text-gray-600">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CANVAS AREA */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#f8fafc] overflow-hidden relative">
          {/* Watermark only on desktop */}
          <div className="absolute hidden md:block select-none opacity-[0.03] font-black text-[15vw] rotate-[-10deg] pointer-events-none">
            {logoConfig.text}
          </div>
          
          <div className="w-full h-full max-w-[800px] max-h-[500px] flex items-center justify-center relative z-10">
             <LogoCanvas config={logoConfig} />
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="h-20 md:h-24 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-around md:justify-center gap-3 md:gap-6 px-4 md:px-10 shrink-0 shadow-[-0px_-4px_20px_rgba(0,0,0,0.02)]">
          <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-700 text-xs md:text-sm hover:shadow-md transition-all">
            <Eye size={16}/> Preview
          </button>
          
          <button 
            onClick={() => {setIsLoading(true); setTimeout(()=>setIsLoading(false), 2000)}} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-xs md:text-sm shadow-xl transition-all ${gradients.primary} ${gradients.hover}`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
            <span>{isLoading ? "Saving..." : "Save Design"}</span>
          </button>

          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-orange-600 rounded-full font-bold text-xs md:text-sm border border-orange-200 hover:bg-orange-50 transition-all">
            <ShoppingCart size={18}/> Buy Logo
          </button>
        </div>
      </main>
    </div>
  );
}