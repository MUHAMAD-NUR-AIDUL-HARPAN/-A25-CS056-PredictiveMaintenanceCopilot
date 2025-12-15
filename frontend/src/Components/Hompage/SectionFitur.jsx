import React from "react";
/* eslint-disable */
import { motion } from "framer-motion";
import { Bot, Zap, MonitorSmartphone } from "lucide-react";

import LaptopImg from "../../assets/laptop.png";

const SectionFitur = () => {
  const features = [
    {
      title: "Deteksi Anomali Real-Time",
      description:
        "Sistem memantau data secara real-time untuk mendeteksi anomali lebih cepat dan akurat.",
      icon: <Bot className="w-8 h-8 text-blue-500" />,
      desktopPosition: "top-0 -left-12 lg:-left-4",
    },
    {
      title: "Analisis Otomatis",
      description:
        "Analisis data dilakukan otomatis oleh AI untuk membantu pengambilan keputusan instan.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      desktopPosition: "top-1/3 -right-12 lg:-right-10",
    },
    {
      title: "Multi Platform",
      description:
        "Dapat digunakan di berbagai perangkat (Desktop, Tablet, HP) dengan tampilan optimal.",
      icon: <MonitorSmartphone className="w-8 h-8 text-purple-500" />,
      desktopPosition: "-bottom-8 left-1/4",
    },
  ];

  return (
    <section className="w-full py-20 bg-zinc-950 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-[60px] relative z-10">
        <div className="hidden lg:block relative max-w-5xl mx-auto mt-10">
          <div className="flex justify-center relative z-10">
            <div className="absolute -bottom-10 w-3/4 h-20 bg-black/50 blur-2xl rounded-full" />

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={LaptopImg}
              alt="Dashboard Preview"
              className="relative z-10 w-full max-w-[800px] drop-shadow-2xl"
            />
          </div>

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className={`absolute ${item.desktopPosition} z-20`}
            >
              <div className="flex flex-col gap-2 p-5 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] max-w-[280px] hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                    {item.icon}
                  </div>
                  <p className="text-white text-lg font-semibold leading-tight">
                    {item.title}
                  </p>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="block lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-12 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-3xl rounded-full" />
            <img
              src={LaptopImg}
              alt="Dashboard"
              className="relative z-10 max-w-full sm:max-w-[500px] drop-shadow-xl"
            />
          </motion.div>

          <div className="space-y-6">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 items-start bg-zinc-900/50 p-6 rounded-2xl border border-white/5"
              >
                <div className="shrink-0 p-3 bg-zinc-800 rounded-xl border border-white/10">
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-bold text-xl text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFitur;
