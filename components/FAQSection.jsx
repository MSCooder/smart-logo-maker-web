'use client'; 

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const faqs = [
    {
      question: "What's a sheet of on smart logo?",
      answer: "Our smart logo sheets are comprehensive design guides that ensure brand consistency across all digital and print mediums. They include color palettes, typography rules, and spacing guidelines tailored for your specific business needs."
    },
    {
      question: "How do I improve your questions?",
      answer: "You can improve questions by providing clear context and specific details. Our system uses advanced algorithms to refine user queries, ensuring you get the most accurate and helpful responses possible."
    },
    {
      question: "What is the environment of your smart logo?",
      answer: "The environment refers to the ecosystem where your logo lives—from mobile apps to large-scale billboards. We optimize every logo to be responsive, meaning it looks perfect regardless of the screen size or background color."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-[#f8faff] py-20 px-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          For frequently asked questions and detailed support, please browse through our help center sections.
        </p>
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-3xl space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          
          return (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-500 ${
                isOpen ? 'border-blue-200 shadow-xl shadow-blue-500/5' : 'border-gray-100 shadow-sm'
              } overflow-hidden`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                {/* Gradient Text Logic */}
                <span className={`text-lg font-bold transition-all duration-500 ${
                  isOpen 
                  ? 'bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent scale-[1.02]' 
                  : 'text-gray-800'
                }`}>
                  Q. {faq.question}
                </span>

                <div className={`ml-4 shrink-0 p-2 rounded-full transition-colors duration-500 ${
                  isOpen ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-5 text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;