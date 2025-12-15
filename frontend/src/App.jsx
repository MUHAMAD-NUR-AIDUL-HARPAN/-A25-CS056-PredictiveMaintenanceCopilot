import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatBot from "./pages/chatBot";
import Login from "./pages/login";
import Dasboard from "./pages/dasboard";
import Homepage from "./pages/homepage";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/dasboard" element={<Dasboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
