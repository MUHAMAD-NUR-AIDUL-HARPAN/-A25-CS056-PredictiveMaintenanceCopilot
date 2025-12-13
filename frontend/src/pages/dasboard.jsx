import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import CardStatus from "../Components/CardStatus";
import AlertCard from "../Components/AlertCard";
import MachineTable from "../Components/MachineTable";
import ChartSection from "../Components/ChartSection";
import Header from "../Components/Header";
import { getSimulatedData, getAllData } from "../services/dashboardService";
import { useLanguage } from "../context/LanguageContext";

// NAMA FUNGSI TETAP: Dasboard
function Dasboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const { t } = useLanguage();

  const [machineData, setMachineData] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);

  const [predictionInfo, setPredictionInfo] = useState({
    status: "Connecting",
    risk: 0,
    message: "Menghubungkan ke server...",
  });

  const [stats, setStats] = useState([
    { title: t("total_machine"), value: "3 Unit" },
    { title: t("avg_condition"), value: t("waiting") },
    { title: t("efficiency"), value: "100%" },
    { title: t("recommendation"), value: t("safe") },
  ]);

  const machineList = [
    { id: 1, name: "Hydraulic Press A1" },
    { id: 2, name: "CNC Lathe B2" },
    { id: 3, name: "Robot Arm C3" },
  ];

  // =================================================================
  // 🛑 PERBAIKAN BUG GRAFIK: useEffect ini diubah total
  // Dipanggil ulang SETIAP kali selectedId berubah.
  // =================================================================
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // PENTING: Mengirim ID mesin yang dipilih ke Backend
        // getAllData di sini akan memanggil endpoint /history/{selectedId}
        const logs = await getAllData(selectedId);

        if (logs && logs.length > 0) {
          // Logs dari backend sudah terlimit 20 dan terurut
          const formattedHistory = logs.map((log) => ({
            time: new Date(log.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            suhu: parseFloat((log.air_temp - 273.15).toFixed(1)),
            getaran: log.rpm,
            arus: log.torque,
          }));
          setChartHistory(formattedHistory);
        } else {
          setChartHistory([]); // Kosongkan jika tidak ada data history
        }
      } catch (error) {
        console.error("Error fetching history for selected machine:", error);
        setChartHistory([]);
      }
    };

    fetchHistory();

    // PENTING: Dependency Array HARUS menyertakan selectedId
  }, [selectedId]);
  // =================================================================

  // =================================================================
  // FETCH REALTIME DATA (Timer 1 Menit)
  // =================================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = machineList.map((m) => getSimulatedData(m.id));
        const results = await Promise.all(requests);

        const currentTime = new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        // Mapping Data untuk Tabel
        const newTableData = results.map((data, index) => {
          let status = "Normal";

          if (
            data.prediction === 1 ||
            data.prediction === "Bahaya" ||
            data.risk_percentage > 80
          )
            status = "Bahaya";
          else if (data.risk_percentage > 40) status = "Waspada";

          return {
            id: machineList[index].id,
            name: machineList[index].name,
            temp: `${(data.air_temp - 273.15).toFixed(1)} °C`,
            vibration: `${data.rpm.toFixed(0)} rpm`,
            current: `${data.torque.toFixed(1)} Nm`,
            pressure: currentTime,
            status: status,
            risk: data.risk_percentage,
          };
        });

        setMachineData(newTableData);

        // Update Logika Tampilan (Grafik & Alert)
        const selectedRow =
          newTableData.find((m) => m.id === selectedId) || newTableData[0];
        const selectedRawData =
          results.find((_, i) => machineList[i].id === selectedId) ||
          results[0];

        // Update Chart
        setChartHistory((prev) => {
          const newData = {
            time: currentTime,
            suhu: parseFloat((selectedRawData.air_temp - 273.15).toFixed(1)),
            getaran: selectedRawData.rpm,
            arus: selectedRawData.torque,
          };
          // HANYA TAMBAHKAN TITIK BARU. Tidak perlu .slice(-20) di sini.
          return [...prev, newData];
        });

        // Update Alert
        let msg = t("msg_normal");
        if (selectedRow.status === "Bahaya") msg = t("msg_critical");
        else if (selectedRow.status === "Waspada") msg = t("msg_warning");

        setPredictionInfo({
          status: selectedRow.status,
          risk: selectedRow.risk,
          message: msg,
        });

        // Update Stats
        const avgRisk = (
          results.reduce((acc, curr) => acc + curr.risk_percentage, 0) / 3
        ).toFixed(1);
        setStats([
          { title: t("total_machine"), value: "3 " + t("active") },
          { title: t("risk_damage"), value: `${avgRisk}% (Avg)` },
          { title: t("status_ai"), value: selectedRow.status },
          {
            title: t("recommendation"),
            value:
              selectedRow.status === "Normal" ? t("safe") : t("check_periodic"),
          },
        ]);
      } catch (error) {
        console.error("Gagal update dashboard:", error);
      }
    };

    // Panggil langsung saat halaman dibuka (Mount)
    fetchData();

    // Pasang interval 1 menit
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [t, selectedId]);
  // =================================================================

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
                selectedMachineName={
                  machineList.find((m) => m.id === selectedId)?.name
                }
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
