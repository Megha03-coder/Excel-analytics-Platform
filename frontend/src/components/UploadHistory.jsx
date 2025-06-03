import { useEffect, useState } from "react";
import axios from "axios";

export default function UploadHistory({ userId }) {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/upload/user/${userId}`);
        setUploads(res.data);
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    };

    if (userId) fetchUploads();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">📂 Upload History</h2>
      <ul className="space-y-2">
        {uploads.map((upload) => (
          <li key={upload._id} className="border p-2 rounded bg-gray-50">
            <p><strong>File:</strong> {upload.fileName}</p>
            <p><strong>Date:</strong> {new Date(upload.createdAt).toLocaleString()}</p>
            <p><strong>Rows:</strong> {upload.parsedData.length}</p>
          </li>
        ))}
        {uploads.length === 0 && <p className="text-gray-500">No uploads yet.</p>}
      </ul>
    </div>
  );
}
