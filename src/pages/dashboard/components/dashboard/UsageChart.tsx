// Temporally dashboard usageChart (unused)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getUploadStats } from "../../../../shared/services/dashboard/dashboardService";

export default function UsageChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const stats = await getUploadStats();
      setData(stats);
    }
    load();
  }, []);

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
      <h2 className="text-xl font-semibold mb-6">
        Files Uploaded (Last 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
