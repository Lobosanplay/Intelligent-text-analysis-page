import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUploadStats } from "../../../../shared/services/documents/documents.queries";
import { useAuth } from "../../../../shared/hooks/useAuth";

export default function UsageChart() {
  const { user } = useAuth();
  const { data = [], isLoading, error } = useUploadStats(user?.id || "", 7);

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart</div>;

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Upload Activity</h2>
      <div className="mt-auto w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart responsive data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="count"
              stroke="#4ade80"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
