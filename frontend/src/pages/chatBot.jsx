import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { AutoResizeInput } from "../Components/InputField";
import Header from "../Components/Header";
import { getChatResponse } from "../services/dashboardService";
// 1. IMPORT FUNGSI TRANSLATE
import { useLanguage } from "../context/LanguageContext";

function ChatBot() {
  const { t } = useLanguage();
  const [riwayatChat, setRiwayatChat] = useState(() => {
    const savedChat = localStorage.getItem("turbiq_chat_history");
    return savedChat ? JSON.parse(savedChat) : [];
  });

  const [chatAktifId, setChatAktifId] = useState(() => {
    return localStorage.getItem("turbiq_active_chat_id") || null;
  });

  const [pesanInput, setPesanInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    t("sugg_1"), // "Bagaimana kondisi mesin saat ini?"
    t("sugg_2"), // "Apakah ada risiko kerusakan?"
    t("sugg_3"), // "Apa rekomendasi maintenance?"
    t("sugg_4"), // "Siapa kamu?"
  ];

  useEffect(() => {
    localStorage.setItem("turbiq_chat_history", JSON.stringify(riwayatChat));
  }, [riwayatChat]);

  useEffect(() => {
    if (chatAktifId) {
      localStorage.setItem("turbiq_active_chat_id", chatAktifId);
    }
  }, [chatAktifId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [riwayatChat, chatAktifId, isLoading]);

  const handleKirimPesan = async (pesanManual = null) => {
    const textToSend =
      typeof pesanManual === "string" ? pesanManual : pesanInput;

    if (!textToSend.trim()) return;

    const userMessage = { role: "user", text: textToSend };
    let currentChatId = chatAktifId;

    if (!currentChatId) {
      const idBaru = crypto.randomUUID();
      currentChatId = idBaru;
      const chatBaru = {
        id: idBaru,
        judul: textToSend,
        pesan: [userMessage],
      };
      setRiwayatChat((prev) => [...prev, chatBaru]);
      setChatAktifId(idBaru);
    } else {
      setRiwayatChat((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, pesan: [...chat.pesan, userMessage] }
            : chat
        )
      );
    }

    setPesanInput("");
    setIsLoading(true);

    try {
      const aiReplyText = await getChatResponse(textToSend);
      const aiMessage = { role: "ai", text: aiReplyText };

      setRiwayatChat((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, pesan: [...chat.pesan, aiMessage] }
            : chat
        )
      );
    } catch (error) {
      console.error("Error chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buatObrolanBaru = () => {
    setChatAktifId(null);
    setPesanInput("");
    localStorage.removeItem("turbiq_active_chat_id");
  };

  const hapusChat = (id) => {
    const newHistory = riwayatChat.filter((chat) => chat.id !== id);
    setRiwayatChat(newHistory);

    if (chatAktifId === id) {
      setChatAktifId(null);
      localStorage.removeItem("turbiq_active_chat_id");
    }
    localStorage.setItem("turbiq_chat_history", JSON.stringify(newHistory));
  };

  const chatAktif = riwayatChat.find((c) => c.id === chatAktifId);
  const isChatEmpty = !chatAktifId || !chatAktif;

  return (
    <div className="flex gap-[10px] h-[100dvh] w-full overflow-hidden bg-[#E9EEF6] dark:bg-black">
      <Sidebar
        buatObrolanBaru={buatObrolanBaru}
        riwayatChat={riwayatChat}
        setChatAktifId={setChatAktifId}
        chatAktifId={chatAktifId}
        hapusChat={hapusChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="container flex-1 h-[100dvh] py-[10px] px-[10px] lg:pl-0">
        <div className="border border-gray_primary bg-[#F8FAFC] dark:bg-[#292929] h-full rounded-lg flex flex-col justify-between overflow-hidden relative">
          <Header
            title={t("copilot_header")}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <div className="flex-1 overflow-y-auto pb-[20px] px-[20px] lg:px-[120px] space-y-4 pt-[70px] custom-scrollbar">
            {isChatEmpty ? (
              <div className="h-full flex flex-col items-center justify-center -mt-10 relative ">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                  {t("welcome_title")}
                </h1>
                <p className="text-lg md:text-xl text-center mb-8 text-gray-600 font-medium dark:text-white">
                  {t("welcome_desc")}
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-2xl ">
                  {suggestions.map((text, index) => (
                    <button
                      key={index}
                      onClick={() => handleKirimPesan(text)}
                      className="bg-[#EBEBE6] hover:bg-[#E0E0DC] dark:bg-dark_secondary dark:text-white px-5 py-3 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatAktif.pesan.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex w-full ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#C5C7BC] text-black rounded-tr-none"
                          : "bg-white dark:bg-dark_primary dark:text-white border border-gray-200 dark:border-gray-600 rounded-tl-none"
                      }`}
                    >
                      {msg.role === "ai" && (
                        <p className="text-xs font-bold text-blue-600 mb-1">
                          {t("bot_label")}
                        </p>
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex w-full justify-start animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-tl-none text-xs text-gray-500">
                      {t("typing")}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          <div className="px-[20px] lg:px-[107px] pb-[50px] bg-[#F8FAFC] dark:bg-[#292929] text-gray_primary dark:text-white">
            <AutoResizeInput
              value={pesanInput}
              setValue={setPesanInput}
              onSend={() => handleKirimPesan()}
              placeholder={t("input_placeholder")} // 7. GUNAKAN TRANSLATE PLACEHOLDER
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
