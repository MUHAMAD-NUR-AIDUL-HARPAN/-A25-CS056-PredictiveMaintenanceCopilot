import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import ChatHistory from "./ChatHistory";
import SidebarFooter from "./SidebarFooter";
import { useTheme } from "../../context/ThemeContext";

function Sidebar({
  buatObrolanBaru = () => {},
  riwayatChat = [],
  setChatAktifId = () => {},
  hapusChat = () => {},
  isOpen,
  onClose,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`
          h-[100dvh] overflow-hidden py-[10px] pl-[10px] text-gray_primary 
          transition-all duration-300 ease-in-out
          fixed top-0 left-0 z-30 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:static lg:translate-x-0 
          ${isCollapsed ? "lg:w-[65px]" : "lg:w-[260px]"}
          w-[260px] 
        `}
      >
        <div className="bg-[#E9EEF6]  dark:bg-black h-full p-2 rounded-lg relative flex flex-col border border-gray_primary">
          {/* Bagian Header */}
          <SidebarHeader
            isCollapsed={isCollapsed}
            toggleSidebar={toggleSidebar}
            onClose={onClose}
          />

          <SidebarMenu
            isCollapsed={isCollapsed}
            onClose={onClose}
            buatObrolanBaru={buatObrolanBaru}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* Bagian Riwayat Chat */}
          <ChatHistory
            isCollapsed={isCollapsed}
            riwayatChat={riwayatChat}
            setChatAktifId={setChatAktifId}
            hapusChat={hapusChat}
            onClose={onClose}
          />

          {/* Bagian Footer (Logout) */}
          <SidebarFooter isCollapsed={isCollapsed} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
