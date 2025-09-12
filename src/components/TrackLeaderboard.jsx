import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

export default function TopTracks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/data/trackLeaderboard.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data
          .filter((row) => row.track && row.hours_played)
          .map((row) => ({
            track: row.track,
            hours_played: parseFloat(row.hours_played),
          }))
          .sort((a, b) => b.hours_played - a.hours_played)
          .slice(0, 20); // top 20 tracks
        setData(parsed);
      },
      error: (err) => console.error("CSV parse error:", err),
    });
  }, []);

  if (!data.length) return <p>Loading Top Tracks...</p>;

  return (
    <div style={{ width: "100%", height: "600px", padding: "12px" }}>
      <h2 style={{ marginBottom: "12px", fontSize: "1.8rem", fontWeight: "bold" }}>
        🎶 Top Tracks
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 220, right: 30, top: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "#555" }}
          />
          <YAxis
            dataKey="track"
            type="category"
            width={200}
            tick={{ fontSize: 13, fontWeight: "bold", fill: "#333" }}
          />
          <Tooltip
            formatter={(value) => `${value.toFixed(1)} hrs`}
            contentStyle={{
              backgroundColor: "#222",
              borderRadius: "8px",
              color: "#fff",
              padding: "8px 12px",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Bar dataKey="hours_played" radius={10} isAnimationActive={true} animationDuration={1200}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`rgba(196, 124, 164, ${0.4 + 0.6 * (index / data.length)})`}
              />
            ))}
            <LabelList
              dataKey="hours_played"
              position="right"
              formatter={(v) => `${v.toFixed(1)}h`}
              style={{ fontWeight: "bold", fill: "#333" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


/*import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

function TrackLeaderboard() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    Papa.parse("/data/trackLeaderboard.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const sorted = results.data
          .filter((row) => row.artist && row.hours_played)
          .sort((a, b) => parseFloat(b.hours_played) - parseFloat(a.hours_played));
        setTracks(sorted.slice(0, 10)); // top 10 only
      },
    });
  }, []);

  const colors = [
    "#6366F1",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EF4444",
    "#14B8A6",
    "#F97316",
    "#84CC16",
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ marginBottom: "10px" }}>🎶 Top Artists</h2>
      {tracks.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={tracks}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="artist" type="category" width={150} />
            <Tooltip formatter={(val) => `${parseFloat(val).toFixed(1)} hrs`} />
            <Bar dataKey="hours_played" radius={[0, 6, 6, 0]}>
              {tracks.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TrackLeaderboard;*/
