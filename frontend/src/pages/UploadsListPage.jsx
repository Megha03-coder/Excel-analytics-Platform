import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadsListPage = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/uploads", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUploads(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load uploads");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleDelete = async (uploadId) => {
    if (!window.confirm("Are you sure you want to delete this upload?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/uploads/${uploadId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUploads(uploads.filter((upload) => upload._id !== uploadId));
    } catch (err) {
      alert("Failed to delete upload");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Uploads</h1>
      {loading ? (
        <p>Loading uploads...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Filename</th>
              <th className="py-2 px-4 border-b">Uploaded At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{upload.user?.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{upload.user?.email || "N/A"}</td>
                <td className="py-2 px-4 border-b">{upload.filename}</td>
                <td className="py-2 px-4 border-b">{new Date(upload.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(upload._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadsListPage;
