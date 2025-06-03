import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartVisualizer({ userId }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchLatestUpload = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/upload/user/${userId}`);
        const uploads = res.data;
        if (uploads.length > 0) {
          const latestData = uploads[uploads.length - 1].parsedData;
          setChartData(latestData);
        }
      } catch (err) {
        console.error("Failed to fetch upload data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchLatestUpload();
  }, [userId]);

  const downloadPNG = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = "excel_chart.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("excel_chart.pdf");
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">📊 Excel Data Chart</h2>

      {loading ? (
        <p>Loading chart data...</p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-500">No data available for chart.</p>
      ) : (
        <>
          <div ref={chartRef} className="bg-gray-50 p-4 rounded mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={Object.keys(chartData[0])[0]} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={Object.keys(chartData[0])[1]} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadPNG}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📥 Download PNG
            </button>
            <button
              onClick={downloadPDF}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              📄 Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}
