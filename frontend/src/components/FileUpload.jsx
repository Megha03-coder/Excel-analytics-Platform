// components/FileUpload.jsx
import { useState } from "react";
import axios from "axios";

export default function FileUpload({ userId }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId); // simulate user

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      alert("File uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
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
    </div>
  );
}
