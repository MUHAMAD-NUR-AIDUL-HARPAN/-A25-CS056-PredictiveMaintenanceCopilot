import React from "react";
// 1. IMPORT ICON TAMBAHAN: WifiOff & Loader2
import {
  AlertTriangle,
  CheckCircle,
  Info,
  WifiOff,
  Loader2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const AlertCard = ({ status, risk, message }) => {
  const { t } = useLanguage();

  
  let theme = {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    titleColor: "text-green-500",
    barColor: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleText: t("status_normal_title"), 
    Icon: CheckCircle,
    animate: "",
  };

  if (status === "Bahaya") {
    theme = {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      titleColor: "text-red-500",
      barColor: "bg-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      titleText: t("status_critical_title"), 
      Icon: AlertTriangle,
      animate: "animate-pulse",
    };
  } else if (status === "Waspada") {
    theme = {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      titleColor: "text-yellow-600",
      barColor: "bg-yellow-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      titleText: t("status_warning_title"), 
      Icon: Info,
      animate: "",
    };
  }
  
  else if (status === "Offline") {
    theme = {
      bg: "bg-slate-100",
      border: "border-gray-200",
      text: "text-gray-700",
      titleColor: "text-gray-500",
      barColor: "bg-gray-500",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      titleText: "SYSTEM OFFLINE",
      Icon: WifiOff,
      animate: "",
    };
  }
  
  else if (status === "Connecting") {
    theme = {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      titleColor: "text-blue-500",
      barColor: "bg-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleText: "CONNECTING...",
      Icon: Loader2,
      animate: "animate-spin",
    };
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[22px] border p-6 shadow-sm transition-all duration-500 ${theme.bg} ${theme.border} ${theme.text}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
        
          <p
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.titleColor}`}
          >
            {t("system_status_label")}
          </p>

         
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {theme.titleText}
          </h3>

          {/* PESAN */}
          <p className="text-sm md:text-base leading-relaxed opacity-90">
            {message}
          </p>

          {/* 👇 TAMBAHAN 3: Sembunyikan Risk Bar jika Offline/Connecting */}
          {status !== "Offline" && status !== "Connecting" && (
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold mb-1 opacity-80">
                {/* LABEL TINGKAT RISIKO */}
                <span>{t("risk_level_label")}</span>
                <span>{risk}%</span>
              </div>
              <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${theme.barColor}`}
                  style={{ width: `${risk}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ICON */}
        <div
          className={`p-3 rounded-full shrink-0 ${theme.iconBg} ${theme.iconColor} ${theme.animate}`}
        >
          <theme.Icon size={32} />
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
