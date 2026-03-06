"use client";
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Edit3, Bookmark, Loader2, ShoppingCart, X } from 'lucide-react';
import { useSelector } from "react-redux";

const ResultsPage = () => {
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const { formData, results, status } = useSelector((state) => state.logo);

  const logos = useMemo(() => {
    const count = 6;
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `Design ${index + 1}`,
      src: `/photo${index + 1}.jfif`,
      initials: formData?.name || "BRAND",
      themeColor: '#8b5e3c'
    }));
  }, [formData]);

  // Loading State fix: Brace add kiya
  if (status === 'loading') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-pink-50">
        <Loader2 className="animate-spin text-pink-600 mb-4" size={48} />
        <p className="text-slate-600 font-bold">Fetching your brand designs...</p>
      </div>
    );
  }

  const handleEditOnCanva = (design) => {
    const params = new URLSearchParams({
      img: design.src, 
      text: design.initials, 
      color: design.themeColor, 
      name: design.name
    });
    router.push(`/editor?${params.toString()}`);
  };

  return (
    <div className="mt-20 min-h-screen bg-pink-50 w-full pb-20 pt-10">
      <div className="max-w-6xl mx-auto p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Designs for {formData?.name || "Brand"}</h1>
          <button onClick={() => router.push('/create')} className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-xl border shadow-sm font-bold">
            <ChevronLeft size={20} /> Change Info
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {logos.map((design) => (
            <motion.div key={design.id} className="group bg-white p-4 rounded-[2.5rem] shadow-md relative border border-transparent hover:border-pink-200 transition-all">
              <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden bg-slate-50 mb-4">
                <Image src={design.src} alt={design.name} fill className="object-contain p-4" unoptimized />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex gap-2 px-2 w-full justify-center">
                    <button onClick={() => setSelectedDesign(design)} className="bg-white text-sky-500 p-3 rounded-full shadow-md"><Bookmark size={16} /></button>
                    <button onClick={() => handleEditOnCanva(design)} className="bg-white text-emerald-500 p-3 rounded-full shadow-md"><Edit3 size={16} /></button>
                    <button className="bg-orange-500 text-white p-3 rounded-full shadow-md"><ShoppingCart size={16} /></button>
                  </div>
                </div>
              </div>
              <span className="text-slate-500 font-medium block text-center">{design.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-[2.5rem] max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedDesign(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full"><X size={20} /></button>
              <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden mb-4">
                <Image src={selectedDesign.src} alt="Preview" fill className="object-contain" unoptimized />
              </div>
              <h2 className="text-2xl font-black text-center">{selectedDesign.name}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsPage;