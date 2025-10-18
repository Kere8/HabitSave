// src/App.jsx
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-[#F7F9FB] min-h-screen flex flex-col items-center justify-center text-center text-[#1F2933] font-sans">
      <header className="p-8">
        <h1 className="text-5xl font-bold text-[#063a5a]">BUD</h1>
        <p className="text-lg mt-4 max-w-xl mx-auto">
          Your smart, friendly companion for building better money habits and saving effortlessly.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#E6B23C] text-white rounded-xl shadow-md hover:scale-105 transition">
          Get Started →
        </button>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-3 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-[#00C48C] font-semibold text-xl">💸 Smart Savings Goals</h2>
          <p className="mt-2">Set realistic goals and track progress visually with automatic reminders.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-[#00C48C] font-semibold text-xl">🎮 Gamified Budgeting</h2>
          <p className="mt-2">Earn badges, streaks, and rewards for staying consistent with your habits.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-[#00C48C] font-semibold text-xl">📊 Real-time Insights</h2>
          <p className="mt-2">Visualize your spending patterns and learn how to optimize your budget.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
