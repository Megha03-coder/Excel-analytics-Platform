// UploadExcel.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export default function UploadExcel() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      console.log("✅ Upload response:", res.data);
      setStatus("✅ File uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      setStatus("❌ Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-10 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">📤 Upload Excel File</h1>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>
        {status && (
          <p className={`mt-4 text-sm ${status.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
