import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function ChartVisualizer({ userId }) {
  const [uploads, setUploads] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [xKey, setXKey] = useState(null);
  const [yKey, setYKey] = useState(null);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/upload/user/${userId}`)
      .then(res => setUploads(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleFileSelect = (upload) => {
    setSelectedData(upload.parsedData);
    setXKey(null);
    setYKey(null);
  };

  const getKeys = selectedData ? Object.keys(selectedData[0] || {}) : [];

  const renderChart = () => {
    if (!xKey || !yKey || !selectedData) return null;

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={selectedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={selectedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={selectedData} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={150} label>
                {selectedData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white mt-6 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Visualize Uploaded Excel Data</h2>

      <div className="mb-4">
        <label className="font-medium">Select Upload:</label>
        <select
          className="w-full border rounded p-2 mt-1"
          onChange={(e) => handleFileSelect(uploads.find(u => u._id === e.target.value))}
        >
          <option value="">-- Choose File --</option>
          {uploads.map(upload => (
            <option key={upload._id} value={upload._id}>{upload.fileName}</option>
          ))}
        </select>
      </div>

      {selectedData && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-medium">Select X Axis:</label>
              <Select
                options={getKeys.map(key => ({ value: key, label: key }))}
                onChange={(option) => setXKey(option.value)}
              />
            </div>
            <div>
              <label className="font-medium">Select Y Axis:</label>
              <Select
                options={getKeys.map(key => ({ value: key, label: key }))}
                onChange={(option) => setYKey(option.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="font-medium">Chart Type:</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </div>

          {renderChart()}
        </>
      )}
    </div>
  );
}
