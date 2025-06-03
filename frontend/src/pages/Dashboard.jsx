import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import ChartVisualizer from "../components/ChartVisualizer"; // ✅ NEW
import jwt_decode from "jwt-decode";
import UploadHistory from "../components/UploadHistory";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decoded = jwt_decode(token);
      setUser({ _id: decoded.userId, name: decoded.name });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Excel Analytics Dashboard</h1>
        {user && (
          <p className="text-gray-700 mb-6">Welcome, <strong>{user.name}</strong></p>
        )}

        {user && <FileUpload userId={user._id} />}
        {user && <ChartVisualizer userId={user._id} />}
        {user && <UploadHistory userId={user._id} />
}
      </div>
    </div>
  );
}
