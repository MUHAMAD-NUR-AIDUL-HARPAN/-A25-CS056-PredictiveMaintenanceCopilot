import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import CardStatus from "../Components/CardStatus";
import AlertCard from "../Components/AlertCard";
import MachineTable from "../Components/MachineTable";
import ChartSection from "../Components/ChartSection";
import Header from "../Components/Header";
// 🟢 1. TAMBAH getAllData di import
import { getPrediction, getAllData } from "../services/dashboardService";
import { useLanguage } from "../context/LanguageContext";

function Dasboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);

  // GUNAKAN HOOK BAHASA
  const { t } = useLanguage();

  // --- STATE DATA ---
  const [machineData, setMachineData] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);

  // State Alert Card
  const [predictionInfo, setPredictionInfo] = useState({
    status: "Normal",
    risk: 0,
    message: "Menunggu data sensor...",
  });

  const [stats, setStats] = useState([
    { title: t("total_machine"), value: "1 Unit" },
    { title: t("avg_condition"), value: t("waiting") },
    { title: t("efficiency"), value: "100%" },
    { title: t("recommendation"), value: t("safe") },
  ]);

  // 🟢 2. HOOK BARU: Memuat Seluruh Riwayat Data Awal (/data/all)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const allLogs = await getAllData();

        if (allLogs && allLogs.length > 0) {
          // Backend mengirim data urut dari TERBARU ke TERLAMA (DESC).
          // Kita perlu membalik (reverse) agar grafik urut dari kiri (lama) ke kanan (baru).
          const formattedHistory = allLogs.reverse().map((log) => ({
            // Pastikan field 'timestamp' sesuai dengan database Anda
            time: new Date(log.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            suhu: parseFloat((log.air_temp - 273.15).toFixed(1)), // Konversi Kelvin ke Celcius
            getaran: log.rpm,
            arus: log.torque,
          }));

          // Masukkan semua data sejarah ke grafik
          setChartHistory(formattedHistory);
        }
      } catch (error) {
        console.error("Gagal memuat seluruh data awal:", error);
      }
    };

    fetchInitialData();
  }, []); // Array kosong [] artinya hanya jalan sekali saat mount

  // --- SIMULASI REALTIME LOOP ---
  useEffect(() => {
    const fetchData = async () => {
      // 1. GENERATE DATA SIMULASI
      const rawKelvin = 298 + Math.random() * 20;
      const displayCelcius = (rawKelvin - 273.15).toFixed(1);
      const randomRPM = (1400 + Math.random() * 200).toFixed(0);
      const randomTorque = (40 + Math.random() * 20).toFixed(1);

      const sensorInput = {
        air_temp: rawKelvin,
        process_temp: rawKelvin + 10,
        rpm: parseFloat(randomRPM),
        torque: parseFloat(randomTorque),
        tool_wear: 0,
      };

      try {
        const aiResult = await getPrediction(sensorInput);

        const currentTime = new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        // --- LOGIKA STATUS & REKOMENDASI ---
        let finalStatus = "Normal";
        let finalMessage = "";
        let rekomendasiText = t("safe");

        if (aiResult.status === "Bahaya" || aiResult.risk_percentage > 80) {
          finalStatus = "Bahaya";
          finalMessage = t("msg_critical");
          rekomendasiText = t("stop_immediate");
        } else if (aiResult.risk_percentage > 40) {
          finalStatus = "Waspada";
          finalMessage = t("msg_warning");
          rekomendasiText = t("check_periodic");
        } else {
          finalStatus = "Normal";
          finalMessage = t("msg_normal");
          rekomendasiText = t("safe");
        }

        // 3. Update Alert Card
        setPredictionInfo({
          status: finalStatus,
          risk: aiResult.risk_percentage,
          message: finalMessage,
        });

        // 4. Update Tabel
        const newMachineEntry = {
          id: 1,
          name: "Hydraulic Press A1",
          temp: `${displayCelcius} °C`,
          vibration: `${randomRPM} rpm`,
          current: `${randomTorque} Nm`,
          pressure: currentTime,
          status: finalStatus,
        };
        setMachineData([newMachineEntry]);

        // 5. Update Grafik
        setChartHistory((prev) => {
          const newData = {
            time: currentTime,
            suhu: parseFloat(displayCelcius),
            getaran: sensorInput.rpm,
            arus: sensorInput.torque,
          };
          const newHistory = [...prev, newData];

          // 🟢 3. HAPUS slice(-10) AGAR GRAFIK MENAMPILKAN SEMUA DATA
          // return newHistory.slice(-10); // <-- Kode lama (dihapus)
          return newHistory; // <-- Kode baru (tampilkan semua)
        });

        // 6. Update Stats
        setStats([
          { title: t("total_machine"), value: "1 " + t("active") },
          { title: t("risk_damage"), value: `${aiResult.risk_percentage}%` },
          { title: t("status_ai"), value: finalStatus },
          {
            title: t("recommendation"),
            value: rekomendasiText,
          },
        ]);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
    };

    // Refresh tiap 3 detik
    const interval = setInterval(fetchData, 3000);
    fetchData();

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="flex gap-[10px] h-[100dvh] w-full overflow-hidden bg-[#E9EEF6] dark:bg-black transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="container flex-1 h-full p-[10px] lg:pl-0 flex flex-col">
        <div className="flex-1 border border-gray_primary bg-[#F8FAFC] dark:bg-dark_secondary dark:border-slate-600 rounded-lg overflow-hidden flex flex-col relative transition-colors duration-300">
          <div className="mb-16 pb-0 lg:hidden">
            <Header
              title={"TurbIQ"}
              onMenuClick={() => setIsSidebarOpen(true)}
            />
          </div>

          <div className="overflow-y-auto flex-1 p-3 lg:p-[25px] flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 shrink-0">
              <div className="lg:col-span-2">
                <AlertCard
                  status={predictionInfo.status}
                  risk={predictionInfo.risk}
                  message={predictionInfo.message}
                />
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                {stats.map((item, index) => (
                  <CardStatus
                    key={index}
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </div>
            </div>

            <div className="w-full min-h-[350px] shrink-0">
              <ChartSection
                chartData={chartHistory}
                selectedMachineName={"Hydraulic Press A1"}
                machines={machineData}
                onSelectMachine={setSelectedId}
                selectedId={selectedId}
              />
            </div>

            <div className="w-full pb-4">
              <MachineTable
                data={machineData}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dasboard;
