import React from "react";
// 1. IMPORT HOOK BAHASA
import { useLanguage } from "../context/LanguageContext";

const MachineTable = ({ data, onSelect, selectedId }) => {
  // 2. GUNAKAN HOOK
  const { t } = useLanguage();

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-600 border border-green-200";
      case "bahaya":
        return "bg-red-100 text-red-600 border border-red-200";
      case "waspada":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 3. HELPER UNTUK MENERJEMAHKAN STATUS
  // Karena data status di database/dashboard pakai bahasa Indonesia (Normal, Waspada, Bahaya),
  // Kita perlu mapping manual ke kunci kamus agar bisa berubah bahasa.
  const getTranslatedStatus = (status) => {
    if (status === "Normal") return t("normal");
    if (status === "Waspada") return t("alert");
    if (status === "Bahaya") return t("danger");
    return status;
  };

  return (
    <div className="bg-white dark:bg-dark_secondary rounded-lg shadow-sm border border-slate-400 w-3xl p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        {/* Gunakan Judul dari Kamus */}
        {t("live_log")}
      </h3>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-[550px] md:w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 dark:text-white text-sm border-b border-gray-100">
              {/* GANTI JUDUL KOLOM DENGAN TRANSLATE */}
              <th className="py-3 font-medium">{t("col_machine")}</th>
              <th className="py-3 font-medium">{t("col_temp")}</th>
              <th className="py-3 font-medium">{t("col_vib")}</th>
              <th className="py-3 font-medium">{t("col_current")}</th>
              {/* 'col_pressure' di kamus artinya Waktu/Time (karena isinya jam) */}
              <th className="py-3 font-medium">{t("col_pressure")}</th>
              <th className="py-3 font-medium text-right">{t("col_status")}</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-white cursor-pointer">
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelect(row.id)}
                className={`border-b border-slate-300 dark:border-slate-400 hover:bg-gray-50 dark:hover:bg-dark_primary transition-colors ${
                  selectedId === row.id
                    ? "bg-blue-50 dark:bg-dark_primary border-l-4 border-l-blue-500"
                    : ""
                }`}
              >
                <td
                  className={`py-4 font-medium ${
                    selectedId === row.id ? "pl-2" : ""
                  }`}
                >
                  {row.name}
                </td>
                <td className="py-4">{row.temp}</td>
                <td className="py-4">{row.vibration}</td>
                <td className="py-4">{row.current}</td>
                <td className="py-4">{row.pressure}</td>
                <td className="py-4 text-right">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                      row.status
                    )}`}
                  >
                    {/* GUNAKAN HELPER TRANSLATE STATUS DI SINI */}
                    {getTranslatedStatus(row.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineTable;
