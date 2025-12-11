import React from "react";
import Icon from "../icons/Icon";

const SidebarHeader = ({ isCollapsed, toggleSidebar, onClose }) => {
  return (
    <div className="flex items-center mb-8 pr-1  justify-between shrink-0">
      <div
        className={`overflow-hidden transition-all duration-300 flex items-center ${
          isCollapsed ? "lg:w-0 opacity-0" : "w-full opacity-100"
        }`}
      >
        <Icon name={"Logos"} size={45} className="text-black dark:text-white" />
      </div>

      <button
        onClick={toggleSidebar}
        className="hidden lg:flex justify-center p-1 rounded hover:bg-gray_primary transition-all duration-300 ease-in-out group"
      >
        <Icon
          name="sidebar"
          size={20}
          className="text-black dark:text-white group-hover:text-black transition-all duration-300"
        />
      </button>

      <button
        onClick={onClose}
        className="lg:hidden flex text-black dark:text-white font-bold text-xl pr-2 hover:text-red-500 transition-colors"
      >
        &times;
      </button>
    </div>
  );
};

export default SidebarHeader;
