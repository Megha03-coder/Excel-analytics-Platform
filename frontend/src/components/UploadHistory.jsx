// src/components/UploadHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadHistory = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/upload/user-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploads(res.data);
      } catch (err) {
        setError("Failed to fetch upload history");
        console.error(err);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📁 Upload History</h2>
      {error && <p className="text-red-600">{error}</p>}
      {uploads.length === 0 ? (
        <p className="text-gray-600">No uploads found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">File Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Records</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">{upload.filename}</td>
                <td className="px-4 py-2 border">
                  {new Date(upload.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">{upload.data.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadHistory;
