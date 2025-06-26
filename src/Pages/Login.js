import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Uncomment for navigation
import { jwtDecode } from 'jwt-decode';
const Login = () => {
  const navigate = useNavigate(); // Uncomment for navigation
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login", // Backend URL
        {
          username: username, // Send JSON payload
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Correct Content-Type
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        const extractedFirstname = decodedToken.firstname;
        const extractedLastname = decodedToken.lastname;
        console.log("Decoded Token:", decodedToken);
        localStorage.setItem("token", token);
        localStorage.setItem("firstname",extractedFirstname)
        localStorage.setItem("lastname",extractedLastname)
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-[#f0f0fb] min-h-screen flex items-center justify-center p-4">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        aria-label="Login to Buildfolio"
        onSubmit={handleLogin} // Use onSubmit instead of onClick for better form handling
      >
        <h2 className="text-xl font-semibold text-[#7a6fb3] mb-6 flex items-center justify-center gap-2">
          <i className="fas fa-sign-in-alt"></i>
          Login to Buildfolio
        </h2>
        <label htmlFor="username" className="block text-[#7a6fb3] text-sm mb-1">
          Username
        </label>
        <input
          id="username"
          type="text" // Change to text since it's a username
          placeholder="e.g. testuser"
          className="w-full mb-4 px-4 py-3 rounded-md bg-[#f3f4fb] border border-transparent text-[#6b6b7b] placeholder-[#6b6b7b] focus:outline-none focus:ring-2 focus:ring-[#7a6fb3]"
          required
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="password" className="block text-[#7a6fb3] text-sm mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="w-full mb-6 px-4 py-3 rounded-md bg-[#f3f4fb] border border-transparent text-[#6b6b7b] placeholder-[#6b6b7b] focus:outline-none focus:ring-2 focus:ring-[#7a6fb3]"
          required
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit" // Use type="submit" for form submission
          className="w-full bg-[#7a6fb3] text-white py-3 rounded-md text-center text-sm font-normal hover:bg-[#6b5fa8] transition-colors"
        >
          Login
        </button>
        <p className="text-center text-[#4a4a4a] text-xs mt-6">
          Don't have an account?
          <a href="/Register" className="text-[#7a6fb3] hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
