import React, { useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

const AIInsights = () => {
  const [file, setFile] = useState(null);
  const [insight, setInsight] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setInsight("");
    setError("");
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const token = localStorage.getItem("token"); // ✅ Get JWT token
      const res = await axios.post("http://localhost:5000/api/ai-insights", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setInsight(res.data.insights);
      setStatus("Upload successful!");
      setError("");
    } catch (err) {
      console.error("AI Insight Error:", err);
      setStatus("");
      setInsight("");
      setError(err.response?.data?.error || err.message || "Failed to generate AI insights. Try again later.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-indigo-700">AI-Generated Insights</h2>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="border p-2 rounded-md"
          />

          <button
            onClick={handleUpload}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            Upload
          </button>

          {status && <p className="text-green-600 font-medium">{status}</p>}
          {error && <p className="text-red-600 font-medium">{error}</p>}
        </div>

        {insight && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Insights:</h3>
            <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-gray-800">
              {insight}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
