// import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroBackround from "../assets/HeroBackround.png";
import Logo from "../assets/logo.png";
import Dasboard from "../assets/dashboard.png";
import Icon from "../Components/icons/Icon";
import Laptop from "../assets/laptop.png";

// ============================================
// FAQ DATA
// ============================================
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

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="w-full backdrop-blur-xl bg-[rgba(6,2,19,0.1)] rounded-[20px] px-[18px] py-[19px] flex items-center justify-between transition-all duration-300 hover:bg-[rgba(6,2,19,0.15)]"
        style={{
          boxShadow:
            "inset 0px 3px 9px 0px white, inset 0px 24px 36px 0px #525252, inset 0px 72px 96px 0px #404040",
        }}
      >
        <p
          className="font-['Helvetica_Neue',sans-serif] font-normal text-[20px] text-white text-left flex-1 mr-4"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
        >
          {question}
        </p>
        <span
          className="text-[#f9f9f9] text-[40px] leading-[30px] transition-transform duration-300 flex-shrink-0"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0px" : "0px",
        }}
      >
        <div className="pt-4 px-[18px] pb-2">
          <p className="font-['Helvetica_Neue',sans-serif] font-light text-[18px] text-[rgba(255,255,255,0.85)] leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, text, position }) {
  const positionClasses = {
    "top-left":
      "w-full sm:w-[394px] lg:absolute lg:left-[163px] lg:top-[300px]",
    "top-right":
      "w-full sm:w-[328px] lg:absolute lg:left-[calc(37.5%+94px)] lg:top-[132px]",
    "bottom-right":
      "w-full sm:w-[332px] lg:absolute lg:left-[calc(62.5%+45px)] lg:top-[458px]",
  };

  return (
    <div
      className={`${positionClasses[position]} backdrop-blur-xl bg-[rgba(6,2,19,0.1)] rounded-[45px] p-6 sm:p-[35px] lg:p-[24px]`}
      style={{
        boxShadow:
          "inset 0px 3px 9px 0px white, inset 0px 24px 36px 0px #525252, inset 0px 72px 96px 0px #404040",
      }}
    >
      <div className="w-[30px] h-[30px] mb-4">
        <img
          alt={`${text} Icon`}
          className="w-full h-full object-cover"
          src={icon}
        />
      </div>
      <p
        className="font-['Helvetica_Neue',sans-serif] font-normal text-[24px] sm:text-[28px] lg:text-[32px] text-white"
        style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
      >
        {text}
      </p>
    </div>
  );
}

export default function Homepage() {
  return (
    <div
      className="bg-white w-full overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}
    >
      {/* Navigation Header */}
      <header className="container z-10 w-full px-4 sm:px-6 lg:px-[60px] py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-[52px] h-[46px] relative overflow-hidden">
            <Icon name={"Logos"} size={52} />
          </div>
          <p className="font-bold text-[24px] text-black">TurbIQ</p>
        </div>

        <nav className="items-center  w-full justify-center gap-4 lg:gap-[25px] hidden md:flex">
          <ul className="flex gap-4">
            <li>Tentang Kami</li>
            <li>Keunggulan</li>
            <li>Contact</li>
            <li>Fitur</li>
          </ul>
        </nav>
        <Link
          to={"/login"}
          className="bg-black border flex justify-end rounded-[9px] px-3 lg:px-4 py-2 shadow-[0px_2.77px_2.77px_2.078px_rgba(0,0,0,0.25)] hover:bg-[#333] transition-colors"
        >
          <p className=" text-[14px] lg:text-[16px] text-white">Masuk</p>
        </Link>
      </header>

      {/* HERO */}

      <section className="lg:h-dvh">
        <div className="relative w-full flex flex-col h-full container">
          <div className="my-auto">
            <div className="absolute right-0 top-0 pointer-events-none overflow-hidden h-fit">
              <img
                alt=""
                className="object-cover object-center w-full max-h-[500px] lg:max-h-[1024px]"
                src={HeroBackround}
              />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-[60px] pb-20 lg:pb-0">
              <div className=" w-full mt-6 md:my-auto">
                <h1 className="md:max-w-[532px] font-bold text-[42px] sm:text-[43px] lg:text-[64px] text-black leading-tight mb-6">
                  Insight Cepat, Keputusan Lebih Tepat.
                </h1>
                <p className="font-light  lg:text-[24px] text-black mb-8">
                  Pantau kondisi mesin dan deteksi anomali secara real-time.
                </p>
                <button className="border border-[#bfbfbf] rounded-[9px] p-2 md:px-6 md:py-3 shadow-[0px_2.77px_2.77px_2.078px_rgba(0,0,0,0.25)] hover:bg-[rgba(255,255,255,0.15)] transition-colors">
                  <p className="font-light text-[16.622px] text-black">
                    Jelajahi lebih lanjut!
                  </p>
                </button>
              </div>

              <div className="w-full lg:w-[667px] hidden md:flex justify-end  relative">
                <img
                  alt="Dashboard Preview"
                  className=" w-full lg:w-full "
                  src={Logo}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
      </section>

      {/* SECTION 2: ABOUT US */}

      <section id="tentang" className="">
        <div className="container flex flex-col md:flex-row justify-between gap-5 mx-auto p-4 md:p-0">
          <figure className="order-2 md:order-1">
            <img src={Dasboard} alt="" />
          </figure>
          <div className="lg:max-w-[873px] w-full order-1 md:order-2">
            <p className="font-bold text-3xl lg:text-[62px] leading-[1]">
              Kenali kami lebih jauh dan Mendalam
            </p>
            <p className="text-xs lg:text-xl text-slate-400 lg:pr-32 mt-3">
              Jangan biarkan kerusakan mesin menghentikan produksi Anda. Sistem
              kami memantau setiap detak mesin Anda 24/7, mendeteksi risiko
              secara dini, dan memberikan wawasan yang dapat ditindaklanjuti
              melalui AI Copilot. Dapatkan analisis mendalam, prediksi akurat,
              dan rekomendasi perawatan mesin hanya dalam satu percakapan
              intuitif.
            </p>
          </div>
        </div>
      </section>

      <section id="keungulan" className="bg-black/90 text-white">
        <div className="container flex flex-col md:flex-row justify-between gap-6 p-4 md:p-8 lg:p-24 xl:p-[180px]">
          <div className="text-2xl lg:text-[52px] font-bold leading-[1]  w-full">
            <p>Why engineers choose our Predictive Maintenance Copilot</p>
          </div>
          <div className="flex flex-col gap-6 ">
            <div className="">
              <Icon name={"sidebar"} className="text-white" />
              <h4 className="text-xl lg:text-2xl">
                Intelligent Anomaly Detection
              </h4>
              <p className="text-xs lg:text-sm text-justify hyphens-auto">
                Copilot menganalisis data sensor secara real-time untuk
                mendeteksi potensi kerusakan lebih awal, membantu engineer
                mencegah downtime dan meningkatkan keandalan peralatan kritis.
              </p>
            </div>
            <div>
              <Icon name={"sidebar"} className="text-white" />
              <h4 className="text-xl lg:text-2xl">
                Intelligent Anomaly Detection
              </h4>
              <p className="text-xs lg:text-sm text-justify hyphens-auto">
                Copilot menganalisis data sensor secara real-time untuk
                mendeteksi potensi kerusakan lebih awal, membantu engineer
                mencegah downtime dan meningkatkan keandalan peralatan kritis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="conteiner relative">
          <figure className=" flex justify-center">
            <img src={Laptop} alt="" />
          </figure>
          <div className="absolute top-7 left-1/2 bg- p-4 rounded-2xl">
            <Icon name={"bot"} className="text-black" />
            <p>Deteksi Anomali Real-Time</p>
          </div>
        </div>
      </section>

      {/* <section
        id="faq"
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-0 py-20 lg:py-0 overflow-hidden"
        style={{ backgroundImage: `url(${IMG_FAQ_BACKGROUND})` }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start px-4 sm:px-6 lg:px-[60px] py-20 lg:py-[421px]">
          <div className="w-full lg:w-[303px] flex-shrink-0">
            <h2 className="font-['Helvetica_Neue',sans-serif] font-bold text-[40px] sm:text-[48px] lg:text-[52px] text-white leading-tight">
              Pertanyaan yang sering diajukan
            </h2>
          </div>
          <div className="flex-1 w-full lg:w-[644px] space-y-[37px]">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
