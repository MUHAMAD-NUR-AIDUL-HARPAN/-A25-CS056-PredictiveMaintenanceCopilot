import React, { useState } from "react";
/* eslint-disable */

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Data apa saja yang dapat dianalisis oleh TurbIQ?",
    answer:
      "TurbIQ dapat menganalisis berbagai jenis data sensor seperti suhu, getaran, tekanan, arus listrik, dan parameter operasional lainnya dari mesin dan peralatan industri. Sistem kami dirancang untuk mengintegrasikan data dari berbagai sumber sensor dan sistem monitoring yang ada.",
  },
  {
    question: "Bagaimana TurbIQ mendeteksi potensi kerusakan mesin?",
    answer:
      "TurbIQ menggunakan algoritma machine learning yang canggih untuk menganalisis pola data sensor secara real-time. Sistem membandingkan data aktual dengan baseline normal dan mendeteksi anomali yang mengindikasikan potensi kerusakan. AI copilot kami memberikan peringatan dini sebelum masalah menjadi kritis.",
  },
  {
    question: "Apakah TurbIQ dapat digunakan oleh teknisi non-data?",
    answer:
      "Ya, TurbIQ dirancang dengan antarmuka yang user-friendly dan menggunakan Natural Language Query (Chatbot Copilot) sehingga teknisi tanpa latar belakang data science dapat dengan mudah menggunakannya. Sistem memberikan rekomendasi yang jelas dan dapat ditindaklanjuti dalam bahasa yang mudah dipahami.",
  },
  {
    question:
      "Dapatkah TurbIQ membantu mengatasi downtime mesin yang tidak terencana?",
    answer:
      "Tentu saja. TurbIQ membantu mencegah downtime yang tidak terencana dengan mendeteksi potensi masalah lebih awal melalui analisis prediktif. Dengan peringatan dini dan rekomendasi perawatan yang tepat waktu, teknisi dapat melakukan perawatan preventif sebelum mesin mengalami kerusakan yang menyebabkan downtime.",
  },
];

const TurbIQFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-zinc-950 py-20 px-6 overflow-hidden min-h-[600px] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-zinc-800/20 to-transparent blur-3xl pointer-events-none" />

      {/* The Big Curve Shape */}
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-zinc-900 rounded-full blur-2xl opacity-50 pointer-events-none md:block hidden" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title */}
          <div className="lg:col-span-5 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Pertanyaan <br />
                <span className="text-zinc-400">yang sering</span> <br />
                diajukan
              </h2>
              <div className="w-20 h-1 bg-blue-500 mt-6 rounded-full" />
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQ_DATA.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={activeIndex === index}
                onClick={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
        isOpen
          ? "bg-zinc-800/50 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          : "bg-zinc-900/40 border-white/10 hover:border-white/20"
      } backdrop-blur-sm`}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <span className="text-lg font-medium text-zinc-100 pr-4">
          {item.question}
        </span>
        <div
          className={`p-1 rounded-full border transition-colors duration-300 ${
            isOpen
              ? "bg-blue-500 border-blue-500 text-white"
              : "bg-transparent border-zinc-600 text-zinc-400"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-6 pt-0 text-zinc-400 leading-relaxed text-sm md:text-base border-t border-white/5 mt-2">
              <div className="pt-4">{item.answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TurbIQFaq;
