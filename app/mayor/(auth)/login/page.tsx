"use client";

import { useState } from "react";
import { Eye, EyeOff, Landmark, Lock, Mail } from "lucide-react";

function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function MayorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/mayor/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] dark:bg-[#0F172A] relative">
      <Particles />

      {/* Login Card */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 w-full max-w-md mx-4 z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center mx-auto mb-4 blue-glow">
            <Landmark className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Kaliakair <span className="text-electric-blue">Pourashava</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Mayor Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mayor@kaliakair.gov.bd"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-11 py-3 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-electric-blue to-sky-blue text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Login as Mayor"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-6">
          PouraSeva Platform v1.0 | Secured Access
        </p>
      </div>
    </div>
  );
}
