import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ChartVisualizer({ data }) {
  if (!data || data.length === 0) return null;

  // Use first row's keys to choose default X and Y
  const keys = Object.keys(data[0]);
  const xKey = keys[0];
  const yKey = keys[2]; // assume numeric column

  return (
    <div className="bg-white shadow-md p-6 mt-8 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-center text-indigo-600">📊 Chart Visualization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
