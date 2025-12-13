import React, { useRef } from "react";
import Icon from "./icons/Icon";

function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor="" className="font-semibold font-inter text-[18px]">
        {label}
      </label>

      <div className="relative rounded-xl p-[1px] bg-[#D9D9D9] group transition-all duration-300 ease-in-out w-full">
        <div className="absolute w-full inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#0BA6DF] via-[#7A7A73] to-[#0BA6DF] animate-gradient transition-opacity duration-500"></div>

        <input
          type={type}
          placeholder={placeholder}
          value={value} 
          onChange={onChange}
          className="relative z-10 p-3 w-full  rounded-xl font-inter outline-none bg-white "
        />
      </div>
    </div>
  );
}

export function AutoResizeInput({
  value,
  setValue,
  onSend,
  placeholder = "",
  minHeight = 60,
  maxHeight = 200,
}) {
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  const autoResize = () => {
    if (!textareaRef.current || !wrapperRef.current) return;

    const clone = textareaRef.current.cloneNode(true);
    clone.style.visibility = "hidden";
    clone.style.position = "absolute";
    clone.style.height = "auto";
    clone.style.whiteSpace = "pre-wrap";
    clone.style.overflow = "hidden";

    clone.innerHTML = textareaRef.current.innerHTML;

    document.body.appendChild(clone);
    const contentHeight = clone.scrollHeight;
    document.body.removeChild(clone);

    const newHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight);

    wrapperRef.current.style.height = `${newHeight}px`;
    textareaRef.current.style.overflowY =
      contentHeight > maxHeight ? "auto" : "hidden";
  };

  const sendMessage = () => {
    if (!value.trim()) return;

    onSend();

    textareaRef.current.innerText = "";
    setValue("");
    wrapperRef.current.style.height = `${minHeight}px`;
  };

  const isMobile = () => window.innerWidth <= 768;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (isMobile()) return;

      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative">
      {/* FIX: placeholder */}
      {value.trim() === "" && (
        <div className="absolute left-6 top-[20px] text-gray-400 pointer-events-none z-10">
          {placeholder}
        </div>
      )}

      <div
        ref={wrapperRef}
        className="overflow-hidden relative rounded-[24px] 
         bg-white shadow-md
        transition-[height] duration-300 ease-in-out border dark:border-gray dark:bg-[#1E1E1E]"
        style={{ height: `${minHeight}px` }}
      >
        <div
          ref={textareaRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setValue(e.currentTarget.innerText);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
          className="w-full h-full px-6 py-[18px] pr-[60px]
          outline-none leading-[1.5] text-gray-800
          whitespace-pre-wrap overflow-y-hidden dark:text-white"
        ></div>

        {/* TOMBOL SEND */}
        <button
          type="button"
          onClick={sendMessage}
          className="group absolute right-[10px] bottom-[10px] flex items-center justify-center bg-[#D9D9D9] hover:bg-slate-300 p-2 rounded-full rotate-[40deg] hover:rotate-0 ring-1 hover:ring-sky-400 transition-all duration-700 ease-in-out"
        >
          <Icon
            name="send"
            size={20}
            className="text-black group-hover:text-blue-500"
          />
        </button>
      </div>
    </div>
  );
}

export default InputField;
