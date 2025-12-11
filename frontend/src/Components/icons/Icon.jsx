import React from "react";

const Icon = ({ name, size = 24, color = "", hoverColor, className = "" }) => {
  const iconPath = `/${name}.svg`;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMask: `url(${iconPath}) no-repeat center / contain`,
        mask: `url(${iconPath}) no-repeat center / contain`,
        backgroundColor: "currentColor",
        color: color,
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (hoverColor) e.currentTarget.style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        if (hoverColor) e.currentTarget.style.color = color;
      }}
    />
  );
};

export default Icon;
