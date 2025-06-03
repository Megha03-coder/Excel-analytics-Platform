// src/components/UploadHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UploadHistory({ userId }) {
  const [uploads, setUploads] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/upload/user/${userId}`);
        setUploads(res.data.reverse());
      } catch (err) {
        console.error("❌ Failed to fetch uploads:", err);
      }
    };

    if (userId) {
      fetchUploads();
    }
  }, [userId]);

  const filteredUploads = uploads.filter((upload) =>
    upload.fileName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload History</h2>

      <input
        type="text"
        placeholder="Search by file name..."
        className="w-full mb-4 p-2 border rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredUploads.length === 0 ? (
        <p>No matching uploads found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredUploads.map((upload) => (
            <li
              key={upload._id}
              className="border p-3 rounded hover:bg-gray-50 transition"
            >
              <p className="font-medium">{upload.fileName}</p>
              <p className="text-sm text-gray-500">
                Uploaded: {new Date(upload.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
