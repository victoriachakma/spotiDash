import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

function ArtistLeaderboard() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    Papa.parse("/data/artistLeaderboard.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const sorted = results.data
          .filter((row) => row.artist && row.hours_played)
          .sort((a, b) => parseFloat(b.hours_played) - parseFloat(a.hours_played));
        setArtists(sorted.slice(0, 10)); // top 10 only
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
      {artists.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={artists}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="artist" type="category" width={150} />
            <Tooltip formatter={(val) => `${parseFloat(val).toFixed(1)} hrs`} />
            <Bar dataKey="hours_played" radius={[0, 6, 6, 0]}>
              {artists.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ArtistLeaderboard;
