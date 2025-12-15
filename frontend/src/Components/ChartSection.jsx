import React, { useState, memo } from "react";
import SensorChart from "./SensorChart";
import { ChevronDown, Check, Activity } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const ChartSection = ({
  chartData,
  selectedMachineName,
  machines,
  onSelectMachine,
  selectedId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { t } = useLanguage();

  const handleSelect = (id) => {
    onSelectMachine(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border dark:bg-dark_secondary border-slate-400 w-full h-full flex flex-col">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div className="flex items-center gap-4 relative">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
            {t("chart_title")}
          </h2>
          <span className="text-gray-300 text-xl font-light">|</span>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-50 border dark:bg-dark_primary dark:text-white border-gray-200 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-100 transition active:scale-95"
            >
              {selectedMachineName || t("col_machine")}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>

                {/* List Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                  {machines.map((machine) => (
                    <button
                      key={machine.id}
                      onClick={() => handleSelect(machine.id)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        selectedId === machine.id
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700"
                      }`}
                    >
                      {machine.name}
                      {selectedId === machine.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* KANAN: Indikator Live */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
            Realtime
          </span>
        </div>
      </div>

      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        <SensorChart
          title={t("col_temp")}
          data={chartData}
          dataKeyHistory="suhu"
          dataKeyPrediction="suhuPred"
          color="#374151"
          unit=" °C"
        />
        <SensorChart
          title={`${t("col_vib")}  (RPM)`}
          data={chartData}
          dataKeyHistory="getaran"
          dataKeyPrediction="getaranPred"
          color="#3B82F6"
          unit=" rpm"
        />
        <SensorChart
          title={`${t("col_current")} (Torsi)`}
          data={chartData}
          dataKeyHistory="arus"
          dataKeyPrediction="arusPred"
          color="#10B981"
          unit=" Nm"
        />
      </div>
    </div>
  );
};

export default memo(ChartSection);
