import React from "react";
/* eslint-disable */
import { motion } from "framer-motion";
import { Cpu, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      title: "AI-Powered Intelligence",
      description:
        "Menggabungkan machine learning canggih dengan keahlian teknis untuk prediksi yang akurat.",
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      title: "Real-time Monitoring",
      description:
        "Pemantauan aset kritis 24/7 tanpa henti untuk memastikan performa operasional maksimal.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: "Preventive Security",
      description:
        "Mendeteksi anomali sebelum terjadi kerusakan fatal, menjaga keselamatan tim dan aset.",
    },
  ];

  return (
    <section className="relative w-full bg-zinc-950 py-24 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">
                Tentang TurbIQ
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Memberdayakan Insinyur dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Kecerdasan Buatan.
              </span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              TurbIQ bukan sekadar alat monitoring. Kami adalah mitra strategis
              bagi industri manufaktur dan energi. Misi kami sederhana:
              <span className="text-zinc-200 font-medium">
                {" "}
                mengubah data mentah sensor menjadi keputusan perawatan yang
                cerdas.
              </span>
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Dengan Predictive Maintenance Copilot, kami membantu Anda
              mengurangi *downtime* yang tidak terencana, memperpanjang umur
              aset, dan mengoptimalkan biaya operasional secara signifikan.
            </p>

            <Link to={"/login"}>
              <button className="group flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-950 rounded-full font-semibold hover:bg-white transition-all">
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Card Utama */}
            <div className="relative z-10 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-zinc-500 font-mono">
                  SYSTEM_STATUS: OPTIMAL
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-zinc-300">
                    <span>Efisiensi Mesin</span>
                    <span>98%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-zinc-300">
                    <span>Prediksi Anomali</span>
                    <span className="text-emerald-400">Low Risk</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "15%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <div>
                    <h4 className="text-zinc-200 text-sm font-semibold">
                      AI Insight
                    </h4>
                    <p className="text-zinc-400 text-xs mt-1">
                      Turbine A-25 beroperasi dalam parameter optimal. Jadwal
                      maintenance berikutnya: 14 Hari.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-full h-full border border-zinc-700/30 rounded-3xl z-0" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-zinc-800 rounded-2xl -z-10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-zinc-900/50 hover:bg-zinc-800/50 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
