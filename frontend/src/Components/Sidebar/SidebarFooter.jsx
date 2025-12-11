import React from "react";
import { Link } from "react-router-dom";
import Icon from "../icons/Icon"; // Sesuaikan path icon jika perlu

const SidebarFooter = ({ isCollapsed }) => {
  return (
    <div className="mt-auto pt-2 text-white group">
      <div className="h-[1px] bg-gray_primary mb-3 mx-2"></div>

      <Link
        to="/"
        className="flex justify-between items-center p-2 font-inter rounded-lg hover:bg-red-500/10 transition-all duration-300 ease-in-out cursor-pointer "
      >
        <div className="flex gap-2 justify-center w-fit">
          {(!isCollapsed || window.innerWidth < 1024) && (
            <span className="ml-4 text-sm flex-1 text-nowrap text-black dark:text-white group-hover:text-red-400 transition-colors duration-300">
              Log out
            </span>
          )}
        </div>
        <Icon
          name="log-out"
          size={20}
          className="text-black dark:text-white group-hover:text-red-400 transition-colors duration-300"
        />
      </Link>
    </div>
  );
};

export default SidebarFooter;
