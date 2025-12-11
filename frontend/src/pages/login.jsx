import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import InputField from "../Components/InputField";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  // 2. FUNGSI HANDLE LOGIN KE BACKEND
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setError("");
    setIsLoading(true);

    try {
      // Tembak API Backend
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // --- LOGIN SUKSES ---
        const userData = result.data;

        // Simpan ke localStorage
        localStorage.setItem("turbiq_user", JSON.stringify(userData));

        // Update state Auth (jika fungsi tersedia)
        if (login) login(userData);

        window.location.href = "/dasboard";
      } else {
        // --- LOGIN GAGAL ---
        setError(result.detail || "Wrong Username or Password!");
      }
    } catch (err) {
      setError("Gagal terhubung ke server Backend.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-[493px] border border-[#7A7A73] shadow-xl p-5 sm:p-7 rounded-xl">
        <div className="mb-10 text-center sm:text-left">
          <h3 className="text-[#0BA6DF] text-3xl sm:text-4xl font-bold font-inter">
            Login
          </h3>
          <p className="font-inter text-xl sm:text-2xl font-semibold">
            Welcome, enter your details
          </p>
        </div>

        {/* Tampilkan Error Jika Ada */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="mb-6">
            <InputField
              label="Username"
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <InputField
              label="Password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Login (Diganti jadi button submit HTML biasa agar logic jalan) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// function InputField({ label, type = "text", placeholder, value, onChange }) {
//   return (
//     <div>
//       <label className="font-semibold font-inter text-[18px]">{label}</label>

//       <div className="relative rounded-xl p-[1px] bg-[#D9D9D9] group transition-all duration-300 ease-in-out w-full mt-2">
//         <div className="absolute w-full inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#0BA6DF] via-[#7A7A73] to-[#0BA6DF] animate-gradient transition-opacity duration-500"></div>

//         <input
//           type={type}
//           placeholder={placeholder}
//           value={value} // <-- MENERIMA VALUE DARI STATE
//           onChange={onChange} // <-- MENGIRIM PERUBAHAN KE STATE
//           className="relative z-10 p-3 w-full rounded-xl font-inter outline-none bg-white border border-transparent focus:border-blue-400 transition-colors"
//         />
//       </div>
//     </div>
//   );
// }

export default Login;
