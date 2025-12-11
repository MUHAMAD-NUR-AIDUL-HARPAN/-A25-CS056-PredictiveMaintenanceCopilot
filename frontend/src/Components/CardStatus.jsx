import React from "react";

function CardStatus({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1B1C1F] dark:text-white p-5 border border-gray_primary dark:border-slate-400 rounded-[19px] font-inter text-[15px] w-full">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
}

export default CardStatus;
