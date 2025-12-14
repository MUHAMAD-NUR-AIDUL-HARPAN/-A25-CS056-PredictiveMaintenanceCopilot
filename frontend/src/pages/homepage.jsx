import React, { useState } from "react";

// ============================================
// IMAGE ASSETS - Figma URLs
// ============================================
const IMG_BACKGROUND_DECORATIVE = "https://www.figma.com/api/mcp/asset/0685ba9f-7b46-4184-8de3-55c7ec68638b";
const IMG_FEATURE_ICON = "https://www.figma.com/api/mcp/asset/9b28387a-1e9b-4ad8-8bca-fc6567672497";
const IMG_DASHBOARD_LAPTOP = "https://www.figma.com/api/mcp/asset/6be34a24-3050-4b0a-aa1f-27f43fdff38e";
const IMG_BOT_ICON = "https://www.figma.com/api/mcp/asset/d12abbc1-0c21-48e1-a6c5-57fcbbeeb598";
const IMG_SOLUTION_ICON = "https://www.figma.com/api/mcp/asset/f9fc5763-e68c-4a4c-8663-62f72229ec67";
const IMG_SEARCH_ICON = "https://www.figma.com/api/mcp/asset/d27ea895-4d2d-4d8b-a273-174f8984304c";
const IMG_FAQ_BACKGROUND = "https://www.figma.com/api/mcp/asset/539d194c-e7f6-4938-b969-84611222f800";
const IMG_LOGO = "https://www.figma.com/api/mcp/asset/ab4f20c3-8abd-41ee-b450-a1c59661d6ee";
const IMG_USER_ICON = "https://www.figma.com/api/mcp/asset/4a3c1b26-8ee8-4574-9d59-f146701840e4";
const IMG_ABOUT_SECTION = "https://www.figma.com/api/mcp/asset/b9c2a1ce-7540-47b8-b49d-0cc47a244ccc";
const IMG_HERO_DASHBOARD = "https://www.figma.com/api/mcp/asset/81bf1169-42cd-4af5-9ea5-54a915b4c341";

// ============================================
// FAQ DATA
// ============================================
const FAQ_DATA = [
  {
    question: "Data apa saja yang dapat dianalisis oleh TurbIQ?",
    answer: "TurbIQ dapat menganalisis berbagai jenis data sensor seperti suhu, getaran, tekanan, arus listrik, dan parameter operasional lainnya dari mesin dan peralatan industri. Sistem kami dirancang untuk mengintegrasikan data dari berbagai sumber sensor dan sistem monitoring yang ada."
  },
  {
    question: "Bagaimana TurbIQ mendeteksi potensi kerusakan mesin?",
    answer: "TurbIQ menggunakan algoritma machine learning yang canggih untuk menganalisis pola data sensor secara real-time. Sistem membandingkan data aktual dengan baseline normal dan mendeteksi anomali yang mengindikasikan potensi kerusakan. AI copilot kami memberikan peringatan dini sebelum masalah menjadi kritis."
  },
  {
    question: "Apakah TurbIQ dapat digunakan oleh teknisi non-data?",
    answer: "Ya, TurbIQ dirancang dengan antarmuka yang user-friendly dan menggunakan Natural Language Query (Chatbot Copilot) sehingga teknisi tanpa latar belakang data science dapat dengan mudah menggunakannya. Sistem memberikan rekomendasi yang jelas dan dapat ditindaklanjuti dalam bahasa yang mudah dipahami."
  },
  {
    question: "Dapatkah TurbIQ membantu mengatasi downtime mesin yang tidak terencana?",
    answer: "Tentu saja. TurbIQ membantu mencegah downtime yang tidak terencana dengan mendeteksi potensi masalah lebih awal melalui analisis prediktif. Dengan peringatan dini dan rekomendasi perawatan yang tepat waktu, teknisi dapat melakukan perawatan preventif sebelum mesin mengalami kerusakan yang menyebabkan downtime."
  }
];

// ============================================
// COMPONENTS
// ============================================

/**
 * FAQ Accordion Item Component
 * Menampilkan pertanyaan dan jawaban dengan animasi expand/collapse
 */
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="w-full backdrop-blur-xl bg-[rgba(6,2,19,0.1)] rounded-[20px] px-[18px] py-[19px] flex items-center justify-between transition-all duration-300 hover:bg-[rgba(6,2,19,0.15)]"
        style={{
          boxShadow: "inset 0px 3px 9px 0px white, inset 0px 24px 36px 0px #525252, inset 0px 72px 96px 0px #404040"
        }}
      >
        <p className="font-['Helvetica_Neue',sans-serif] font-normal text-[20px] text-white text-left flex-1 mr-4"
           style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}>
          {question}
        </p>
        <span className="text-[#f9f9f9] text-[40px] leading-[30px] transition-transform duration-300 flex-shrink-0"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0px" : "0px"
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

/**
 * Feature Card Component
 * Menampilkan card dengan icon dan teks untuk fitur-fitur utama
 */
function FeatureCard({ icon, text, position }) {
  const positionClasses = {
    'top-left': 'w-full sm:w-[394px] lg:absolute lg:left-[163px] lg:top-[300px]',
    'top-right': 'w-full sm:w-[328px] lg:absolute lg:left-[calc(37.5%+94px)] lg:top-[132px]',
    'bottom-right': 'w-full sm:w-[332px] lg:absolute lg:left-[calc(62.5%+45px)] lg:top-[458px]'
  };

  return (
    <div className={`${positionClasses[position]} backdrop-blur-xl bg-[rgba(6,2,19,0.1)] rounded-[45px] p-6 sm:p-[35px] lg:p-[24px]`}
         style={{
           boxShadow: "inset 0px 3px 9px 0px white, inset 0px 24px 36px 0px #525252, inset 0px 72px 96px 0px #404040"
         }}>
      <div className="w-[30px] h-[30px] mb-4">
        <img 
          alt={`${text} Icon`} 
          className="w-full h-full object-cover" 
          src={icon} 
        />
      </div>
      <p className="font-['Helvetica_Neue',sans-serif] font-normal text-[24px] sm:text-[28px] lg:text-[32px] text-white"
         style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}>
        {text}
      </p>
    </div>
  );
}

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================
export default function Homepage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white w-full min-h-screen overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}>
      
      {/* ============================================
          SECTION 1: HEADER & HERO
          ============================================ */}
      <section className="relative w-full min-h-screen flex flex-col">
        {/* Background Decorative Element */}
        <div className="absolute right-0 top-0 w-[897px] h-[1204px] blur-[0px] hidden lg:block pointer-events-none overflow-hidden">
          <img 
            alt="" 
            className="w-full h-full object-cover object-center" 
            src={IMG_BACKGROUND_DECORATIVE} 
          />
        </div>

        {/* Navigation Header */}
        <header className="relative z-10 w-full px-4 sm:px-6 lg:px-[60px] py-[37px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[46px] relative overflow-hidden">
              <img 
                alt="TurbIQ Logo" 
                className="w-full h-full object-cover" 
                src={IMG_LOGO} 
              />
            </div>
            <p className="font-['Helvetica_Neue',sans-serif] font-normal text-[24px] text-black">
              TurbIQ
            </p>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-[25px]">
            <a href="#tentang" className="font-['Helvetica_Neue',sans-serif] font-light text-[14px] lg:text-[16px] text-black hover:opacity-70 transition-opacity">
              Tentang Kami
            </a>
            <a href="#keunggulan" className="font-['Helvetica_Neue',sans-serif] font-light text-[14px] lg:text-[16px] text-black hover:opacity-70 transition-opacity">
              Keunggulan
            </a>
            <a href="#contact" className="font-['Helvetica_Neue',sans-serif] font-light text-[14px] lg:text-[16px] text-black hover:opacity-70 transition-opacity">
              Contact
            </a>
            <a href="#fitur" className="font-['Helvetica_Neue',sans-serif] font-light text-[14px] lg:text-[16px] text-black hover:opacity-70 transition-opacity">
              Fitur
            </a>
          </nav>

          <button className="bg-black border border-[#bfbfbf] rounded-[9px] px-3 lg:px-4 py-2 shadow-[0px_2.77px_2.77px_2.078px_rgba(0,0,0,0.25)] hover:bg-[#333] transition-colors">
            <p className="font-['Helvetica_Neue',sans-serif] font-light text-[14px] lg:text-[16px] text-white">
              Masuk
            </p>
          </button>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-[60px] pb-20 lg:pb-0">
          <div className="w-full lg:w-[532px] mt-8 lg:mt-0">
            <h1 className="font-['Helvetica_Neue',sans-serif] font-bold text-[48px] sm:text-[56px] lg:text-[64px] text-black leading-tight mb-6">
              Insight Cepat, Keputusan Lebih Tepat.
            </h1>
            <p className="font-['Helvetica_Neue',sans-serif] font-light text-[20px] sm:text-[22px] lg:text-[24px] text-black mb-8">
              Pantau kondisi mesin dan deteksi anomali secara real-time.
            </p>
            <button className="bg-[rgba(255,255,255,0.1)] border border-[#bfbfbf] rounded-[9px] px-6 py-3 shadow-[0px_2.77px_2.77px_2.078px_rgba(0,0,0,0.25)] hover:bg-[rgba(255,255,255,0.15)] transition-colors">
              <p className="font-['Helvetica_Neue',sans-serif] font-light text-[16.622px] text-black">
                Jelajahi lebih lanjut!
              </p>
            </button>
          </div>

          <div className="w-full lg:w-[667px] h-[400px] sm:h-[500px] lg:h-[589px] mt-12 lg:mt-0 relative">
            <img 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover object-center" 
              src={IMG_HERO_DASHBOARD} 
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: ABOUT US
          ============================================ */}
      <section id="tentang" className="relative w-full min-h-screen bg-[#1e1e1e] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-0 py-20 lg:py-0">
        <div className="w-full lg:w-[789px] h-[500px] sm:h-[600px] lg:h-[723px] mb-12 lg:mb-0 order-2 lg:order-1">
          <img 
            alt="About Section" 
            className="w-full h-full object-cover object-center" 
            src={IMG_ABOUT_SECTION} 
          />
        </div>
        <div className="w-full lg:w-[473px] order-1 lg:order-2 lg:pr-[60px]">
          <h2 className="font-['Helvetica_Neue',sans-serif] font-bold text-[40px] sm:text-[48px] lg:text-[52px] text-white mb-6">
            Kenali Kami Lebih Jauh dan Mendalam
          </h2>
          <p className="font-['Helvetica_Neue',sans-serif] font-light text-[20px] sm:text-[22px] lg:text-[24px] text-white leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3: WHY CHOOSE US
          ============================================ */}
      <section id="keunggulan" className="relative w-full min-h-screen bg-[#1e1e1e] px-4 sm:px-6 lg:px-[60px] py-20 lg:py-[198px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-[392px]">
              <h2 className="font-['Helvetica_Neue',sans-serif] font-bold text-[40px] sm:text-[48px] lg:text-[52px] text-white leading-tight">
                Why engineers choose our Predictive Maintenance Copilot
              </h2>
            </div>
            <div className="flex-1 space-y-[126px]">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-[44px] h-[44px] flex-shrink-0">
                  <img 
                    alt="Feature Icon" 
                    className="w-full h-full object-cover" 
                    src={IMG_FEATURE_ICON} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Helvetica_Neue',sans-serif] font-normal text-[28px] sm:text-[32px] text-white mb-4">
                    Intelligent Anomaly Detection
                  </h3>
                  <p className="font-['Helvetica_Neue',sans-serif] font-light text-[20px] sm:text-[24px] text-[rgba(255,255,255,0.77)] leading-relaxed">
                    Copilot menganalisis data sensor secara real-time untuk mendeteksi potensi kerusakan lebih awal, membantu engineer mencegah downtime dan meningkatkan keandalan peralatan kritis.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-[44px] h-[44px] flex-shrink-0 rotate-90">
                  <img 
                    alt="Feature Icon" 
                    className="w-full h-full object-cover" 
                    src={IMG_FEATURE_ICON} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Helvetica_Neue',sans-serif] font-normal text-[28px] sm:text-[32px] text-white mb-4">
                    Smart, Actionable Insights
                  </h3>
                  <p className="font-['Helvetica_Neue',sans-serif] font-light text-[20px] sm:text-[24px] text-[rgba(255,255,255,0.77)] leading-relaxed">
                    Rekomendasi perawatan yang jelas dan berbasis data membuat teknisi dapat mengambil keputusan lebih cepat dan tepat, tanpa harus menafsirkan data mentah secara manual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: FEATURES (Laptop dengan Floating Cards)
          ============================================ */}
      <section id="fitur" className="relative w-full min-h-screen bg-white px-4 sm:px-6 lg:px-0 py-20 lg:py-0 overflow-hidden">
        {/* Dashboard Laptop Image - Dipindahkan ke level section */}
        <div className="w-full lg:w-[877px] h-[400px] sm:h-[550px] lg:h-[658px] mx-auto mb-12 lg:mb-0">
          <img 
            alt="Dashboard Laptop" 
            className="w-full h-full object-cover object-center" 
            src={IMG_DASHBOARD_LAPTOP} 
          />
        </div>
        
        {/* Floating Feature Cards Container */}
        <div className="max-w-[1440px] mx-auto relative">
          <div className="relative w-full min-h-[600px] lg:min-h-[800px] flex flex-col items-center gap-6 lg:gap-8 pb-20">
            <FeatureCard 
              icon={IMG_SEARCH_ICON}
              text="Deteksi Anomali Real-Time"
              position="top-left"
            />
            <FeatureCard 
              icon={IMG_BOT_ICON}
              text="Natural Language Query (Chatbot Copilot)"
              position="top-right"
            />
            <FeatureCard 
              icon={IMG_SOLUTION_ICON}
              text="Smart Maintenance Recommendations"
              position="bottom-right"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: FAQ
          ============================================ */}
      <section id="faq" className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-0 py-20 lg:py-0 overflow-hidden"
               style={{ backgroundImage: `url(${IMG_FAQ_BACKGROUND})` }}>
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
      </section>

      {/* ============================================
          SECTION 6: FOOTER
          ============================================ */}
      <footer className="relative w-full bg-[#1e1e1e] px-4 sm:px-6 lg:px-[60px] py-16 lg:py-[136px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
            {/* Left Column - Company Info */}
            <div className="w-full lg:w-[364px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[78.801px] h-[70px] relative overflow-hidden">
                  <img 
                    alt="TurbIQ Logo" 
                    className="w-full h-full object-cover" 
                    src={IMG_LOGO} 
                  />
                </div>
                <p className="font-['Helvetica_Neue',sans-serif] font-normal text-[36.522px] text-white">
                  TurbIQ
                </p>
              </div>
              <p className="font-['Mulish',sans-serif] font-normal text-[16px] text-white leading-relaxed mb-8">
                We empower engineers to monitor, predict, and maintain critical assets with an AI-powered maintenance copilot.
              </p>
              <div className="mb-6">
                <h3 className="font-['Poppins',sans-serif] font-medium text-[20px] text-white mb-4">
                  Contact Us
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-[19px] h-[19px]">
                    <img 
                      alt="User Icon" 
                      className="w-full h-full object-cover" 
                      src={IMG_USER_ICON} 
                    />
                  </div>
                  <p className="font-['Mulish',sans-serif] font-normal text-[16px] text-white">
                    A25-CS056
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - Navigation */}
            <div className="w-full lg:w-[138px]">
              <h3 className="font-['Poppins',sans-serif] font-medium text-[20px] text-white mb-4">
                Navigasi
              </h3>
              <nav className="flex flex-col gap-[15px]">
                <a href="#" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Home
                </a>
                <a href="#tentang" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Tentang Kami
                </a>
                <a href="#keunggulan" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Keunggulan
                </a>
                <a href="#fitur" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Fitur
                </a>
                <a href="#faq" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  FAQ
                </a>
              </nav>
            </div>

            {/* Right Column - Why Us */}
            <div className="w-full lg:w-[250px]">
              <h3 className="font-['Poppins',sans-serif] font-medium text-[20px] text-white mb-4">
                Keunggulan
              </h3>
              <div className="flex flex-col gap-[15px] font-['Mulish',sans-serif] font-normal text-[16px] text-white">
                <p>Intelligent Anomaly Detection</p>
                <p>Smart, Actionable Insights</p>
                <p>Natural Language Query</p>
                <p>Real-Time Monitoring</p>
              </div>
            </div>

            {/* Far Right Column - More */}
            <div className="w-full lg:w-[138px]">
              <h3 className="font-['Poppins',sans-serif] font-medium text-[20px] text-white mb-4">
                Lainnya
              </h3>
              <nav className="flex flex-col gap-[15px]">
                <a href="#" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Privacy & Policy
                </a>
                <a href="#" className="font-['Mulish',sans-serif] font-normal text-[16px] text-white hover:opacity-70 transition-opacity">
                  Terms & Conditions
                </a>
              </nav>
            </div>
          </div>
          
          <hr className="border-t border-[#4F4F4F] my-8" />
          
          <div className="text-center">
            <p className="font-['Mulish',sans-serif] font-normal text-[14px] text-[#D9D9D9]">
              Copyright © 2024 A25-CS056. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}