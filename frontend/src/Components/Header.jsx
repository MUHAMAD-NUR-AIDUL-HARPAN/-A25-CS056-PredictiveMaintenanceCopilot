import Icon from "../Components/icons/Icon";
import React from "react";

function Header({ title, onMenuClick }) {
  return (
    <header className="border-b font-semibold border-[#D9D9D9] p-[16px] text-xl bg-[#F8FAFC] dark:bg-[#292929] dark:text-white absolute top-0 w-full z-10">
      <div className="flex gap-2  items-center ">
        <div className="lg:hidden flex" onClick={onMenuClick}>
          <Icon name="menu" size={20} className="text-black dark:text-white" />
        </div>
        <h3 className="text-center">{title}</h3>
      </div>
    </header>
  );
}

export default Header;
