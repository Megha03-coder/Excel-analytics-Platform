import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const uploadRes = await axios.get("http://localhost:5000/api/admin/uploads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data);
        setUploads(uploadRes.data);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">All Users</h2>
        <table className="w-full table-auto border mt-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold">All Uploads</h2>
        <table className="w-full table-auto border mt-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">File</th>
              <th className="p-2 border">Data Rows</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload._id}>
                <td className="p-2 border">{upload.userId?.name}</td>
                <td className="p-2 border">{upload.fileName}</td>
                <td className="p-2 border">{upload.parsedData?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
