"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessInfo from "./steps/bussiness-info";
import Category from "./steps/category";
// import Fonts from "./steps/Fonts";
// import ColorPalette from "./steps/ColorPalette";

export default function CreateLogoPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  // Progress Bar ki width calculate karne ke liye
  const progressPercentage = (step / totalSteps) * 100;

  // Form Data State taake saare steps ka data ek jagah save ho
  const [formData, setFormData] = useState({
    businessName: "",
    slogan: "",
    industry: "",
    fontStyle: "",
    colors: []
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step par redirect karein
      router.push("/generating");
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 px-4 pb-10">
      <div className="max-w-2xl mx-auto">
        
        {/* --- PROGRESS BAR SECTION --- */}
<div className="fixed top-20 left-0 w-full bg-white/80 backdrop-blur-md z-40 py-4 px-6 border-b border-gray-50">
  <div className="max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-2 px-1">
      <span className="text-sm font-bold text-slate-700">
        Step {step} of {totalSteps}
      </span>
      <span className="text-sm font-bold text-slate-500">
        {Math.round(progressPercentage)}%
      </span>
    </div>
    
    {/* Progress Track */}
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-linear-to-r from-[#FF5C00] via-[#FF007A] to-[#C400FF] transition-all duration-700 ease-in-out rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  </div>
</div>
        {/* --- END PROGRESS BAR --- */}

        {/* --- DYNAMIC STEPS --- */}
        <div className="mt-8 transition-opacity duration-500">
          {step === 1 && (
            <BusinessInfo 
              onNext={nextStep} 
              data={formData} 
              setData={setFormData} 
            />
          )}
          
          {step === 2 && (
            <Category 
              onNext={nextStep} 
              onBack={prevStep} 
              data={formData} 
              setData={setFormData} 
            />
          )}
          
          {step === 3 && (
            <Fonts 
              onNext={nextStep} 
              onBack={prevStep} 
              data={formData} 
              setData={setFormData} 
            />
          )}
          
          {step === 4 && (
            <ColorPalette 
              onFinish={nextStep} // redirect to generating
              onBack={prevStep} 
              data={formData} 
              setData={setFormData} 
            />
          )}
        </div>

      </div>
    </div>
  );
}