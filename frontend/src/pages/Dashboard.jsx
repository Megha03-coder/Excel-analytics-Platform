import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import FileUpload from "../components/FileUpload";
import ChartVisualizer from "../components/ChartVisualizer";
import UploadHistory from "../components/UploadHistory";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwt_decode(token);
        setUser(decoded); // ✅ Set user info from token
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/login");
      }
    }
  }, []);

  const handleFileParsed = (data) => {
    setParsedData(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Excel Analytics Dashboard</h1>
      {user && <p className="mb-2">Welcome, {user.name}</p>}

      <FileUpload userId={user?.id} onParsed={handleFileParsed} />

      <ChartVisualizer data={parsedData} />

      {user && <UploadHistory userId={user.id} />}
    </div>
  );
}
