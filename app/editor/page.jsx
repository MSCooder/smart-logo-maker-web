"use client";
import React, { useState, Suspense, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Palette, Type, LayoutGrid, Zap, Eye, Save, ShoppingCart, ChevronDown, Loader2 } from 'lucide-react';

const LogoCanvas = dynamic(() => import('../../components/Editor/Canvas'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-white animate-pulse rounded-3xl" />
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
  const clickedImage = searchParams.get('img') || '/photo1.jfif'; 
  const initialText = searchParams.get('text') || 'Smart Logo Maker';

  const [logoConfig, setLogoConfig] = useState({
    imageUrl: clickedImage,
    text: initialText,
    bgColor: '#E0F2FE', 
    fontFamily: 'Arial',
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // API Loading State
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

  // --- API INTEGRATION FUNCTION ---
  const handleSaveLogo = async () => {
    setIsLoading(true);
    // const apiUrl = 'https://www.logoai.com/api/getAllInfo';

    const requestBody = {
      color: "1",
      font: "1",
      industry: 23,
      name: logoConfig.text, // Dynamic Name
      icon_lists: [],
      vDesigners: [1],
      gtoken: "",
      data: [],
      dataPage: 0,
      flippedTplIds: [],
      icon_page: 1,
      industryIconIds: [],
      matchedIconHash: "d41d8cd98f00b204e9800998ecf8427e",
      matchedIconIds: [0],
      miniopenid: "",
      p: 2,
      precomNum: 0,
      predouNum: 91,
      select: "55540,55014,54795,54792,54558,54559,54553,54484,54467,50422,52262,54460,54456,54164,53861,53470,53355,53295,53122,52507,51956,48014,48016,48017,47541,47542,47543,47431,47432,47373,47362,47353,47142,47143,47132,47133,47095,47098,47007,47009,47010,47017,46988,46975,46976,46977,46856,46857,46858,46859,46803,46766,46767,46768,46769,46770,46771,46772,46773,46774,46777,46778,46780,46781,46782,46783,46784,46785,46786,46787,46788,46789,46790,46710,46711,46712,46713,46714,46703,46704,46705,46706,29489,27402,23820,21043,18189,12555,46998,46995",
      selecthash: "17a53c0794d9bcd3ddd8c382fccabb58",
      selectlog: "54559,48016,47543,46772,46712,46998",
      vDesignerTpls: null,
      wechatMiniAppId: ""
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("API Response:", result);
      alert("Design data sent to API! Check console for response.");
    } catch (error) {
      console.error("API Error:", error);
      alert("API request failed (CORS might be blocking direct browser calls).");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen bg-[#f4f7fa] flex overflow-hidden font-sans relative">
      
      {/* 1. WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <h1 className="text-[10vw] font-black text-gray-200/20 uppercase rotate-[-15deg] whitespace-nowrap">
          {logoConfig.text}
        </h1>
      </div>

      {/* 2. SIDEBAR */}
      <aside className="w-80 bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col shrink-0 z-10">
        <div className="p-8 border-b border-gray-200">
           <h2 className={`text-xs font-black uppercase tracking-widest ${gradients.text}`}>Variations</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {variations.map((v) => (
            <div 
              key={v.id} 
              onClick={() => setLogoConfig({...logoConfig, bgColor: colors[v.id % colors.length].value})}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-blue-400 cursor-pointer transition-all group"
            >
               <div className="w-full aspect-video rounded-xl mb-2 flex items-center justify-center overflow-hidden" style={{ backgroundColor: logoConfig.bgColor }}>
                  <img src={logoConfig.imageUrl} alt="preview" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{v.label}</span>
                 <div className="h-1.5 w-8 bg-gray-100 rounded-full" />
               </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 flex flex-col z-10 overflow-hidden">
        
        {/* TOPBAR */}
        <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-center px-8 gap-4 shrink-0 shadow-sm" ref={dropdownRef}>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-all text-sm">
            <Zap size={18} className="text-orange-500" /> Style
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-all text-sm">
            <LayoutGrid size={18} className="text-blue-500" /> Layout
          </button>

          {/* Font Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'font' ? null : 'font')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-lg transition-all ${gradients.primary} ${gradients.hover}`}
            >
              <Type size={18} /> Font <ChevronDown size={14}/>
            </button>
            {activeDropdown === 'font' && (
              <div className="absolute top-full mt-3 left-0 w-48 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-gray-100">
                {fonts.map(f => (
                  <button key={f} onClick={() => { setLogoConfig({...logoConfig, fontFamily: f}); setActiveDropdown(null); }} className="w-full text-left p-3 hover:bg-gray-50 rounded-xl text-sm" style={{fontFamily: f}}>{f}</button>
                ))}
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'color' ? null : 'color')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-lg transition-all ${gradients.primary} ${gradients.hover}`}
            >
              <Palette size={18} /> Color <ChevronDown size={14}/>
            </button>
            {activeDropdown === 'color' && (
              <div className="absolute top-full mt-3 left-0 w-64 bg-white rounded-3xl shadow-2xl p-4 grid grid-cols-2 gap-3 z-50 border border-gray-100">
                {colors.map(c => (
                  <button key={c.value} onClick={() => { setLogoConfig({...logoConfig, bgColor: c.value}); setActiveDropdown(null); }} className="flex items-center gap-3 p-2 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-all group">
                    <span className="w-8 h-8 rounded-xl shrink-0 shadow-inner" style={{ backgroundColor: c.value }} />
                    <span className="text-[11px] font-bold text-gray-600 group-hover:text-blue-600">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        
        {/* CANVAS CONTAINER */}
<div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden bg-transparent relative">
    <div className="w-2xl h-2xl max-w-175 max-h-112.5 flex items-center justify-center">
        <LogoCanvas config={logoConfig} />
    </div>
</div>

        {/* BOTTOM BUTTONS */}
        <div className="h-24 bg-white/90 border-t border-gray-100 flex items-center justify-center px-10 gap-6 shrink-0 shadow-inner">
          <button className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-700 hover:shadow-md transition-all">
            <Eye size={18}/> Preview
          </button>
          
          {/* Update: Save Button with API Call */}
          <button 
            onClick={handleSaveLogo}
            disabled={isLoading}
            className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold text-white shadow-xl transition-all ${gradients.primary} ${gradients.hover} disabled:opacity-70`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
            {isLoading ? "Saving..." : "Save Design"}
          </button>

          <button className="flex items-center gap-2 px-8 py-3 bg-white text-orange-600 rounded-full font-bold border border-orange-200 hover:shadow-md transition-all">
            <ShoppingCart size={18}/> Buy Logo
          </button>
        </div>
      </main>
    </div>
  );
}