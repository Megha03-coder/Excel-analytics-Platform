import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import UploadExcel from "./components/UploadExcel";
import UploadHistory from "./components/UploadHistory";
import AIInsights from "./components/AIInsights";
import AdminDashboard from "./components/AdminDashboard";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload-excel" element={<UploadExcel />} />
        <Route path="/upload-history" element={<UploadHistory />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
      </Routes>
    </Router>
  );
}
