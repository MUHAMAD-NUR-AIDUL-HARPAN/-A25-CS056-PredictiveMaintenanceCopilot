// import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroBackround from "../assets/HeroBackround.png";
import Logo from "../assets/logo.png";
import Dasboard from "../assets/dashboard.png";
import Icon from "../Components/icons/Icon";
import Laptop from "../assets/laptop.png";
import TurbIQFaq from "../Components/Hompage/Superiority";
import AboutUs from "../Components/Hompage/About";
import Keunggulan from "../Components/Hompage/Keunggulan";
import HeroSection from "../Components/Hompage/HerroSection";
import Header from "../Components/Hompage/HeaderHompage";
import SectionFitur from "../Components/Hompage/SectionFitur";
import Contact from "../Components/Hompage/Contact";

export default function Homepage() {
  return (
    <div className="bg-zinc-950 min-h-screen w-full overflow-x-hidden text-white font-sans">
      <Header />

      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="features">
          <Keunggulan />
        </section>

        <section id="specs">
          <SectionFitur />
        </section>

        <section id="about">
          <AboutUs />
        </section>

        <section id="faq">
          <TurbIQFaq />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer>
        <div className="py-6 text-center text-zinc-600 text-sm border-t border-white/10">
          &copy; 2025 TurbIQ. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
