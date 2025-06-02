import { useState } from "react";
import axios from "axios";

export default function FileUpload({ userId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // ✅ FIXED

  const handleFileChange = (e) => setFile(e.target.files[0]);
   
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      console.log("✅ Upload Success:", res.data);
      setStatus("Upload successful"); // ✅ FIXED
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      setStatus("Upload failed"); // ✅ FIXED
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {/* ✅ Show status message */}
      {status && (
        <p className={`mt-2 ${status.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
