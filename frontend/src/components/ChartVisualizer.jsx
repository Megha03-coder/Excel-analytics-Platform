import React, { useState, useEffect } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const ChartVisualizer = ({ data }) => {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  useEffect(() => {
    if (keys.length >= 2) {
      setXAxis(keys[0]);
      setYAxis(keys[1]);
    }
  }, [data]);

  const renderChart = () => {
    if (!xAxis || !yAxis) return <p>Please select valid axes</p>;

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yAxis} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey={yAxis}
                nameKey={xAxis}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="bg-white p-6 mt-6 shadow-md rounded-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📈 Chart Visualisation</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Select X-Axis:</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {keys.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Y-Axis:</label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {keys.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>
      </div>

      {renderChart()}
    </div>
  );
};

export default ChartVisualizer;
