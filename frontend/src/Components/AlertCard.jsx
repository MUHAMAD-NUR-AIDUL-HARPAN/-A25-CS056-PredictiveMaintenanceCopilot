import React from "react";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
// 1. IMPORT HOOK BAHASA
import { useLanguage } from "../context/LanguageContext";

const AlertCard = ({ status, risk, message }) => {
  // 2. GUNAKAN HOOK
  const { t } = useLanguage();

  // Tentukan Warna & Teks Judul berdasarkan Status
  let theme = {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    titleColor: "text-green-500",
    barColor: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleText: t("status_normal_title"), // "SISTEM NORMAL"
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
      titleText: t("status_critical_title"), // "PERINGATAN KRITIS!"
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
      titleText: t("status_warning_title"), // "PERLU PERHATIAN"
      Icon: Info,
      animate: "",
    };
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[22px] border p-6 shadow-sm transition-all duration-500 ${theme.bg} ${theme.border} ${theme.text}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* LABEL KECIL DI ATAS */}
          <p
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.titleColor}`}
          >
            {t("system_status_label")}
          </p>

          {/* JUDUL BESAR (Normal/Kritis/Waspada) */}
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {theme.titleText}
          </h3>

          {/* PESAN (Ini sudah diterjemahkan dari Dashboard, jadi biarkan saja) */}
          <p className="text-sm md:text-base leading-relaxed opacity-90">
            {message}
          </p>

          {/* RISK BAR */}
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
