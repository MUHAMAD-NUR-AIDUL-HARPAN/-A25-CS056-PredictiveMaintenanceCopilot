import React from "react";
/* eslint-disable */
import { motion } from "framer-motion";
import { Zap, ShieldAlert, BarChart3 } from "lucide-react";

const Keunggulan = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Intelligent Anomaly Detection",
      description:
        "Copilot menganalisis data sensor secara real-time untuk mendeteksi potensi kerusakan lebih awal, membantu engineer mencegah downtime dan meningkatkan keandalan peralatan kritis.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-blue-400" />,
      title: "Proactive Risk Alerts",
      description:
        "Dapatkan peringatan dini sebelum masalah menjadi fatal. Sistem kami memprioritaskan risiko berdasarkan tingkat urgensi, sehingga tim Anda tahu persis mana yang harus ditangani lebih dulu.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: "Cost-Effective Maintenance",
      description:
        "Ubah strategi dari 'perbaiki saat rusak' menjadi 'perbaiki sebelum rusak'. Hemat biaya operasional dan perpanjang umur aset industri Anda dengan rekomendasi berbasis data.",
    },
  ];

  return (
    <section
      id="keunggulan"
      className="bg-black text-white py-20 lg:py-32 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Why engineers <br />
                <span className="text-zinc-500">choose our</span> <br />
                Copilot?
              </h2>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full mt-4" />
              <p className="mt-8 text-zinc-400 text-lg">
                Solusi cerdas untuk industri modern yang menuntut efisiensi
                tanpa kompromi.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keunggulan;
