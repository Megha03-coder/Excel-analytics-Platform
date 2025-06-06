// src/components/ChartVisualizer.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip
} from "recharts";
import { Chart } from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4", "#ff4081"];

export default function ChartVisualizer({ userId }) {
  const [uploads, setUploads] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [xAxisKey, setXAxisKey] = useState("");
  const [yAxisKey, setYAxisKey] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/upload/user/${userId}`);
        const uploadList = res.data.reverse();
        setUploads(uploadList);
        if (uploadList.length > 0) {
          setSelectedUpload(uploadList[0]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch uploads:", err);
      }
    };
    fetchUploads();
  }, [userId]);

  const parsedData = selectedUpload?.parsedData || [];
  const keys = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];

  useEffect(() => {
    if (keys.length > 1) {
      setXAxisKey(keys[0]);
      setYAxisKey(keys[1]);
    }
  }, [selectedUpload]);

  const downloadchart = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("excel_chart.pdf");
  };

  return (
    <div className="bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Chart Visualization</h2>

      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <select
              className="p-2 border rounded"
              value={selectedUpload?._id}
              onChange={(e) => {
                const found = uploads.find(up => up._id === e.target.value);
                setSelectedUpload(found);
              }}
            >
              {uploads.map((upload) => (
                <option key={upload._id} value={upload._id}>
                  {upload.fileName}
                </option>
              ))}
            </select>

            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>

            {/* Axis selectors for bar and line only */}
            {(chartType === "bar" || chartType === "line") && (
              <>
                <select
                  className="p-2 border rounded"
                  value={xAxisKey}
                  onChange={(e) => setXAxisKey(e.target.value)}
                >
                  {keys.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>

                <select
                  className="p-2 border rounded"
                  value={yAxisKey}
                  onChange={(e) => setYAxisKey(e.target.value)}
                >
                  {keys.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </>
            )}

            <button
              onClick={downloadchart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Download chart
            </button>
          </div>

          <div ref={chartRef} className="overflow-auto">
            {parsedData.length === 0 ? (
              <p>No data in this file.</p>
            ) : (
              <>
                {chartType === "bar" && (
                  <BarChart width={600} height={300} data={parsedData}>
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={yAxisKey} fill="#8884d8" />
                  </BarChart>
                )}

                {chartType === "line" && (
                  <LineChart width={600} height={300} data={parsedData}>
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={yAxisKey} stroke="#82ca9d" />
                  </LineChart>
                )}

                {chartType === "pie" && (
                  <PieChart width={400} height={400}>
                    <Pie
                      data={parsedData}
                      dataKey={yAxisKey}
                      nameKey={xAxisKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {parsedData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
