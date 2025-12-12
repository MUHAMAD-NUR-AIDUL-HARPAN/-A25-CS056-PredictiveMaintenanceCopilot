const API_URL = "https://romantic-creation-production-4130.up.railway.app";

// 1. Fungsi meminta prediksi ke AI
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
    // Jika server mati, kembalikan nilai default agar aplikasi tidak crash
    return {
      status: "Offline",
      risk_percentage: 0,
      recommendation: "Cek koneksi server",
    };
  }
};

// 2. Fungsi Chatbot
export const getChatResponse = async (message) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const result = await response.json();
    return result.reply;
  } catch (error) {
    return "Maaf, server sedang tidak dapat dihubungi.";
  }
};
