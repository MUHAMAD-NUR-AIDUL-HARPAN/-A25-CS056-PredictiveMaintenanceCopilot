import React, { useState } from "react";
import Icon from "../icons/Icon";
// 1. IMPORT HOOK BAHASA
import { useLanguage } from "../../context/LanguageContext";

const ChatHistory = ({
  isCollapsed,
  riwayatChat,
  setChatAktifId,
  hapusChat,
  onClose,
}) => {
  const [showRiwayat, setShowRiwayat] = useState(true);

  // 2. GUNAKAN HOOK
  const { t } = useLanguage();

  return (
    <>
      {!isCollapsed && (
        <button
          onClick={() => setShowRiwayat(!showRiwayat)}
          className="flex gap-3 items-center mt-6 text-sm px-2 w-full hover:bg-white/5 dark:hover:bg-dark_primary rounded p-1 transition-colors"
        >
          <p className="text-nowrap text-left text-black dark:text-white flex-1 ">
            {/* 3. GANTI TEKS DI SINI */}
            {t("chat_history")}
          </p>
          <Icon
            name="down"
            size={10}
            className={`transition-transform duration-300 text-black dark:text-white ${
              showRiwayat ? "rotate-0" : "-rotate-180"
            }`}
          />
        </button>
      )}

      <div className="flex-1 transition-all duration-300 relative min-h-0">
        <div
          className={`mt-2 space-y-1 px-1 overflow-hidden transition-all duration-300 overflow-y-auto custom-scrollbar h-full`}
          style={{
            maxHeight: showRiwayat ? "100%" : "0px",
            opacity: showRiwayat ? 1 : 0,
          }}
        >
          {riwayatChat.map((chat) => (
            <div
              key={chat.id}
              className="group flex items-center justify-between w-full p-1.5 rounded-lg hover:bg-black dark:hover:bg-dark_primary transition-all duration-300 ease-in-out cursor-pointer"
            >
              <button
                onClick={() => {
                  setChatAktifId(chat.id);
                  onClose();
                }}
                className="flex-1 text-left truncate mr-2"
              >
                {!isCollapsed || window.innerWidth < 1024 ? (
                  <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                    {chat.judul}
                  </span>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mx-auto"></div>
                )}
              </button>

              {(!isCollapsed || window.innerWidth < 1024) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hapusChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500"
                >
                  <Icon name="trash" size={14} color="currentColor" />
                </button>
              )}
            </div>
          ))}

          {riwayatChat.length === 0 && !isCollapsed && showRiwayat && (
            <p className="text-gray_primary text-xs px-2 text-nowrap mt-2 italic">
              {/* 4. GANTI TEKS JUGA DI SINI */}
              {t("no_chat")}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
