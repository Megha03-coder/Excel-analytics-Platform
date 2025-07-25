import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import AdminDashboardPage from "./AdminDashboardPage";
import AdminRoute from "../components/AdminRoute";
import ChartVisualizer from "../components/ChartVisualizer";
import UsersListPage from "./UsersListPage";
import UploadsListPage from "./UploadsListPage";

  const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [parsedData, setParsedData] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from localStorage or decode token if needed
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const navItems = userRole === "admin"
    ? []
    : [
        {
          name: "Upload Excel",
          icon: <UploadCloud size={24} />,
          path: "upload",
          summary: "Upload and parse Excel sheets to visualize your data.",
        },
        {
          name: "Upload History",
          icon: <Clock size={24} />,
          path: "history",
          summary: "View your previously uploaded Excel files with timestamps.",
        },
        {
          name: "AI Insights",
          icon: <Brain size={24} />,
          path: "ai",
          summary: "Use AI to extract meaningful summaries and analytics.",
        },
      ];

  const handleCardClick = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      {userRole !== "admin" && !location.pathname.includes("/dashboard/admin") && (
        <aside
          className={`h-full bg-gradient-to-b from-blue-700 to-indigo-800 text-white transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } flex-shrink-0 fixed top-0 left-0 z-10 shadow-lg`}
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
      )}

      {/* Main Content */}
      <main
        className={`${isSidebarOpen && userRole !== "admin" ? "ml-64" : "ml-20"} p-6 w-full overflow-y-auto transition-all duration-300`}
      >
        <Routes>
          {/* Default Welcome Page with All Cards Centered */}
          <Route
            path="/"
            element={
              <div className="text-center">
                <h2 className="text-3xl font-bold text-green-700 mb-10">
                  Welcome to Excel Analytics Platform
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => handleCardClick(item.path)}
                      className="cursor-pointer bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-2 text-blue-600 font-medium">
                        {item.icon}
                        <h3 className="text-xl">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          {/* Upload Excel Page */}
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

          <Route path="history" element={<UploadHistory />} />
          <Route path="ai" element={<AIInsights />} />
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <UsersListPage />
              </AdminRoute>
            }
          />
          <Route
            path="uploads"
            element={
              <AdminRoute>
                <UploadsListPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
