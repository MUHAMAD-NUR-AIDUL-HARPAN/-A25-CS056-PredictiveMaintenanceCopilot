// KAMUS KATA (INDONESIA vs INGGRIS)
export const translations = {
  // --- BAHASA INDONESIA (id) ---
  id: {
    // Sidebar
    dashboard: "Dashboard",
    chat_ai: "Chat AI",
    new_chat: "+ Obrolan Baru",
    settings: "Pengaturan",
    dark_mode: "Mode Gelap",
    language: "Bahasa",
    logout: "Keluar",

    // Dashboard Utama
    total_machine: "Total Mesin",
    avg_condition: "Kondisi Rata-rata",
    efficiency: "Efisiensi",
    est_rul: "Est. Sisa Umur",
    active: "Aktif",
    waiting: "Menunggu...",

    // Status & Alert
    risk_damage: "Risiko Kerusakan",
    status_ai: "Status AI",
    recommendation: "Rekomendasi",
    normal: "Normal",
    alert: "Waspada",
    danger: "Bahaya",
    safe: "Aman",
    check_periodic: "Cek Berkala",
    stop_immediate: "STOP SEGERA",

    // Tabel & Grafik
    chart_title: "Grafik Sensor",
    live_log: "Riwayat Log Sensor (Realtime)",
    col_machine: "Nama Mesin",
    col_temp: "Suhu",
    col_vib: "Getaran",
    col_current: "Arus",
    col_pressure: "Waktu",
    col_status: "Status Resiko",

    // Pesan AI
    msg_critical: "KRITIS: Segera hentikan mesin untuk inspeksi!",
    msg_warning: "PERINGATAN: Terdeteksi anomali ringan.",
    msg_normal: "Mesin beroperasi dalam parameter optimal.",

    // --- CHATBOT (BARU) ---
    copilot_header: "TurbIQ AI",
    welcome_title: "Predictive Maintenance Copilot",
    welcome_desc: "Saya siap membantu menganalisis kesehatan mesin Anda.",
    sugg_1: "Bagaimana kondisi mesin saat ini?",
    sugg_2: "Apakah ada risiko kerusakan?",
    sugg_3: "Apa rekomendasi maintenance?",
    sugg_4: "Siapa kamu?",
    typing: "Sedang mengetik...",
    input_placeholder: "Tanyakan sesuatu...",
    bot_label: "TurbIQ AI",

    system_status_label: "Status Sistem",
    risk_level_label: "Tingkat Risiko",

    status_normal_title: "SISTEM NORMAL",
    status_warning_title: "PERLU PERHATIAN",
    status_critical_title: "PERINGATAN KRITIS!",

    chat_history: "Riwayat Obrolan",
    no_chat: "Belum ada obrolan",
  },

  // --- BAHASA INGGRIS (en) ---
  en: {
    // Sidebar
    dashboard: "Dashboard",
    chat_ai: "AI Chat",
    new_chat: "+ New Chat",
    settings: "Settings",
    dark_mode: "Dark Mode",
    language: "Language",
    logout: "Log out",

    // Dashboard Utama
    total_machine: "Total Machines",
    avg_condition: "Avg Condition",
    efficiency: "Efficiency",
    est_rul: "Est. Rem. Life",
    active: "Active",
    waiting: "Waiting...",

    // Status & Alert
    risk_damage: "Failure Risk",
    status_ai: "AI Status",
    recommendation: "Recommendation",
    normal: "Normal",
    alert: "Warning",
    danger: "Critical",
    safe: "Safe",
    check_periodic: "Check Periodically",
    stop_immediate: "STOP IMMEDIATELY",

    // Tabel & Grafik
    chart_title: "Sensor Charts",
    live_log: "Live Sensor Log (Realtime)",
    col_machine: "Machine Name",
    col_temp: "Temp",
    col_vib: "Vibration",
    col_current: "Current",
    col_pressure: "Time",
    col_status: "Risk Status",

    // Pesan AI
    msg_critical: "CRITICAL: Stop machine immediately for inspection!",
    msg_warning: "WARNING: Mild anomaly detected.",
    msg_normal: "Machine operating within optimal parameters.",

    // --- CHATBOT (NEW) ---
    copilot_header: "TurbIQ Copilot",
    welcome_title: "Predictive Maintenance Copilot",
    welcome_desc: "I am ready to help analyze your machine's health.",
    sugg_1: "Current machine condition?",
    sugg_2: "Is there any risk of failure?",
    sugg_3: "Maintenance recommendations?",
    sugg_4: "Who are you?",
    typing: "Typing...",
    input_placeholder: "Ask something...",
    bot_label: "TurbIQ AI",

    // TAMBAHAN BARU UNTUK ALERTCARD:
    system_status_label: "System Status",
    risk_level_label: "Risk Level",

    status_normal_title: "SYSTEM NORMAL",
    status_warning_title: "NEEDS ATTENTION",
    status_critical_title: "CRITICAL WARNING!",

    chat_history: "Chat History",
    no_chat: "No chats yet",
  },
};

export const getLanguage = () => {
  return localStorage.getItem("turbiq_language") || "id";
};

export const t = (key) => {
  const lang = getLanguage();
  return translations[lang][key] || key;
};
