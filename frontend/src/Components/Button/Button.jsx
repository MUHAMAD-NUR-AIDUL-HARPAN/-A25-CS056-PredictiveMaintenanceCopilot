import React from "react";
import { Link } from "react-router-dom";

function Button({
  children,
  background = "bg-red-700",
  type = "button",
  to = "/",
}) {
  return (
    <Link
      to={to}
      type={type}
      className={`${background} text-white font-inter px-6 py-3 rounded-full transition-all duration-500 text-center ease-in-out relative overflow-hidden group mt-1`}
    >
      <span className="relative z-10">{children}</span>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0BA6DF] via-[#7A7A73] to-[#0BA6DF] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 animate-gradient rounded-xl transition-opacity duration-500"></div>
    </Link>
  );
}

export default Button;
