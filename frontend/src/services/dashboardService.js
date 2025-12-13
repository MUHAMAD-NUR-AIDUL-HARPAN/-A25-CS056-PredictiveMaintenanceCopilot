const API_URL = "https://romantic-creation-production-4130.up.railway.app";

export const getSimulatedData = async (machineId) => {
  try {
    const response = await fetch(`${API_URL}/sensor/simulate/${machineId}`);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data mesin ${machineId}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(`Simulation Error Machine ${machineId}:`, error);
    throw error;
  }
};

// =================================================================
// 2. FUNGSI AMBIL HISTORY (Untuk Grafik)
export async function getAllData(machineId = 1) {
  try {
    // PENTING: Memanggil endpoint /history/{id}
    const response = await fetch(`${API_URL}/history/${machineId}`);
    if (!response.ok) {
      throw new Error(
        `Gagal mengambil riwayat data (HTTP status: ${response.status})`
      );
    }
    return response.json();
  } catch (error) {
    console.error("History Error:", error);
    throw error;
  }
}

// =================================================================
// 3. FUNGSI PREDIKSI MANUAL (Input Form)
export const getPrediction = async (sensorData) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensorData),
    });

    if (!response.ok) throw new Error("Gagal connect ke AI");

    return await response.json();
  } catch (error) {
    console.error("AI Error:", error);
    return {
      status: "Offline",
      risk_percentage: 0,
      recommendation: "Cek koneksi server",
    };
  }
};

// =================================================================
// 4. FUNGSI CHATBOT AI

export const getChatResponse = async (message) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Gagal chat AI");

    const result = await response.json();
    return result.reply;
  } catch (error) {
    return "Maaf, server sedang tidak dapat dihubungi atau Otak AI bermasalah.";
  }
};
