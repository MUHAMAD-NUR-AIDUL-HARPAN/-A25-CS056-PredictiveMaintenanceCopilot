import React, { useState } from "react";
/* eslint-disable */
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !message) {
      alert("Mohon lengkapi Nama dan Pesan Anda.");
      return;
    }

    const phoneNumber = "6283805480105";

    const text = `Halo Admin TurbIQ, saya ingin bertanya.%0A%0A*Nama:* ${name}%0A*Email:* ${
      email || "-"
    }%0A%0A*Pesan:*%0A${message}`;

    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-zinc-950 py-20 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-400 text-sm font-bold tracking-wider uppercase">
                Hubungi Kami
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Siap Mengoptimalkan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Kinerja Mesin Anda?
              </span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              Jangan biarkan downtime yang tidak terencana merugikan bisnis
              Anda. Diskusikan kebutuhan predictive maintenance Anda dengan tim
              ahli kami.
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={<Mail className="w-6 h-6 text-white" />}
                title="Email Kami"
                text="hello@turbiq.ai"
              />
              <ContactItem
                icon={<Phone className="w-6 h-6 text-white" />}
                title="Telepon"
                text="0838-0548-0105"
              />
              <ContactItem
                icon={<MapPin className="w-6 h-6 text-white" />}
                title="Kantor Pusat"
                text="Indonesia"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Kirim Pesan ke WhatsApp
              </h3>

              <form onSubmit={handleSendMessage} className="space-y-5">
                {/* Input Nama */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama anda"
                    className="w-full bg-zinc-950/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                {/* Input Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Email Perusahaan
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@perusahaan.com"
                    className="w-full bg-zinc-950/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Input Pesan */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Pesan / Kebutuhan
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan tentang mesin atau masalah yang ingin Anda selesaikan..."
                    className="w-full bg-zinc-950/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full relative overflow-hidden bg-white text-black font-bold text-lg rounded-xl py-4 flex items-center justify-center gap-2 group border border-transparent hover:border-blue-400"
                >
                  <span className="absolute inset-0 bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Kirim via WhatsApp
                  </span>

                  <Send className="w-5 h-5 relative z-10 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>

            <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl -z-10 opacity-20" />
            <div className="absolute -bottom-5 -left-5 w-full h-full border border-zinc-800 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, text }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-zinc-400">{text}</p>
      </div>
    </div>
  );
};

export default Contact;
