import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  UploadCloud,
  Clock,
  Brain,
  Settings,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import UploadExcel from "../components/UploadExcel";
import UploadHistory from "../components/UploadHistory";
import AIInsights from "../components/AIInsights";
import AdminDashboard from "../components/AdminDashboard";
import ChartVisualizer from "../components/ChartVisualizer"; // Make sure this exists

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [parsedData, setParsedData] = useState([]); // ✅ Safely initialized
  const location = useLocation();

  const navItems = [
    { name: "Upload Excel", icon: <UploadCloud size={20} />, path: "upload" },
    { name: "Upload History", icon: <Clock size={20} />, path: "history" },
    { name: "AI Insights", icon: <Brain size={20} />, path: "ai" },
    { name: "Admin Dashboard", icon: <Settings size={20} />, path: "admin" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-slate-100 to-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-gradient-to-b from-blue-700 to-indigo-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <UserCircle size={28} />
              <span className="text-lg font-semibold">Excel Platform</span>
            </div>
          ) : (
            <UserCircle size={28} />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              to={`/dashboard/${item.path}`}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                location.pathname.includes(item.path)
                  ? "bg-white/20 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Routes>
          {/* Default Welcome */}
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-green-700 mb-4">
                  Welcome to Excel Analytics Platform
                </h2>
                <p className="text-gray-700">
                  Select an option from the sidebar to begin.
                </p>
              </div>
            }
          />

          {/* Upload Page */}
          <Route
            path="upload"
            element={
              <div>
                <UploadExcel onParsed={setParsedData} />
                {Array.isArray(parsedData) && parsedData.length > 0 && (
                  <ChartVisualizer data={parsedData} />
                )}
              </div>
            }
          />

          {/* Other Pages */}
          <Route path="history" element={<UploadHistory />} />
          <Route path="ai" element={<AIInsights />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
