import React from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { User, FileText, LogOut } from "lucide-react";
import UsersListPage from "./UsersListPage";
import UploadsListPage from "./UploadsListPage";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Users", icon: <User size={20} />, path: "users" },
    { name: "Uploads", icon: <FileText size={20} />, path: "uploads" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-blue-800 text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
          {/* Removed Excel Platform heading */}
        </div>
        <nav className="flex flex-col flex-grow p-4 space-y-2">
          <Link
            to="users"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-700 ${
              location.pathname.includes("users") ? "bg-blue-700 font-semibold" : ""
            }`}
          >
            <User size={20} />
            <span>Users</span>
          </Link>
          <Link
            to="uploads"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-700 ${
              location.pathname.includes("uploads") ? "bg-blue-700 font-semibold" : ""
            }`}
          >
            <FileText size={20} />
            <span>Uploads</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 m-4 mt-auto bg-red-600 rounded hover:bg-red-700"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto w-full ml-64">
        <Routes>
          <Route path="users" element={<UsersListPage />} />
          <Route path="uploads" element={<UploadsListPage />} />
          <Route
            path="/"
            element={
              <div>
                <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                <p>Select an option from the sidebar.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
