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

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        {/* Header */}
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

        {/* Navigation */}
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
          {/* Default welcome page */}
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-green-700 mb-4">
                  Welcome to Excel Analytics Platform
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-l-4 border-green-500 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      📊 Upload & Analyze Excel Files
                    </h3>
                    <p className="text-gray-700">
                      Upload `.xlsx` or `.xls` files and instantly visualize your
                      data using dynamic charts and tables.
                    </p>
                  </div>
                  <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      🧠 AI Insights (Coming Soon)
                    </h3>
                    <p className="text-gray-700">
                      Automatically generate insights and summaries from your
                      Excel data using AI.
                    </p>
                  </div>
                  <div className="bg-white border-l-4 border-yellow-500 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      📁 Upload History
                    </h3>
                    <p className="text-gray-700">
                      Access and manage your previously uploaded files.
                    </p>
                  </div>
                  <div className="bg-white border-l-4 border-purple-500 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      🛠️ Admin Dashboard
                    </h3>
                    <p className="text-gray-700">
                      Admins can manage users, files, and platform statistics.
                    </p>
                  </div>
                </div>

                {/* Sample Data Table */}
                <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    📋 Sample Data Preview
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                      <thead className="bg-green-100 text-gray-700 uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-2 border">Name</th>
                          <th className="px-4 py-2 border">Department</th>
                          <th className="px-4 py-2 border">Sales</th>
                          <th className="px-4 py-2 border">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white hover:bg-green-50">
                          <td className="px-4 py-2 border">Alice</td>
                          <td className="px-4 py-2 border">Marketing</td>
                          <td className="px-4 py-2 border">$4,000</td>
                          <td className="px-4 py-2 border">2025-05-01</td>
                        </tr>
                        <tr className="bg-gray-50 hover:bg-green-50">
                          <td className="px-4 py-2 border">Bob</td>
                          <td className="px-4 py-2 border">Sales</td>
                          <td className="px-4 py-2 border">$5,600</td>
                          <td className="px-4 py-2 border">2025-05-02</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            }
          />

          {/* Other nested routes */}
          <Route path="upload" element={<UploadExcel />} />
          <Route path="history" element={<UploadHistory />} />
          <Route path="ai" element={<AIInsights />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
