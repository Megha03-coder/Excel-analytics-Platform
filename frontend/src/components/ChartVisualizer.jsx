import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const ChartVisualizer = ({ data }) => {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [dimensionType, setDimensionType] = useState("2D");

  const chartRef = React.useRef();

  const keys = data && data.length > 0 ? Object.keys(data[0]) : [];

  const downloadAsPng = async () => {
    const canvas = await html2canvas(chartRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, "chart.png");
    });
  };

  const render2DChart = () => {
    if (!xAxis || !yAxis) return <p>Please select X and Y axes</p>;

    if (chartType === "bar") {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yAxis} fill="#8884d8" />
        </BarChart>
      );
    }

    if (chartType === "line") {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yAxis} stroke="#82ca9d" />
        </LineChart>
      );
    }

    if (chartType === "pie") {
      return (
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            dataKey={yAxis}
            nameKey={xAxis}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
            ))}
          </Pie>
        </PieChart>
      );
    }

    return null;
  };

  const render3DChart = () => {
    if (!xAxis || !yAxis) return <p>Please select X and Y axes</p>;

    return (
      <Plot
        data={[
          {
            type: "scatter3d",
            mode: "markers",
            x: data.map((row) => row[xAxis]),
            y: data.map((row) => row[yAxis]),
            z: data.map((row) => Object.values(row)[2]), // third dimension as Z
            marker: { size: 6, color: "blue" },
          },
        ]}
        layout={{
          width: 600,
          height: 400,
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: { xaxis: { title: xAxis }, yaxis: { title: yAxis }, zaxis: { title: "Z" } },
        }}
      />
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <div className="flex gap-4 flex-wrap mb-4">
        <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="p-2 border rounded">
          <option value="">Select X-Axis</option>
          {keys.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>

        <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="p-2 border rounded">
          <option value="">Select Y-Axis</option>
          {keys.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>

        <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="p-2 border rounded">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>

        <select value={dimensionType} onChange={(e) => setDimensionType(e.target.value)} className="p-2 border rounded">
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>

        <button onClick={downloadAsPng} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download PNG
        </button>
      </div>

      <div ref={chartRef} style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          {dimensionType === "2D" ? render2DChart() : render3DChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartVisualizer;
