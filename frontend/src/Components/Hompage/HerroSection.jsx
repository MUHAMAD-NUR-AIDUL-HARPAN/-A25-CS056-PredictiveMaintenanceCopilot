import GridBackground from "../../assets/HeroBackround.png";
import Hero3DImage from "../../assets/logo.png";
import React from "react";
/* eslint-disable */
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-zinc-950 overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
        <img
          src={GridBackground}
          alt="Background Pattern"
          className="h-full w-auto object-cover opacity-10 mix-blend-screen invert"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center text-left max-w-xl pt-20 lg:pt-0"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Insight Cepat, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Keputusan Tepat.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 mb-10 font-light leading-relaxed max-w-md">
              Pantau kondisi mesin dan deteksi anomali secara real-time dengan
              teknologi Predictive Maintenance Copilot.
            </p>

            <div>
              <button
                className="group px-8 py-3 bg-white text-black border border-transparent rounded-xl 
                shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] 
                hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
              >
                Jelajahi lebih lanjut!
              </button>
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end relative mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full transform scale-75" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10"
            >
              <img
                src={Hero3DImage}
                alt="TurbIQ AI Engine"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
