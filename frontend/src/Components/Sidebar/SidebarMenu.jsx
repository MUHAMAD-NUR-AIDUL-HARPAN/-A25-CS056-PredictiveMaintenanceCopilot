import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../icons/Icon";
// 1. GANTI IMPORT: Pakai useLanguage, BUKAN dari utils
import { useLanguage } from "../../context/LanguageContext";

const SidebarMenu = ({
  isCollapsed,
  onClose,
  buatObrolanBaru,
  theme,
  toggleTheme,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  // 2. AMBIL FUNGSI DARI CONTEXT (JAUH LEBIH SIMPEL)
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="flex flex-col gap-2 text-gray-300 text-black dark:text-white">
      {/* Link Dashboard */}
      <Link
        to="/dasboard"
        onClick={onClose}
        className="flex items-center font-inter p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-dark_primary transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-center w-fit">
          <Icon
            name="dasboard"
            size={20}
            className="text-black dark:text-white"
          />
        </div>
        {(!isCollapsed || window.innerWidth < 1024) && (
          <span className="ml-4 text-sm">{t("dashboard")}</span>
        )}
      </Link>

      {/* Link Chatbot */}
      <Link
        to="/chatbot"
        onClick={onClose}
        className="flex items-center font-inter p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-dark_primary transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-center w-fit">
          <Icon name="bot" size={20} className="text-black dark:text-white" />
        </div>
        {(!isCollapsed || window.innerWidth < 1024) && (
          <span className="ml-4 text-sm text-nowrap text-black dark:text-white ">
            {t("chat_ai")}
          </span>
        )}
      </Link>

      {/* Tombol Obrolan Baru */}
      <button
        onClick={() => {
          buatObrolanBaru();
          onClose();
        }}
        className={`
          flex items-center w-full font-inter p-2 rounded-lg 
          transition-all duration-300 ease-in-out text-left my-1
          ${
            isCollapsed && window.innerWidth >= 1024
              ? "justify-center hover:bg-black"
              : "bg-white/30 hover:bg-slate-300 border border-dashed border-gray-500"
          }
        `}
      >
        <div className="flex justify-center w-fit">
          <Icon
            name="new-message"
            size={20}
            className="flex text-black dark:text-white"
          />
        </div>
        {(!isCollapsed || window.innerWidth < 1024) && (
          <span className="ml-4 text-sm text-nowrap font-semibold">
            {t("new_chat")}
          </span>
        )}
      </button>

      {/* Settings Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`flex items-center w-full font-inter p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-dark_primary transition-all duration-300 ease-in-out justify-between group ${
            showSettings ? "bg-slate-300 dark:bg-dark_primary" : ""
          }`}
        >
          <div className="flex items-center">
            <div className="flex justify-center w-fit">
              <Icon name="setting" size={20} className=" dark:text-white" />
            </div>
            {(!isCollapsed || window.innerWidth < 1024) && (
              <span className="ml-4 text-sm">{t("settings")}</span>
            )}
          </div>

          {(!isCollapsed || window.innerWidth < 1024) && (
            <Icon
              name="down"
              size={12}
              className={`transition-transform duration-300 text-black dark:text-white ${
                showSettings ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {showSettings && (!isCollapsed || window.innerWidth < 1024) && (
          <div className="mt-1 p-2 mx-2 bg-white/5 rounded-lg border border-gray_primary/40 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mode Gelap */}
            <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Icon
                  name={theme === "dark" ? "bulan" : "matahari"}
                  size={14}
                  color={theme === "dark" ? "#8BB4FF" : "#FFA726"}
                />
                <span>{t("dark_mode")}</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`
                  w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer
                  ${theme === "dark" ? "bg-green-500" : "bg-gray_primary"}
                `}
              >
                <div
                  className={`
                    bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300
                    ${theme === "dark" ? "translate-x-4" : "translate-x-0"}
                  `}
                ></div>
              </button>
            </div>

            <div className="h-[1px] bg-gray-500/20 w-full mb-2"></div>

            {/* Mode Bahasa (Tanpa Reload) */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-[18px] h-[14px] rounded-[2px] overflow-hidden shadow-sm relative">
                  {language === "id" ? (
                    <svg
                      viewBox="0 0 640 480"
                      className="w-full h-full object-cover"
                    >
                      <path fill="#bd002d" d="M0 0h640v240H0z" />
                      <path fill="#fff" d="M0 240h640v240H0z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 640 480"
                      className="w-full h-full object-cover"
                    >
                      <path fill="#012169" d="M0 0h640v480H0z" />
                      <path
                        fill="#FFF"
                        d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
                      />
                      <path
                        fill="#C8102E"
                        d="M424 294l216 162v24H424v-24zm-208-60v60H0v-60h216zm60-234h80v480h-80V0z"
                      />
                      <path
                        fill="#C8102E"
                        d="M0 210h640v60H0v-60zm424-24L640 24v-24L424 186v24zM216 294L0 456v24l216-186v-24z"
                      />
                    </svg>
                  )}
                </div>
                <span>
                  {t("language")} ({language.toUpperCase()})
                </span>
              </div>

              <button
                onClick={toggleLanguage}
                className={`
                  w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer
                  ${language === "en" ? "bg-blue-500" : "bg-gray_primary"}
                `}
              >
                <div
                  className={`
                    bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300
                    ${language === "en" ? "translate-x-4" : "translate-x-0"}
                  `}
                ></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SidebarMenu;
