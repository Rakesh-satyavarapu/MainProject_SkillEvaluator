import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const validateForm = () => {
    if (!email.trim()) return toast.error("Email is required");
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return toast.error("Enter a valid email");
    if (!password.trim()) return toast.error("Password is required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({ email: email.toLowerCase(), password });
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const card = document.querySelector(".form-group");
    const container = document.querySelector(".login-container");

    const onMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      card.style.setProperty("--mouse-x", `${(x / (width / 2)) * 10}deg`);
      card.style.setProperty("--mouse-y", `${(y / (height / 2)) * 10}deg`);

      // Neon particle trail
      const particle = document.createElement("div");
      particle.className = "cursor-particle";
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    };

    card.addEventListener("mousemove", onMouseMove);
    return () => card.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="login-container">
      <style>{`
        /* === Animations === */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float3D {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-12px) rotateZ(3deg); }
        }
        @keyframes hologramPulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity:0.8; }
          50% { transform: translateY(-30px) scale(1.2); opacity:0.4; }
          100% { transform: translateY(0) scale(1); opacity:0.8; }
        }
        @keyframes typingGlow {
          0%,100% { box-shadow: 0 0 5px #06b6d4, 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 15px #60a5fa, 0 0 25px #06b6d4; }
        }
        @keyframes fadeOut {
          0% { opacity:1; transform:scale(1); }
          100% { opacity:0; transform:scale(3); }
        }

        /* === Container === */
        .login-container {
          display:flex;
          justify-content:center;
          align-items:center;
          min-height:100vh;
          background: linear-gradient(120deg, #0f172a, #1e293b, #1e40af);
          background-size:300% 300%;
          animation: gradientShift 20s ease infinite;
          overflow:hidden;
          position:relative;
        }

        /* Neon cursor particles */
        .cursor-particle {
          position:absolute;
          width:8px;
          height:8px;
          background: radial-gradient(circle, #60a5fa, transparent);
          border-radius:50%;
          pointer-events:none;
          animation: fadeOut 1s forwards;
          filter: blur(2px);
          z-index:1;
        }

        /* Floating Holographic Particles */
        .particle {
          position:absolute;
          background: rgba(255,255,255,0.4);
          border-radius:50%;
          filter: blur(2px);
          animation: particleFloat 6s ease-in-out infinite;
        }
        .particle:nth-child(1) { width:10px; height:10px; top:10%; left:20%; animation-delay:0s; }
        .particle:nth-child(2) { width:8px; height:8px; top:40%; left:70%; animation-delay:1s; }
        .particle:nth-child(3) { width:6px; height:6px; top:80%; left:30%; animation-delay:2s; }
        .particle:nth-child(4) { width:12px; height:12px; top:60%; left:50%; animation-delay:3s; }
        .particle:nth-child(5) { width:7px; height:7px; top:20%; left:80%; animation-delay:1.5s; }

        /* === Login Card === */
        .form-group {
          position:relative;
          z-index:10;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.15));
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 18px;
          padding: 40px 30px;
          max-width:420px;
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:18px;
          box-shadow:0 0 40px rgba(59,130,246,0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: perspective(600px) rotateX(var(--mouse-y,0deg)) rotateY(var(--mouse-x,0deg));
        }
        .form-group:hover {
          box-shadow: 0 0 60px rgba(59,130,246,0.7);
        }

        .ai-card-image {
          width:130px;
          height:130px;
          border-radius:50%;
          border:3px solid rgba(255,255,255,0.4);
          box-shadow: 0 0 35px rgba(59,130,246,0.9), 0 0 60px rgba(6,182,212,0.6);
          animation: float3D 6s ease-in-out infinite, hologramPulse 4s ease-in-out infinite;
        }

        .form-group h1 {
          text-align:center;
          color:#e0f2fe;
          text-shadow:0 0 10px rgba(255,255,255,0.5);
          font-size:1.8rem;
        }

        .form-control {
          width:100%;
          padding:12px;
          border-radius:8px;
          border:none;
          background-color: rgba(255,255,255,0.15);
          color:#fff;
          font-size:1rem;
          outline:none;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          animation: typingGlow 1.2s infinite alternate;
          background-color: rgba(255,255,255,0.25);
        }

        button {
          width:100%;
          padding:12px;
          border:none;
          border-radius:8px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4, #60a5fa);
          color:#fff;
          font-weight:bold;
          cursor:pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          transform: scale(1.05);
          box-shadow:0 0 20px rgba(6,182,212,0.8);
        }

        @media (max-width:480px) {
          .form-group { padding:30px 20px; }
          .ai-card-image { width:100px; height:100px; }
          .form-group h1 { font-size:1.5rem; }
        }
      `}</style>

      {/* Floating Holographic Particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <form className="form-group" onSubmit={submitHandler}>
        <h1>AI Skill Evaluator</h1>
        <img src="/ai-logo.png" alt="AI Logo" className="ai-card-image" />
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter User Email Address"
        />
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <Link to="/forgotPassword">Forgot Password?</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
