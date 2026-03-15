"use client";
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Edit3, Bookmark, Loader2, ShoppingCart, X } from 'lucide-react';
import { useSelector } from "react-redux";

const LogoComposer = ({ iconUrl, svgSource, text, textColor, fontFamily }) => {
  const label = (text || 'BRAND').toUpperCase();
  const color = textColor || '#1a1a2e';
  const fontSize = label.length > 10 ? 13 : label.length > 7 ? 15 : 18;

  // Extract inner SVG content from svg_source_code if available
  const innerSvg = useMemo(() => {
    if (!svgSource) return null;
    const inner = svgSource.replace(/<\/?svg[^>]*>/gi, '').trim();
    return inner || null;
  }, [svgSource]);

  const iconViewBox = useMemo(() => {
    if (!svgSource) return '0 0 100 100';
    const m = svgSource.match(/viewBox=["']([^"']+)["']/i);
    return m ? m[1] : '0 0 100 100';
  }, [svgSource]);

  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* ── ICON (top section) ── */}
      {innerSvg ? (
        <svg x="50" y="12" width="100" height="100" viewBox={iconViewBox}
          dangerouslySetInnerHTML={{ __html: innerSvg }}
        />
      ) : iconUrl ? (
        <image href={iconUrl} x="50" y="12" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
      ) : (
        // fallback placeholder circle
        <circle cx="100" cy="62" r="46" fill={color} opacity="0.12" />
      )}

      {/* ── THIN DIVIDER ── */}
      <line x1="70" y1="120" x2="130" y2="120" stroke={color} strokeWidth="1.2" opacity="0.25" />

      {/* ── BRAND NAME (bottom section) ── */}
      <text
        x="100"
        y="148"
        textAnchor="middle"
        fill={color}
        fontSize={fontSize}
        fontWeight="900"
        letterSpacing="3"
        fontFamily={fontFamily || 'Arial Black, Arial, sans-serif'}
      >
        {label}
      </text>
    </svg>
  );
};

const ResultsPage = () => {
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const { formData, results, status } = useSelector((state) => state.logo);

  const normalizeLogoUrl = (value) => {
    if (typeof value !== 'string') return null;

    const trimmed = value.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('data:image/')) return trimmed;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed.replace('https://www.logoai.com//', 'https://www.logoai.com/');
    }
    if (trimmed.startsWith('//')) return `https:${trimmed}`;
    if (trimmed.startsWith('/')) return `https://www.logoai.com${trimmed}`;

    return trimmed;
  };

  const extractLogoUrl = (item) => {
    if (!item) return null;

    const directCandidates = [
      item?.site_source,
      item?.render_url,
      item?.renderUrl,
      item?.logo_url,
      item?.logoUrl,
      item?.preview_url,
      item?.previewUrl,
    ];

    for (const candidate of directCandidates) {
      const normalized = normalizeLogoUrl(candidate);
      if (normalized) {
        return normalized;
      }
    }

    const nestedCandidates = [
      item?.site?.source,
      item?.render?.url,
      item?.logo?.url,
      item?.preview?.url,
    ];

    for (const candidate of nestedCandidates) {
      const normalized = normalizeLogoUrl(candidate);
      if (normalized) {
        return normalized;
      }
    }

    const iconFallbackCandidates = [
      item?.icon_normal?.url,
      item?.icon_svg?.url,
      item?.icon_white?.url,
      item?.icon_black?.url,
      item?.icon?.url,
      item?.name_icon?.list?.[0]?.url,
      item?.name_icon?.list?.[0]?.icon_address,
      item?.name_icon?.list?.[0]?.imgpath,
    ];

    for (const candidate of iconFallbackCandidates) {
      const normalized = normalizeLogoUrl(candidate);
      if (normalized) {
        return normalized;
      }
    }

    return null;
  };

  const logos = useMemo(() => {
    const apiLogos = Array.isArray(results)
      ? results
          .map((item, index) => {
            const src = extractLogoUrl(item);
            if (!src) return null;

            return {
              id: item?.id ?? item?.logo_id ?? item?.tplId ?? index + 1,
              name: item?.logo_name ?? item?.name ?? `Design ${index + 1}`,
              iconUrl: src,
              businessName: item?.editedText ?? formData?.name ?? item?.logo_name ?? 'BRAND',
              bgColor: item?.editedBgColor ?? item?.background_color ?? item?.bg_color ?? '#f4f4f4',
              textColor: item?.editedTextColor ?? item?.name_color ?? item?.name_icon?.list?.[0]?.colors_list?.[1] ?? '#1a1a2e',
              fontFamily: item?.editedFontFamily ?? 'Arial Black, Arial, sans-serif',
              sourceIndex: index,
              raw: item,
            };
          })
          .filter(Boolean)
      : [];

    if (apiLogos.length > 0) {
      return apiLogos.slice(0, 6);
    }

    return [];
  }, [formData, results]);

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
      img: design.iconUrl ?? '',
      text: design.businessName,
      color: design.textColor ?? '#1a1a2e',
      bg: design.bgColor ?? '#f4f4f4',
      font: design.fontFamily ?? 'Arial',
      idx: String(design.sourceIndex),
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
          {status === 'succeeded' && logos.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-600 font-semibold">No logo image URL found in API response.</p>
            </div>
          )}
          {logos.map((design) => (
            <motion.div key={design.id} className="group bg-white p-4 rounded-[2.5rem] shadow-md relative border border-transparent hover:border-pink-200 transition-all">
              <div
                className="w-full aspect-square relative rounded-[2rem] overflow-hidden mb-4 flex items-center justify-center p-4"
                style={{ background: design.bgColor || '#f4f4f4' }}
              >
                <LogoComposer
                  iconUrl={design.iconUrl}
                  svgSource={design.raw?.name_icon?.list?.[0]?.svg_source_code}
                  text={design.businessName}
                  textColor={design.textColor}
                  fontFamily={design.fontFamily}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex gap-2 px-2 w-full justify-center">
                    <button onClick={() => setSelectedDesign(design)} className="bg-white text-sky-500 p-3 rounded-full shadow-md"><Bookmark size={16} /></button>
                    <button onClick={() => handleEditOnCanva(design)} className="bg-white text-emerald-500 p-3 rounded-full shadow-md"><Edit3 size={16} /></button>
                    <button className="bg-orange-500 text-white p-3 rounded-full shadow-md"><ShoppingCart size={16} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PREVIEW MODAL */}
    <AnimatePresence>
  {selectedDesign && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
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

        {/* Merged Logo Preview */}
        <div
          className="w-full aspect-square relative rounded-[2rem] overflow-hidden mb-6 border border-slate-100 flex flex-col items-center justify-center gap-6 p-10"
          style={{ background: selectedDesign.bgColor || '#f4f4f4' }}
        >
          <LogoComposer
            iconUrl={selectedDesign.iconUrl}
            svgSource={selectedDesign.raw?.name_icon?.list?.[0]?.svg_source_code}
            text={selectedDesign.businessName}
            textColor={selectedDesign.textColor}
            fontFamily={selectedDesign.fontFamily}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Edit Button - Redirects to Canvas */}
          <button 
            onClick={() => handleEditOnCanva(selectedDesign)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <Edit3 size={18} />
            Edit Design
          </button>

          {/* Buy Button */}
          <button 
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#E02424] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-orange-200"
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
};

export default ResultsPage;