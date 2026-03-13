"use client";
import React, { useState, Suspense, useEffect, useRef } from 'react'; // ایک بار امپورٹ کریں
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Palette, Type, Save, ShoppingCart, ChevronDown, Menu, X, Edit3 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LogoCanvas = dynamic(() => import('../../components/Editor/Canvas'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-white animate-pulse rounded-3xl" />
});

const gradients = {
  primary: "bg-gradient-to-r from-[#FF6B00] via-[#E02424] to-[#2563EB]",
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

 const [sidebarMode, setSidebarMode] = useState('variations');
  const [layout, setLayout] = useState('vertical'); 
  const [logoStyle, setLogoStyle] = useState('standard'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const canvasRef = useRef(null); 
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState(null);

  // Preview Button Handler
  const handlePreviewClick = () => {
    setSelectedDesign({
      src: logoConfig.imageUrl,
      name: logoConfig.text,
      initials: logoConfig.text,
      themeColor: logoConfig.bgColor
    });
  };

  const searchParams = useSearchParams();

  // --- STEP 5: URL Handover Logic ---
  // Results page se bheja gaya data yahan receive ho raha hai
  const urlImage = searchParams.get('img');
  const urlName = searchParams.get('text');

  // Redux se fallback data (agar URL mein na ho)
  const { formData } = useSelector((state) => state.logo);

  const [logoConfig, setLogoConfig] = useState({
    imageUrl: urlImage || '/photo1.jfif', // Priority to URL
    text: urlName || formData.name || 'BRAND', // URL -> Redux -> Default
    bgColor: '#FFFFFF',
    fontFamily: 'Arial',
    textColor: '#1A1A1A'
  });

  // URL change hone par state update karna (Security/Sync)
  useEffect(() => {
    if (urlImage || urlName) {
      setLogoConfig(prev => ({
        ...prev,
        imageUrl: urlImage || prev.imageUrl,
        text: urlName || prev.text
      }));
    }
  }, [urlImage, urlName]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fonts = ['Arial', 'Verdana', 'Georgia', 'Courier New', 'Impact', 'serif', 'mono'];
  const colors = [
    { name: 'Pure White', value: '#FFFFFF' },
    { name: 'SoftBlue', value: '#E0F2FE' },
    { name: 'Mint', value: '#DCFCE7' },
    { name: 'Peach', value: '#FFEDD5' },
    { name: 'Dark', value: '#1A1A1A' },
  ];

  const variations = [
    { id: 1, label: 'Modern' }, { id: 2, label: 'Clean' },
    { id: 3, label: 'Soft' }, { id: 4, label: 'Minimal' },
  ];

  const sidebarData = {
    variations: variations, 
    style: [
      { id: 'glass', label: 'Glassmorphism' },
      { id: 'neon', label: 'Neon Glow' },
      { id: 'minimal', label: 'Minimalist' }
    ],
    layout: [
      { id: 'vertical', label: 'Logo Top' },
      { id: 'horizontal', label: 'Logo Left' },
      { id: 'textOnly', label: 'Text Only' }
    ]
  };

  const sidebarOptions = {
    variations: [
      { id: 'v1', label: 'Modern', color: '#E0F2FE' },
      { id: 'v2', label: 'Clean', color: '#DCFCE7' },
    ],
    style: [
      { id: 'glass', label: 'Glassmorphism' },
      { id: 'neon', label: 'Neon Glow' },
      { id: 'minimal', label: 'Minimalist' }
    ],
    layout: [
      { id: 'vertical', label: 'Logo Top' },
      { id: 'horizontal', label: 'Logo Left' },
      { id: 'textOnly', label: 'Text Only' }
    ]
  };



  const currentItems = sidebarData[sidebarMode] || variations;

  return (
    <div className="fixed inset-0 bg-[#f4f7fa] flex flex-col lg:flex-row overflow-hidden font-sans">


      {/* SIDEBAR (Mobile & Desktop Dynamic) */}
      <AnimatePresence>
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-200 lg:hidden transition-all duration-300 ${sidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className={`absolute inset-y-0 left-0 w-80 bg-white shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-6 border-b flex justify-between items-center">
              <span className={`font-bold text-sm uppercase tracking-wider ${gradients.text}`}>VARIATIONS</span>
              <X onClick={() => setSidebarOpen(false)} className="cursor-pointer text-gray-400" size={24} />
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
              {sidebarOptions[sidebarMode].map((v) => (
                <div key={v.id}
                  onClick={() => {
                    if (sidebarMode === 'variations') setLogoConfig({ ...logoConfig, bgColor: v.color });
                    if (sidebarMode === 'layout') setLayout(v.id);
                    if (sidebarMode === 'style') setLogoStyle(v.id);
                    setSidebarOpen(false);
                  }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-orange-400 cursor-pointer">
                  <div className="w-full aspect-video rounded-xl mb-2 bg-white shadow-sm overflow-hidden flex items-center justify-center relative">
                    <div className="absolute inset-0 origin-center">
                      <LogoCanvas
                        config={logoConfig}
                        layout={v.id === 'horizontal' ? 'horizontal' : 'vertical'}
                        isPreview={true}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mt-2">{v.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-90 bg-white border-r border-gray-100 flex-col shrink-0">
        <div className="p-8 border-b border-gray-50">
          <h2 className={`text-xs font-black uppercase tracking-widest ${gradients.text}`}>VARIATIONS</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50/30">
          {sidebarOptions[sidebarMode].map((v) => (
            <div key={v.id}
              onClick={() => {
                if (sidebarMode === 'variations') setLogoConfig({ ...logoConfig, bgColor: v.color });
                if (sidebarMode === 'layout') setLayout(v.id);
                if (sidebarMode === 'style') setLogoStyle(v.id);
              }}
              className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm hover:border-orange-400 cursor-pointer transition-all">
              <div className="w-full aspect-video text-sm rounded-xl mb-2 bg-white shadow-sm overflow-hidden flex items-center justify-center relative">
                <div className="w-full aspect-video rounded-xl mb-2 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                  <div className="w-full text-2xl h-full flex items-center justify-center pointer-events-none">
                    <LogoCanvas
                      config={logoConfig}
                      layout={v.id === 'horizontal' ? 'horizontal' : 'vertical'}
                      isPreview={true}
                      width={400}  
                      height={250}
                    />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase mt-2 block">{v.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative h-full min-w-0">

        {/* TOPBAR */}
        <div className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-center px-4 md:px-8 shrink-0 z-100">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 bg-gray-50 rounded-xl">
              <Menu size={22} className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <button
              onClick={() => { setSidebarMode('style'); setSidebarOpen(true); }}
              className=" hover:border-red hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-white text-orange-600 rounded-full font-bold text-sm border border-orange-200">
              <ShoppingCart size={18} /> <span>Style</span>
            </button>
            <button
              onClick={() => { setSidebarMode('layout'); setSidebarOpen(true); }}
              className="hover:border-red hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-white text-orange-600 rounded-full font-bold text-sm border border-orange-200">
              <ShoppingCart size={18} /> <span>Layout</span>
            </button>
            {/* Font Dropdown */}
            <div className="relative">
              <button onClick={() => setActiveDropdown(activeDropdown === 'font' ? null : 'font')}
                className={`hover:border-red hover:scale-105 active:scale-95 duration-300 shadow-sm flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-bold transition-all ${gradients.primary}`}>
                <Type size={14} /> <span>Font</span> <ChevronDown size={12} />
              </button>
              {activeDropdown === 'font' && (
                <div className="hover:border-red hover:scale-105 active:scale-95 transition-all duration-300 absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl z-110 bsorder border-gray-100 p-2">
                  {fonts.map(f => (
                    <button key={f} onClick={() => { setLogoConfig({ ...logoConfig, fontFamily: f }); setActiveDropdown(null); }}
                      className=" w-full text-left p-2.5 hover:bg-gray-50 rounded-xl text-sm" style={{ fontFamily: f }}>{f}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Dropdown */}
            <div className="relative">
              <button onClick={() => setActiveDropdown(activeDropdown === 'color' ? null : 'color')}
                className={`hover:border-red hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-bold  ${gradients.primary}`}>
                <Palette size={14} /> <span>Color</span> <ChevronDown size={12} />
              </button>
              {activeDropdown === 'color' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-2xl rounded-3xl z-110 border border-gray-100 p-4 grid grid-cols-2 gap-2">
                  {colors.map(c => (
                    <button key={c.value} onClick={() => { setLogoConfig({ ...logoConfig, bgColor: c.value }); setActiveDropdown(null); }}
                      className="flex items-center gap-2 p-2 border border-gray-50 rounded-xl hover:bg-gray-50 transition-all">
                      <span className="w-6 h-6 rounded-lg shrink-0 shadow-inner" style={{ backgroundColor: c.value }} />
                      <span className="text-[10px] font-bold text-gray-600">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
        {/* </div> */}

        {/* CANVAS */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-10 bg-[#f8fafc] overflow-hidden">

          <LogoCanvas
            config={logoConfig}
            layout={layout}       
            logoStyle={logoStyle} 
          />

        </div>

        {/* BOTTOM NAV */}
        <div className="h-20 md:h-24 bg-white border-t border-gray-100 flex items-center justify-center gap-4 px-6 shrink-0 z-50">
          <button
            onClick={handlePreviewClick}
            className={`hover:border-red hover:scale-105 active:scale-95 transition-all duration-300  flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-3.5 rounded-full font-bold text-white text-sm shadow-xl ${gradients.primary}`}>
            <Save size={18} />
            <span>Preview</span>
          </button>
          <button className={`hover:border-red hover:scale-105 active:scale-95 duration-300 flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-3.5 rounded-full font-bold text-white text-sm shadow-xl transition-all ${gradients.primary}`}>
            <Save size={18} />
            <span>Save Design</span>
          </button>

          <button
            className="hover:border-red hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-orange-600 rounded-full font-bold text-sm border border-orange-200">
            <ShoppingCart size={18} /> <span>Buy Now</span>
          </button>
        </div>
      </main>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-100 flex items-center justify-center p-4"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 md:p-8 rounded-[3rem] max-w-lg w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-colors rounded-full z-10"
              >
                <X size={24} />
              </button>

              <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden bg-slate-50 mb-6 border border-slate-100 flex items-center justify-center">
                <LogoCanvas
                  ref={canvasRef}
                  config={{
                    ...logoConfig, 
                   
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Buy Button */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-[#FF6B00] to-[#E02424] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-orange-200"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

