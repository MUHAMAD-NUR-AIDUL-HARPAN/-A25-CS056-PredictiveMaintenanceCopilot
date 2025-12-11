import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatBot from "./pages/chatBot";
import Login from "./pages/login";
import Dasboard from "./pages/dasboard";

// 1. IMPORT AUTH PROVIDER (Wajib!)
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // 2. BUNGKUS SEMUA ROUTE DENGAN AUTHPROVIDER
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/dasboard" element={<Dasboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
