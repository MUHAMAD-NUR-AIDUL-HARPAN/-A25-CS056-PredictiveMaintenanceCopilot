/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icons/Icon";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "#home" },
    { name: "Tentang Kami", path: "#about" },
    { name: "Keunggulan", path: "#features" },
    { name: "Fitur", path: "#specs" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-[60px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-[40px] h-[40px] md:w-[52px] md:h-[46px] relative flex items-center justify-center bg-white/10 rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-colors">
              <Icon name="Logos" size={42} className="text-white" />
            </div>
            <p className="font-bold text-[20px] md:text-[24px] text-white tracking-tight">
              TurbIQ
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm lg:text-base text-zinc-400 hover:text-white transition-colors relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center bg-white text-black hover:bg-zinc-200 border border-transparent rounded-xl px-5 py-2.5 transition-all duration-300 font-medium text-sm lg:text-base shadow-[0px_0px_15px_rgba(255,255,255,0.15)] hover:shadow-[0px_0px_20px_rgba(255,255,255,0.3)]"
            >
              Masuk
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col items-center gap-8"
          >
            <ul className="flex flex-col items-center gap-6 w-full">
              {navLinks.map((link, index) => (
                <li key={index} className="w-full text-center">
                  <a
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-medium text-zinc-400 hover:text-white transition-colors py-2 border-b border-white/5 w-full cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg text-center mt-4"
            >
              Masuk Akun
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
