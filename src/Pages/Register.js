import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Renamed for clarity
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          userName: username,
          firstName : firstname,
          lastName: lastname,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page after registration
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="bg-[#f0f0fb] min-h-screen flex items-center justify-center p-4">
      <main className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-[#7a6fb3] text-xl font-semibold flex items-center justify-center mb-6">
          <i className="fas fa-user-plus mr-2"></i> Register for Buildfolio
        </h1>
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label htmlFor="firstname" className="block text-[#7a6fb3] mb-1 text-sm">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="e.g. User"
              className="w-full rounded-md bg-[#f0f0fb] border border-transparent focus:border-[#7a6fb3] focus:ring-1 focus:ring-[#7a6fb3] text-sm text-[#4a4a6a] px-4 py-2 outline-none"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-[#7a6fb3] mb-1 text-sm">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="e.g. User lastname"
              className="w-full rounded-md bg-[#f0f0fb] border border-transparent focus:border-[#7a6fb3] focus:ring-1 focus:ring-[#7a6fb3] text-sm text-[#4a4a6a] px-4 py-2 outline-none"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-[#7a6fb3] mb-1 text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="e.g. testuser"
              className="w-full rounded-md bg-[#f0f0fb] border border-transparent focus:border-[#7a6fb3] focus:ring-1 focus:ring-[#7a6fb3] text-sm text-[#4a4a6a] px-4 py-2 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#7a6fb3] mb-1 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. alex@email.com"
              className="w-full rounded-md bg-[#f0f0fb] border border-transparent focus:border-[#7a6fb3] focus:ring-1 focus:ring-[#7a6fb3] text-sm text-[#4a4a6a] px-4 py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#7a6fb3] mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-md bg-[#f0f0fb] border border-transparent focus:border-[#7a6fb3] focus:ring-1 focus:ring-[#7a6fb3] text-sm text-[#4a4a6a] px-4 py-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#7a6fb3] text-white rounded-md py-2 mt-1 text-sm"
          >
            Register
          </button>
        </form>
        <p className="text-center text-xs text-[#4a4a6a] mt-6">
          Already have an account?
          <a href="/login" className="text-[#7a6fb3] hover:underline">
            Login
          </a>
        </p>
      </main>
    </div>
  );
};

export default Register;