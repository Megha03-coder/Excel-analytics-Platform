import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, XCircle } from "lucide-react";

const UploadExcel = ({ onParsed }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.data) {
        setSuccess("Upload successful!");
        setError("");
        onParsed(res.data.data); // send to parent
      } else {
        setError("Upload succeeded but no data received.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setSuccess("");
      setError(
        err.response?.data?.error || "Upload failed: Unauthorized or server error"
      );
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-10">
      <div className="text-center mb-6">
        <UploadCloud size={40} className="text-blue-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-blue-700">Upload Excel File</h2>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
      >
        Upload
      </button>

      {success && (
        <p className="mt-4 text-green-600 text-center font-medium">{success}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-center flex items-center justify-center gap-1">
          <XCircle size={16} /> {error}
        </p>
      )}
    </div>
  );
};

export default UploadExcel;
